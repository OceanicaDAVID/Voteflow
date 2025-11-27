import { getUsers } from "@/app/actions/admin"
import UserTable from "./user-table"

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { page?: string, search?: string }
}) {
  const page = Number(searchParams.page) || 1
  const search = searchParams.search || ""
  
  const { users, total, totalPages } = await getUsers(page, search)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <div className="text-sm text-gray-500">
          Total Users: {total}
        </div>
      </div>

      {/* Search Bar (Simple form) */}
      <form className="mb-6 flex gap-2">
        <input 
          name="search" 
          placeholder="Search by name or email..." 
          defaultValue={search}
          className="flex-1 max-w-sm px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium">
          Search
        </button>
      </form>

      <UserTable users={users} />
      
      {/* Simple Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        {page > 1 && (
          <a href={`/admin/users?page=${page - 1}&search=${search}`} className="px-4 py-2 border rounded hover:bg-gray-50">
            Previous
          </a>
        )}
        <span className="px-4 py-2 text-gray-500">Page {page} of {totalPages}</span>
        {page < totalPages && (
          <a href={`/admin/users?page=${page + 1}&search=${search}`} className="px-4 py-2 border rounded hover:bg-gray-50">
            Next
          </a>
        )}
      </div>
    </div>
  )
}

