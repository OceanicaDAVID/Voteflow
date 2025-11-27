import { CreatePost } from "@/components/feed/CreatePost"
import { PostItem } from "@/components/feed/PostItem"
import { FeedHeader } from "@/components/feed/FeedHeader"
import { AuthOverlay } from "@/components/auth/AuthOverlay"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { cn } from "@/lib/utils"

async function getPosts(userId: string | undefined, tab: string, filter: string) {
// ... (rest of function remains same)
  const isPolls = tab === 'polls' || !tab
  const isFollowing = filter === 'following'

  let where: any = {}
  let orderBy: any = { createdAt: 'desc' }

  // Base filter: Exclude posts from blocked users
  if (userId) {
      where.author = {
          ...where.author,
          blockedBy: {
              none: {
                  blockerId: userId
              }
          }
      }
  }

  if (isPolls) {
    where = { ...where, poll: { isNot: null } }
    // Sort by views (Trending Polls)
    orderBy = { views: 'desc' }
  } else {
    // Normal Posts
    where = { ...where, poll: null }
    
    if (isFollowing && userId) {
      // Filter by following
      where.author = {
        ...where.author,
        followedBy: {
          some: {
            followerId: userId
          }
        }
      }
      // Sort by time
      orderBy = { createdAt: 'desc' }
    } else {
      // Trending Posts (Default for Posts tab)
      // Sort by views
      orderBy = { views: 'desc' }
    }
  }

  return await prisma.post.findMany({
    where,
    orderBy,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          email: true,
          followedBy: {
             where: {
                 followerId: userId || ''
             },
             select: {
                 followerId: true
             }
          },
          walletAddress: true
        }
      },
      poll: {
        include: {
          options: {
            include: {
              _count: {
                select: { votes: true }
              }
            }
          },
          votes: {
            where: {
              userId: userId
            },
            select: {
              optionId: true
            }
          }
        }
      },
      likes: {
          where: {
              userId: userId
          },
          select: {
              userId: true
          }
      },
      _count: {
        select: { likes: true }
      }
    }
  })
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const session = await getServerSession(authOptions)
  const tab = (searchParams.tab as string) || 'polls'
  const filter = (searchParams.filter as string) || 'trending'
  
  const posts = await getPosts(session?.user?.id, tab, filter)

  return (
    <div className="flex flex-col relative">
      {!session && <AuthOverlay />}
      
      <FeedHeader />
      
      <CreatePost />

      <div className="flex flex-col">
        {posts.map((post) => (
          <PostItem 
            key={post.id} 
            post={post} 
            currentUserId={session?.user?.id} 
          />
        ))}
        {posts.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
                {tab === 'posts' && filter === 'following' && !session 
                    ? "Sign in to see posts from people you follow." 
                    : "No posts found."}
            </div>
        )}
      </div>
    </div>
  )
}
