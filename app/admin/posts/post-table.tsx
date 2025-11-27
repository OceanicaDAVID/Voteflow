"use client"

import { deletePostAsAdmin } from "@/app/actions/admin"
import { useState } from "react"
import { Trash2, Eye } from "lucide-react"

type Post = {
  id: string
  content: string
  createdAt: Date
  author: {
    name: string | null
    email: string | null
    image: string | null
  }
  _count: {
    likes: number
    votes: number // We need to fix this in the action return type if it doesn't match perfectly
  }
}

export default function PostTable({ posts }: { posts: Post[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to DELETE this post? This cannot be undone.")) return
    
    setLoadingId(postId)
    try {
      await deletePostAsAdmin(postId)
    } catch (error) {
      alert("Failed to delete post")
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 font-medium text-gray-500 text-sm">Content</th>
              <th className="px-6 py-4 font-medium text-gray-500 text-sm">Author</th>
              <th className="px-6 py-4 font-medium text-gray-500 text-sm">Date</th>
              <th className="px-6 py-4 font-medium text-gray-500 text-sm">Engagement</th>
              <th className="px-6 py-4 font-medium text-gray-500 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 max-w-md">
                  <p className="line-clamp-2 text-gray-900">{post.content}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{post.author.name || "Anonymous"}</div>
                  <div className="text-xs text-gray-500">{post.author.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {post._count.likes} likes
                </td>
                <td className="px-6 py-4 text-right">
                   <button 
                    onClick={() => handleDelete(post.id)}
                    disabled={loadingId === post.id}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    title="Delete Post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

