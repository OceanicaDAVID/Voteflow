"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Compass, Bell, User, PenTool, LogOut, Vote, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import { useLanguage } from "@/components/providers/LanguageProvider"

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { t } = useLanguage()

  const sidebarItems = [
    { icon: Home, label: t('nav.home'), href: "/" },
    { icon: Compass, label: t('nav.discover'), href: "/explore" },
    { icon: Bell, label: t('nav.alerts'), href: "/notifications" },
    { icon: User, label: t('nav.profile'), href: "/profile" },
    { icon: Settings, label: t('nav.settings'), href: "/settings" },
  ]

  return (
    <div className="flex h-full flex-col justify-between py-6 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      <div className="flex flex-col gap-6">
        <div className="px-6 flex items-center gap-2 text-primary">
          <Vote className="h-8 w-8" />
          <h1 className="text-2xl font-extrabold tracking-tight hidden xl:block">VoteFlow</h1>
        </div>
        
        <nav className="flex flex-col gap-2 px-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 rounded-lg px-4 py-3 text-lg font-medium transition-all hover:bg-slate-100 dark:hover:bg-slate-800",
                  isActive ? "bg-slate-100 dark:bg-slate-800 text-primary" : "text-slate-600 dark:text-slate-400"
                )}
              >
                <Icon className="h-6 w-6" />
                <span className="hidden xl:inline">{item.label}</span>
              </Link>
            )
          })}
        </nav>
        
        <div className="px-4">
          <Button className="w-full rounded-lg text-lg py-6 shadow-lg hover:shadow-xl transition-all" size="lg">
            <PenTool className="mr-2 h-5 w-5 xl:hidden" />
            <span className="hidden xl:inline">{t('nav.newVote')}</span>
          </Button>
        </div>
      </div>

      {session?.user && (
        <div className="px-4">
          <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer border border-transparent hover:border-slate-200 transition-all" onClick={() => signOut()}>
            <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden">
                {session.user.image ? (
                    <img src={session.user.image} alt={session.user.name || "User"} />
                ) : (
                    <User className="h-full w-full p-2 text-slate-400" />
                )}
            </div>
            <div className="hidden xl:block overflow-hidden">
              <p className="font-bold text-sm truncate">{session.user.name}</p>
              <p className="text-slate-500 text-xs truncate">@{session.user.name?.toLowerCase().replace(/\s/g, '')}</p>
            </div>
            <LogOut className="ml-auto h-4 w-4 text-slate-400 hidden xl:block" />
          </div>
        </div>
      )}
      {!session?.user && (
         <div className="px-4">
            <Link href="/api/auth/signin">
                <Button variant="outline" className="w-full rounded-lg">{t('nav.signIn')}</Button>
            </Link>
         </div>
      )}
    </div>
  )
}
