import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { z } from "zod"

// 输入验证 Schema
const voteSchema = z.object({
  pollId: z.string().min(1, "Poll ID is required"),
  optionId: z.string().min(1, "Option ID is required")
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const body = await req.json()
    
    // 输入验证
    const validation = voteSchema.safeParse(body)
    if (!validation.success) {
      return new NextResponse(validation.error.errors[0].message, { status: 400 })
    }
    
    const { pollId, optionId } = validation.data

    // 验证 poll 和 option 是否存在
    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: { options: true }
    })

    if (!poll) {
      return new NextResponse("Poll not found", { status: 404 })
    }

    const optionExists = poll.options.some(opt => opt.id === optionId)
    if (!optionExists) {
      return new NextResponse("Invalid option for this poll", { status: 400 })
    }

    // Check if already voted
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_pollId: {
          userId: session.user.id,
          pollId
        }
      }
    })

    if (existingVote) {
      return new NextResponse("Already voted", { status: 400 })
    }

    await prisma.vote.create({
      data: {
        userId: session.user.id,
        pollId,
        optionId
      }
    })

    return new NextResponse("Voted", { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

