import { getFlaggedPosts } from "@/app/actions/admin"
import PostTable from "./post-table"

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = Number(searchParams.page) || 1
  
  const posts = await getFlaggedPosts(page)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Post Moderation</h1>
        <div className="text-sm text-gray-500">
          Recent Posts
        </div>
      </div>

      <PostTable posts={posts as any} />
      
      <div className="mt-6 flex justify-center gap-2">
        {page > 1 && (
          <a href={`/admin/posts?page=${page - 1}`} className="px-4 py-2 border rounded hover:bg-gray-50">
            Previous
          </a>
        )}
        <a href={`/admin/posts?page=${page + 1}`} className="px-4 py-2 border rounded hover:bg-gray-50">
          Next
        </a>
      </div>
    </div>
  )
}

