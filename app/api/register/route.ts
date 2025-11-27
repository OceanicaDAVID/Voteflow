import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { z } from "zod"

// 输入验证 Schema
const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional()
})

// 密码加密强度 (值越高越安全，但也越慢)
const BCRYPT_SALT_ROUNDS = 10

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // 使用 Zod 验证输入
    const validation = registerSchema.safeParse(body)
    if (!validation.success) {
      return new NextResponse(validation.error.errors[0].message, { status: 400 })
    }

    const { email, password, name } = validation.data

    const exists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (exists) {
      return new NextResponse("User already exists", { status: 400 })
    }

    // 使用 bcrypt 加密密码
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split('@')[0],
      },
    })

    // 不返回密码字段
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error(error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

