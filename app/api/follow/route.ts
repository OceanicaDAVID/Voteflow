import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { z } from "zod"

// 输入验证 Schema
const followSchema = z.object({
  targetUserId: z.string().min(1, "Target user ID is required")
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    const body = await req.json()
    
    // 输入验证
    const validation = followSchema.safeParse(body)
    if (!validation.success) {
      return new NextResponse(validation.error.errors[0].message, { status: 400 })
    }
    
    const { targetUserId } = validation.data

    if (targetUserId === session.user.id) {
      return new NextResponse("Cannot follow self", { status: 400 })
    }

    // 验证目标用户是否存在
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId }
    })

    if (!targetUser) {
      return new NextResponse("User not found", { status: 404 })
    }

    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: targetUserId
        }
      }
    })

    if (existingFollow) {
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: session.user.id,
            followingId: targetUserId
          }
        }
      })
      return new NextResponse("Unfollowed", { status: 200 })
    } else {
      await prisma.follows.create({
        data: {
          followerId: session.user.id,
          followingId: targetUserId
        }
      })
      return new NextResponse("Followed", { status: 200 })
    }
  } catch (error) {
    console.error(error)
    return new NextResponse("Error", { status: 500 })
  }
}

