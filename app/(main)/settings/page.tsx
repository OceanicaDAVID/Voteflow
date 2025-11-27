import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { SettingsForm } from "@/components/settings/SettingsForm"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, walletAddress: true, email: true }
  })

  if (!user) return null

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10 border-b bg-background/80 px-4 py-3 backdrop-blur-md">
        <h1 className="text-xl font-bold">Settings</h1>
      </div>
      <div className="p-4 max-w-xl">
        <h2 className="text-lg font-semibold mb-4">Profile & Wallet</h2>
        <SettingsForm user={user} />
      </div>
    </div>
  )
}

