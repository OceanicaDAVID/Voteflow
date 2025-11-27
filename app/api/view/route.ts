import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { postId } = await req.json()

    if (!postId) {
      return new NextResponse("Missing postId", { status: 400 })
    }

    await prisma.post.update({
      where: { id: postId },
      data: {
        views: {
          increment: 1
        }
      }
    })

    return new NextResponse("Viewed", { status: 200 })
  } catch (error) {
    return new NextResponse("Error", { status: 500 })
  }
}

