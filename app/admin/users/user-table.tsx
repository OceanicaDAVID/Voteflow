"use client"

import { updateUserRole } from "@/app/actions/admin"
import { useState } from "react"

type User = {
  id: string
  name: string | null
  email: string | null
  role: string
  image: string | null
  createdAt: Date
  _count: { posts: number; votes: number }
}

export default function UserTable({ users }: { users: User[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleRoleChange = async (userId: string, newRole: "USER" | "MODERATOR" | "ADMIN") => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return
    
    setLoadingId(userId)
    try {
      await updateUserRole(userId, newRole)
      // The page will be revalidated by the server action, but we can also force refresh if needed
      // For now, the revalidatePath in the action should handle UI update on next render
    } catch (error) {
      alert("Failed to update role")
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
              <th className="px-6 py-4 font-medium text-gray-500 text-sm">User</th>
              <th className="px-6 py-4 font-medium text-gray-500 text-sm">Role</th>
              <th className="px-6 py-4 font-medium text-gray-500 text-sm">Stats</th>
              <th className="px-6 py-4 font-medium text-gray-500 text-sm">Joined</th>
              <th className="px-6 py-4 font-medium text-gray-500 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                      {user.image ? (
                        <img src={user.image} alt={user.name || ""} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">?</div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name || "Anonymous"}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 
                      user.role === 'MODERATOR' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div>{user._count.posts} posts</div>
                  <div>{user._count.votes} votes</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <select 
                    disabled={loadingId === user.id || user.role === 'ADMIN'}
                    className="text-sm border rounded px-2 py-1 bg-white"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                  >
                    <option value="USER">User</option>
                    <option value="MODERATOR">Moderator</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

