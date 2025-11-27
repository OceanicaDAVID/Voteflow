"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { MessageCircle, Repeat2, Heart, Share, UserPlus, UserCheck, BarChart2, MoreHorizontal, Ban, EyeOff, Coins } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import type { Post, PollOption } from "@/types"

interface PostItemProps {
  post: Post
  currentUserId?: string
}

export function PostItem({ post, currentUserId }: PostItemProps) {
  const router = useRouter()
  const [isVoting, setIsVoting] = useState(false)
  const [isLiking, setIsLiking] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [tipAmount, setTipAmount] = useState("")
  const [isTipping, setIsTipping] = useState(false)
  const [isTipDialogOpen, setIsTipDialogOpen] = useState(false)
  const viewRecorded = useRef(false)

  const { toast } = useToast()
  
  const hasPoll = !!post.poll
  const userVotedOptionId = post.poll?.votes?.[0]?.optionId
  const totalVotes = post.poll?.options.reduce((acc: number, opt: PollOption) => acc + opt._count.votes, 0) || 0
  
  const isLiked = post.likes?.length > 0
  const likesCount = post._count.likes
  const isFollowed = post.author.followedBy?.length > 0
  const isSelf = currentUserId === post.author.id
  const viewsCount = post.views || 0

  useEffect(() => {
    if (viewRecorded.current || isHidden) return
    viewRecorded.current = true
    
    // Fire and forget view increment
    fetch("/api/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post.id })
    }).catch(console.error)
  }, [post.id, isHidden])

  const handleVote = async (optionId: string) => {
    if (!currentUserId) return 
    if (userVotedOptionId) return 
    
    setIsVoting(true)
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pollId: post.poll.id,
          optionId
        })
      })
      
      if (res.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsVoting(false)
    }
  }

  const handleLike = async (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!currentUserId) return
      setIsLiking(true)
      try {
          const res = await fetch("/api/like", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ postId: post.id })
          })
          if (res.ok) router.refresh()
      } catch (error) {
          console.error(error)
      } finally {
          setIsLiking(false)
      }
  }

  const handleFollow = async (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!currentUserId) return
      setIsFollowing(true)
      try {
          const res = await fetch("/api/follow", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ targetUserId: post.author.id })
          })
          if (res.ok) router.refresh()
      } catch (error) {
          console.error(error)
      } finally {
          setIsFollowing(false)
      }
  }

  const handleBlock = async () => {
      if (!currentUserId) return
      try {
          const res = await fetch("/api/block", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ targetUserId: post.author.id })
          })
          if (res.ok) {
              router.refresh() // This should remove the post from feed if backend filters it
          }
      } catch (error) {
          console.error(error)
      }
  }

  const handleTip = async () => {
      if (!currentUserId || !tipAmount) return
      setIsTipping(true)
      try {
          const res = await fetch("/api/tip", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                  postId: post.id,
                  receiverId: post.author.id,
                  amount: tipAmount,
                  currency: "ETH"
              })
          })
          if (res.ok) {
              setIsTipDialogOpen(false)
              setTipAmount("")
              toast({
                title: "Success",
                description: "Tip sent successfully!",
              })
          }
      } catch (error) {
          console.error(error)
      } finally {
          setIsTipping(false)
      }
  }

  if (isHidden) return null

  return (
    <div className="border-b p-4 hover:bg-secondary/5 transition-colors cursor-pointer relative group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsHidden(true)}>
                    <EyeOff className="mr-2 h-4 w-4" />
                    <span>Not interested in this post</span>
                </DropdownMenuItem>
                {!isSelf && (
                    <DropdownMenuItem onClick={handleBlock} className="text-destructive focus:text-destructive">
                        <Ban className="mr-2 h-4 w-4" />
                        <span>Block @{post.author.name}</span>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src={post.author.image} />
          <AvatarFallback>{post.author.name?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
                <span className="font-bold hover:underline truncate">{post.author.name}</span>
                <span className="text-muted-foreground text-sm truncate">@{post.author.name?.toLowerCase().replace(/\s/g, '')}</span>
                <span className="text-muted-foreground text-sm">·</span>
                <span className="text-muted-foreground text-sm hover:underline flex-shrink-0">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </span>
            </div>
            {!isSelf && currentUserId && (
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn("h-6 px-2 rounded-full mr-6", isFollowed ? "text-green-600" : "text-primary")}
                    onClick={handleFollow}
                    disabled={isFollowing}
                >
                    {isFollowed ? <UserCheck className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                </Button>
            )}
          </div>
          
          <div className="mt-1 text-base whitespace-pre-wrap break-words">
            {post.content}
          </div>

          {post.images && post.images.length > 0 && (
              <div className="mt-3 rounded-xl overflow-hidden border">
                  {post.images.map((url: string, index: number) => (
                      <div key={index}>
                          {url.match(/\.(mp4|webm)$/i) ? (
                              <video src={url} controls className="w-full max-h-[500px] object-cover" />
                          ) : (
                              <img src={url} alt="Post content" className="w-full max-h-[500px] object-cover" />
                          )}
                      </div>
                  ))}
              </div>
          )}

          {hasPoll && (
            <div className="mt-3 flex flex-col gap-2">
              {post.poll.options.map((option: PollOption) => {
                const votes = option._count.votes
                const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0
                const isSelected = userVotedOptionId === option.id
                const showResults = !!userVotedOptionId

                return (
                  <div key={option.id} className="relative">
                    {showResults ? (
                       <div className="relative h-8 w-full rounded-md bg-secondary overflow-hidden flex items-center px-3">
                          <div 
                            className={cn("absolute left-0 top-0 h-full bg-primary/20 transition-all duration-500", isSelected && "bg-primary/40")} 
                            style={{ width: `${percentage}%` }}
                          />
                          <div className="relative z-10 flex w-full justify-between text-sm font-medium">
                            <span>{option.text} {isSelected && "(You)"}</span>
                            <span>{percentage}%</span>
                          </div>
                       </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="h-8 w-full justify-center rounded-full border-primary text-primary hover:bg-primary/10"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleVote(option.id)
                        }}
                        disabled={isVoting}
                      >
                        {option.text}
                      </Button>
                    )}
                  </div>
                )
              })}
              <div className="mt-1 text-xs text-muted-foreground">
                {totalVotes} votes · {post.poll.expiresAt ? "Ends soon" : "Final results"}
              </div>
            </div>
          )}

          <div className="mt-3 flex justify-between text-muted-foreground max-w-md">
            <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 rounded-full h-8 w-8">
                <MessageCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-green-500 hover:bg-green-500/10 rounded-full h-8 w-8">
                <Repeat2 className="h-4 w-4" />
            </Button>
            <Button 
                variant="ghost" 
                size="icon" 
                className={cn("hover:text-pink-500 hover:bg-pink-500/10 rounded-full h-8 w-8 flex items-center gap-1 w-auto px-2", isLiked && "text-pink-500")}
                onClick={handleLike}
                disabled={isLiking}
            >
                <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
                {likesCount > 0 && <span className="text-xs">{likesCount}</span>}
            </Button>
            
            <Dialog open={isTipDialogOpen} onOpenChange={setIsTipDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:text-yellow-500 hover:bg-yellow-500/10 rounded-full h-8 w-8" onClick={(e) => e.stopPropagation()}>
                        <Coins className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent onClick={(e) => e.stopPropagation()}>
                    <DialogHeader>
                        <DialogTitle>Tip {post.author.name}</DialogTitle>
                        <DialogDescription>
                            Support this creator by sending crypto.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="p-4 bg-secondary rounded-lg border">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-muted-foreground">WALLET INFO</span>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-6 text-xs text-primary"
                                    onClick={() => {
                                        navigator.clipboard.writeText(post.author.walletAddress || "")
                                        toast({
                                          title: "Copied",
                                          description: "Wallet address copied to clipboard",
                                        })
                                    }}
                                >
                                    Copy
                                </Button>
                            </div>
                            <p className="font-mono text-sm break-all whitespace-pre-wrap">
                                {post.author.walletAddress || "No wallet info provided"}
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsTipDialogOpen(false)}>
                            Done
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 rounded-full h-8 w-8">
                <Share className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1 text-xs hover:text-primary cursor-default">
                <BarChart2 className="h-4 w-4" />
                <span>{viewsCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
