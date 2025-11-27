import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    const { postId, amount, currency, receiverId } = await req.json()

    // In a real app, you would verify the blockchain transaction here
    // or interact with a smart contract.
    // For this demo, we just record the intent.

    await prisma.tip.create({
      data: {
        senderId: session.user.id,
        receiverId: receiverId,
        postId: postId,
        amount: parseFloat(amount),
        currency: currency || "ETH",
        txHash: "simulated_tx_" + Date.now()
      }
    })

    return new NextResponse("Tip recorded", { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse("Error", { status: 500 })
  }
}

