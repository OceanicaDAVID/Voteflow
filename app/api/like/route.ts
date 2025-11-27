import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { z } from "zod"

// 输入验证 Schema
const likeSchema = z.object({
  postId: z.string().min(1, "Post ID is required")
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    const body = await req.json()
    
    // 输入验证
    const validation = likeSchema.safeParse(body)
    if (!validation.success) {
      return new NextResponse(validation.error.errors[0].message, { status: 400 })
    }
    
    const { postId } = validation.data

    // 验证帖子是否存在
    const post = await prisma.post.findUnique({
      where: { id: postId }
    })

    if (!post) {
      return new NextResponse("Post not found", { status: 404 })
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId
        }
      }
    })

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId
          }
        }
      })
      return new NextResponse("Unliked", { status: 200 })
    } else {
      await prisma.like.create({
        data: {
          userId: session.user.id,
          postId
        }
      })
      return new NextResponse("Liked", { status: 200 })
    }
  } catch (error) {
    console.error(error)
    return new NextResponse("Error", { status: 500 })
  }
}

