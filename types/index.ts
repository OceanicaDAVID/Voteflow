/**
 * 共享类型定义
 * 用于前后端统一的数据结构
 */

// ============================================
// 用户相关类型
// ============================================
export interface UserBasic {
  id: string
  name: string | null
  image: string | null
  email: string | null
  walletAddress?: string | null
}

export interface UserWithFollow extends UserBasic {
  followedBy?: { followerId: string }[]
  blockedBy?: { blockerId: string }[]
}

// ============================================
// 投票相关类型
// ============================================
export interface PollOption {
  id: string
  text: string
  pollId: string
  _count: {
    votes: number
  }
}

export interface Poll {
  id: string
  question: string
  postId: string
  options: PollOption[]
  votes?: { optionId: string }[]
  createdAt: Date
  expiresAt?: Date | null
}

// ============================================
// 帖子相关类型
// ============================================
export interface Post {
  id: string
  content: string
  images: string[]
  authorId: string
  author: UserWithFollow
  createdAt: Date
  updatedAt: Date
  views: number
  poll: Poll | null
  likes?: { userId: string }[]
  _count: {
    likes: number
  }
}

// ============================================
// PostItem 组件 Props 类型
// ============================================
export interface PostItemProps {
  post: Post
  currentUserId?: string
}

// ============================================
// API 请求/响应类型
// ============================================
export interface CreatePostRequest {
  content: string
  images?: string[]
  poll?: {
    options: string[]
  }
}

export interface VoteRequest {
  pollId: string
  optionId: string
}

export interface LikeRequest {
  postId: string
}

export interface FollowRequest {
  targetUserId: string
}

export interface BlockRequest {
  targetUserId: string
}

export interface TipRequest {
  postId?: string
  receiverId: string
  amount: string
  currency: string
}

// ============================================
// 分页相关类型
// ============================================
export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasMore: boolean
  }
}

// ============================================
// API 错误响应类型
// ============================================
export interface ApiError {
  message: string
  code?: string
  details?: Record<string, unknown>
}





