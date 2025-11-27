"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { UserRole } from "@prisma/client"

// Helper: Check if current user is Admin
async function checkAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin access required")
  }
  return session
}

// Helper: Check if current user is Moderator or Admin
async function checkMod() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR")) {
    throw new Error("Unauthorized: Moderator access required")
  }
  return session
}

export async function getAdminStats() {
  await checkMod()
  
  const totalUsers = await prisma.user.count()
  const totalPosts = await prisma.post.count()
  const totalVotes = await prisma.vote.count()
  
  // Simple "growth" metric (last 24h) - simplified for MVP
  const recentUsers = await prisma.user.count({
    where: { createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }
  })

  return {
    totalUsers,
    totalPosts,
    totalVotes,
    recentUsers
  }
}

export async function getUsers(page = 1, search = "") {
  await checkMod()
  const pageSize = 20
  
  const where = search ? {
    OR: [
      { name: { contains: search, mode: 'insensitive' as const } },
      { email: { contains: search, mode: 'insensitive' as const } }
    ]
  } : {}

  const users = await prisma.user.findMany({
    where,
    take: pageSize,
    skip: (page - 1) * pageSize,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
      _count: {
        select: { posts: true, votes: true }
      }
    }
  })

  const total = await prisma.user.count({ where })
  
  return { users, total, totalPages: Math.ceil(total / pageSize) }
}

export async function updateUserRole(userId: string, newRole: UserRole) {
  await checkAdmin() // Only Admin can change roles
  
  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole }
  })
  
  revalidatePath('/admin/users')
  return { success: true }
}

// Using a "blocked" mechanism is safer than deleting users
// But for now, let's just support fetching posts for moderation
export async function getFlaggedPosts(page = 1) {
  await checkMod()
  // In a real app, we would have a 'reports' table.
  // For now, we just list recent posts for manual review.
  
  const posts = await prisma.post.findMany({
    take: 20,
    skip: (page - 1) * 20,
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { name: true, email: true, image: true } },
      _count: { select: { likes: true } }
    }
  })
  
  return posts
}

export async function deletePostAsAdmin(postId: string) {
  await checkMod()
  
  await prisma.post.delete({
    where: { id: postId }
  })
  
  revalidatePath('/admin/posts')
  return { success: true }
}

