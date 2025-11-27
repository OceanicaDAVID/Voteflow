import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function RightSection() {
  return (
    <div className="flex flex-col gap-4 py-4 pl-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input className="rounded-full bg-secondary pl-10" placeholder="Search" />
      </div>
      
      <div className="rounded-xl bg-secondary/50 p-4">
        <h2 className="mb-4 text-xl font-bold">What's happening</h2>
        <div className="flex flex-col gap-4">
          <div className="cursor-pointer hover:bg-secondary/50 p-2 rounded-md -mx-2">
            <p className="text-xs text-muted-foreground">Technology · Trending</p>
            <p className="font-bold">#NextJS</p>
            <p className="text-xs text-muted-foreground">50.4K posts</p>
          </div>
          <div className="cursor-pointer hover:bg-secondary/50 p-2 rounded-md -mx-2">
            <p className="text-xs text-muted-foreground">Politics · Trending</p>
            <p className="font-bold">#Vote2024</p>
            <p className="text-xs text-muted-foreground">120K posts</p>
          </div>
        </div>
      </div>
    </div>
  )
}

