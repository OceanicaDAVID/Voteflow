import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { z } from "zod"

// 分页常量
const DEFAULT_PAGE_SIZE = 20
const MAX_PAGE_SIZE = 100

// 创建帖子的输入验证
const createPostSchema = z.object({
  content: z.string().min(1, "Content is required").max(5000, "Content too long"),
  images: z.array(z.string().url()).optional(),
  poll: z.object({
    options: z.array(z.string().min(1)).min(2, "Poll must have at least 2 options").max(4, "Poll can have at most 4 options")
  }).optional()
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const body = await req.json()
    
    // 输入验证
    const validation = createPostSchema.safeParse(body)
    if (!validation.success) {
      return new NextResponse(validation.error.errors[0].message, { status: 400 })
    }
    
    const { content, images, poll } = validation.data

    const post = await prisma.post.create({
      data: {
        content,
        images: images || [],
        authorId: session.user.id,
        poll: poll ? {
          create: {
            question: content || "Poll",
            options: {
              create: poll.options.map((opt: string) => ({ text: opt }))
            }
          }
        } : undefined
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error(error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  
  try {
    // 解析分页参数
    const { searchParams } = new URL(req.url)
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(MAX_PAGE_SIZE, Math.max(1, parseInt(searchParams.get("limit") || String(DEFAULT_PAGE_SIZE))))
    const skip = (page - 1) * limit

    // 获取总数（用于分页信息）
    const total = await prisma.post.count()

    const posts = await prisma.post.findMany({
      skip,
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
            followedBy: {
                where: {
                    followerId: session?.user?.id || ''
                },
                select: {
                    followerId: true
                }
            },
            blockedBy: {
                where: {
                    blockerId: session?.user?.id || ''
                },
                select: {
                    blockerId: true
                }
            },
            walletAddress: true
          }
        },
        likes: {
            where: {
                userId: session?.user?.id
            },
            select: {
                userId: true
            }
        },
        poll: {
          include: {
            options: {
              include: {
                _count: {
                  select: { votes: true }
                }
              }
            },
            votes: {
                where: {
                    userId: session?.user?.id
                },
                select: {
                    optionId: true
                }
            }
          }
        },
        _count: {
          select: { likes: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // 返回带分页信息的响应
    const totalPages = Math.ceil(total / limit)
    
    return NextResponse.json({
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages
      }
    })
  } catch (error) {
    console.error(error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

