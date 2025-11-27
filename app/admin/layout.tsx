import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Users, FileText, Home } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR")) {
    redirect("/")
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r h-screen fixed left-0 top-0 p-6">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="font-bold text-xl">Admin Panel</span>
        </div>
        
        <nav className="space-y-2">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link 
            href="/admin/users" 
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            <Users className="w-5 h-5" />
            Users
          </Link>
          <Link 
            href="/admin/posts" 
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            <FileText className="w-5 h-5" />
            Posts
          </Link>
          
          <div className="my-4 border-t border-gray-200"></div>
          
          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            Back to Site
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  )
}

