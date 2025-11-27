import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    const { targetUserId } = await req.json()

    if (targetUserId === session.user.id) {
        return new NextResponse("Cannot block self", { status: 400 })
    }

    const existingBlock = await prisma.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: session.user.id,
          blockedId: targetUserId
        }
      }
    })

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          blockerId_blockedId: {
            blockerId: session.user.id,
            blockedId: targetUserId
          }
        }
      })
      return new NextResponse("Unblocked", { status: 200 })
    } else {
      await prisma.block.create({
        data: {
          blockerId: session.user.id,
          blockedId: targetUserId
        }
      })
      // Also unfollow if blocking
      await prisma.follows.deleteMany({
        where: {
            OR: [
                { followerId: session.user.id, followingId: targetUserId },
                { followerId: targetUserId, followingId: session.user.id }
            ]
        }
      })
      return new NextResponse("Blocked", { status: 200 })
    }
  } catch (error) {
    return new NextResponse("Error", { status: 500 })
  }
}

