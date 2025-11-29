import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// ============================================
// Rate Limiter with automatic cleanup
// ============================================
interface RateLimitRecord {
  count: number
  startTime: number
}

const rateLimit = new Map<string, RateLimitRecord>()

// 配置常量
const RATE_LIMIT_MAX_REQUESTS = 100  // 每个时间窗口最大请求数
const RATE_LIMIT_WINDOW_MS = 60 * 1000  // 时间窗口: 1分钟
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000  // 清理间隔: 5分钟
const MAX_ENTRIES = 10000  // 最大记录数，防止内存溢出

let lastCleanup = Date.now()

/**
 * 清理过期的 rate limit 记录，防止内存泄漏
 */
function cleanupRateLimitMap() {
  const now = Date.now()
  
  // 只在达到清理间隔时执行
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) {
    return
  }
  
  lastCleanup = now
  
  // 删除过期记录
  rateLimit.forEach((record, ip) => {
    if (now - record.startTime > RATE_LIMIT_WINDOW_MS) {
      rateLimit.delete(ip)
    }
  })
  
  // 如果记录数仍然过多，删除最旧的一半
  if (rateLimit.size > MAX_ENTRIES) {
    const entries = Array.from(rateLimit.entries())
      .sort((a, b) => a[1].startTime - b[1].startTime)
    
    const deleteCount = Math.floor(entries.length / 2)
    for (let i = 0; i < deleteCount; i++) {
      rateLimit.delete(entries[i][0])
    }
  }
}

/**
 * 检查请求是否超过速率限制
 */
function checkRateLimit(ip: string): boolean {
  // 先执行清理
  cleanupRateLimitMap()
  
  const now = Date.now()
  const record = rateLimit.get(ip)
  
  if (!record) {
    rateLimit.set(ip, { count: 1, startTime: now })
    return true
  }
  
  // 时间窗口已过，重置计数
  if (now - record.startTime > RATE_LIMIT_WINDOW_MS) {
    rateLimit.set(ip, { count: 1, startTime: now })
    return true
  }
  
  // 增加计数并检查是否超限
  record.count++
  return record.count <= RATE_LIMIT_MAX_REQUESTS
}

// ============================================
// 需要认证保护的路由列表
// ============================================
const PROTECTED_API_ROUTES = [
  '/api/vote',
  '/api/posts',  // POST 请求创建帖子
  '/api/like',
  '/api/follow',
  '/api/block',
  '/api/tip',
  '/api/upload',
  '/api/user',  // 用户信息修改
]

const PROTECTED_PAGE_ROUTES = [
  '/settings',
]

/**
 * 检查路径是否需要认证
 */
function isProtectedRoute(path: string, method: string): boolean {
  // 页面路由保护
  if (PROTECTED_PAGE_ROUTES.some(route => path.startsWith(route))) {
    return true
  }
  
  // API 路由保护 (GET 请求通常不需要认证，除了用户设置)
  if (PROTECTED_API_ROUTES.some(route => path.startsWith(route))) {
    // GET /api/posts 允许匿名访问（查看帖子列表）
    if (path === '/api/posts' && method === 'GET') {
      return false
    }
    return true
  }
  
  return false
}

// ============================================
// Middleware 主函数
// ============================================
export async function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const path = request.nextUrl.pathname
  const method = request.method

  // 1. Rate Limiting (DDoS 防护)
  if (!checkRateLimit(ip)) {
    return new NextResponse('Too Many Requests', { 
      status: 429,
      headers: {
        'Retry-After': '60',
        'X-RateLimit-Limit': String(RATE_LIMIT_MAX_REQUESTS),
        'X-RateLimit-Remaining': '0',
      }
    })
  }

  // 2. 路由认证保护
  if (isProtectedRoute(path, method)) {
    const token = await getToken({ req: request })
    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/settings/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

