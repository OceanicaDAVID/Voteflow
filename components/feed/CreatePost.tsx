"use client"

import { useState, useRef } from "react"
import { Avatar } from "@/components/ui/avatar" // Need to create Avatar
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { BarChart2, Image as ImageIcon, Smile, X, Video } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/providers/LanguageProvider"

export function CreatePost() {
  const { data: session } = useSession()
  const router = useRouter()
  const { t } = useLanguage()
  const [content, setContent] = useState("")
  const [isPoll, setIsPoll] = useState(false)
  const [options, setOptions] = useState(["", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [mediaUrl, setMediaUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const MAX_LENGTH = 5000

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""])
    }
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      setIsUploading(true)
      const formData = new FormData()
      formData.append("file", file)

      try {
          const res = await fetch("/api/upload", {
              method: "POST",
              body: formData
          })
          const data = await res.json()
          if (data.success) {
              setMediaUrl(data.url)
          }
      } catch (error) {
          console.error("Upload failed", error)
      } finally {
          setIsUploading(false)
      }
  }

  const handleSubmit = async () => {
    if (!content.trim() && !isPoll && !mediaUrl) return
    if (content.length > MAX_LENGTH) return
    if (isPoll && options.some(o => !o.trim())) return // Validate options

    setIsLoading(true)
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          images: mediaUrl ? [mediaUrl] : [],
          poll: isPoll ? { options: options.filter(o => o.trim()) } : undefined
        }),
      })

      if (res.ok) {
        setContent("")
        setIsPoll(false)
        setOptions(["", ""])
        setMediaUrl(null)
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!session) return null

  return (
    <div className="border-b p-4 bg-background/50 backdrop-blur-sm">
      <div className="flex gap-4">
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
             {session.user?.image ? <img src={session.user.image} alt="User" /> : null}
        </div>
        <div className="flex-1">
          <div className="relative">
            <Textarea
                placeholder={t('feed.placeholder')}
                className="min-h-[100px] border-none text-xl resize-none focus-visible:ring-0 px-0 bg-transparent pr-12"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={MAX_LENGTH}
            />
            <div className={`absolute bottom-2 right-2 text-xs ${content.length > MAX_LENGTH * 0.9 ? 'text-red-500' : 'text-muted-foreground'}`}>
                {content.length}/{MAX_LENGTH}
            </div>
          </div>
          
          {mediaUrl && (
              <div className="relative mt-2 rounded-xl overflow-hidden border">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8 z-10"
                    onClick={() => setMediaUrl(null)}
                  >
                      <X className="h-4 w-4" />
                  </Button>
                  {mediaUrl.match(/\.(mp4|webm)$/i) ? (
                      <video src={mediaUrl} controls className="w-full max-h-[400px] object-cover" />
                  ) : (
                      <img src={mediaUrl} alt="Upload" className="w-full max-h-[400px] object-cover" />
                  )}
              </div>
          )}

          {isPoll && (
            <div className="mt-2 rounded-xl border p-3">
              <div className="flex flex-col gap-2">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      maxLength={25}
                    />
                    {index > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => {
                            const newOpts = [...options]
                            newOpts.splice(index, 1)
                            setOptions(newOpts)
                        }}>
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                  </div>
                ))}
              </div>
              {options.length < 4 && (
                <Button
                  variant="ghost"
                  className="mt-2 h-8 text-primary"
                  onClick={handleAddOption}
                >
                  {t('feed.addOption')}
                </Button>
              )}
              <div className="mt-4 border-t pt-2">
                 <Button variant="ghost" className="w-full text-destructive" onClick={() => setIsPoll(false)}>{t('feed.removePoll')}</Button>
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between border-t pt-3">
            <div className="flex gap-2 text-primary">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*,video/*" 
                onChange={handleFileSelect}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-primary"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-primary"
                onClick={() => setIsPoll(!isPoll)}
                disabled={isPoll}
              >
                <BarChart2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-primary">
                <Smile className="h-5 w-5" />
              </Button>
            </div>
            <Button 
                className="rounded-full px-6 font-bold" 
                onClick={handleSubmit}
                disabled={isLoading || isUploading || (!content.trim() && !isPoll && !mediaUrl)}
            >
              {isLoading || isUploading ? t('feed.posting') : t('feed.post')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

