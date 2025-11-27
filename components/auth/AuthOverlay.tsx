"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { X } from "lucide-react"

export function AuthOverlay() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(false) // Toggle between Login and Register

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
        signIn("credentials", { email, password, callbackUrl: "/" })
    } else {
        // Handle register redirection or logic
        window.location.href = `/register?email=${encodeURIComponent(email)}`
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-transparent">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 relative animate-in fade-in zoom-in duration-300 ring-1 ring-black/5">
        
        <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">
                {isLogin ? "Sign in to VoteFlow" : "Join VoteFlow Today"}
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
                {isLogin ? "Welcome back! Ready to vote?" : "See what people are voting on right now."}
            </p>
        </div>

        <div className="space-y-3">
            <Button variant="outline" className="w-full relative" onClick={() => signIn('google')}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
            </Button>
            <Button variant="outline" className="w-full relative" onClick={() => signIn('apple')}>
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s2.57-.99 3.87-.82c.69.03 2.29.32 3.4 1.92-3.03 1.58-2.49 5.4 1.01 6.84-.63 1.52-1.68 3.12-3.36 4.29zm-2.11-13.75c.6-1.18 1.96-2.14 3.38-1.43.13 1.52-.98 3.06-2.7 3.06-1.06-.03-2.26-1.1-1.45-3.24z"/></svg>
            Continue with Apple
            </Button>
        </div>

        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-muted-foreground">
                or
                </span>
            </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
                <Input 
                    placeholder="Full Name (Optional)" 
                    className="bg-transparent"
                />
            )}
            <Input 
                type="email" 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent"
                required
            />
            <Input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent"
                required
            />
            
            <Button type="submit" className="w-full rounded-full font-bold text-md h-11">
                {isLogin ? "Sign In" : "Create Account"}
            </Button>
        </form>

        <div className="text-center text-sm">
            <p className="text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="font-semibold text-primary hover:underline"
            >
                {isLogin ? "Sign up" : "Sign in"}
            </button>
            </p>
        </div>
      </div>
    </div>
  )
}

