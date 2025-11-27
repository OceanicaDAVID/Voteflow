"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/components/providers/LanguageProvider"

export function FeedHeader() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'polls'
  const filter = searchParams.get('filter') || 'trending'
  const { t } = useLanguage()

  return (
    <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-md">
        <div className="px-4 py-3">
            <h1 className="text-xl font-bold">{t('nav.home')}</h1>
        </div>
        
        {/* Main Tabs: Polls vs Posts */}
        <div className="flex w-full border-b">
            <Link 
                href="/?tab=polls" 
                className={cn(
                    "flex-1 py-4 text-center font-bold hover:bg-secondary/50 transition-colors relative",
                    tab === 'polls' ? "text-foreground" : "text-muted-foreground"
                )}
            >
                {t('feed.polls')}
                {tab === 'polls' && <div className="absolute bottom-0 left-1/2 h-1 w-14 -translate-x-1/2 rounded-full bg-primary" />}
            </Link>
            <Link 
                href="/?tab=posts" 
                className={cn(
                    "flex-1 py-4 text-center font-bold hover:bg-secondary/50 transition-colors relative",
                    tab === 'posts' ? "text-foreground" : "text-muted-foreground"
                )}
            >
                {t('feed.posts')}
                {tab === 'posts' && <div className="absolute bottom-0 left-1/2 h-1 w-14 -translate-x-1/2 rounded-full bg-primary" />}
            </Link>
        </div>

        {/* Sub Tabs for Posts: Trending vs Following */}
        {tab === 'posts' && (
             <div className="flex w-full border-b bg-secondary/20">
                <Link 
                    href="/?tab=posts&filter=trending" 
                    className={cn(
                        "flex-1 py-3 text-center text-sm font-medium hover:bg-secondary/50 transition-colors",
                        filter === 'trending' ? "text-primary" : "text-muted-foreground"
                    )}
                >
                    {t('feed.trending')}
                </Link>
                <Link 
                    href="/?tab=posts&filter=following" 
                    className={cn(
                        "flex-1 py-3 text-center text-sm font-medium hover:bg-secondary/50 transition-colors",
                        filter === 'following' ? "text-primary" : "text-muted-foreground"
                    )}
                >
                    {t('feed.following')}
                </Link>
            </div>
        )}
      </div>
  )
}

