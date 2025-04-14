"use client"

import { useUsers } from "../../context/UserContext"
import { useEffect } from "react"

export default function UsersPage() {
  const { users, loading, fetchUsers, updateUser, removeUser } = useUsers()

  useEffect(() => {
    console.log("Users from context:", users)
  }, [users])

  // Add this to force a refresh if needed
  useEffect(() => {
    // Uncomment the next line if you want to force a refresh when the component mounts
    // fetchUsers();
  }, [])

  if (loading)
    return (
      <div className="p-6 flex justify-center items-center">
        <p className="text-black text-xl">Loading users...</p>
      </div>
    )

  if (!users || users.length === 0) {
    return (
      <div className="p-6">
        <p className="text-black text-xl">No users found.</p>
        <button onClick={fetchUsers} className="mt-4 px-4 py-2 bg-[#34434F] text-[#E2C269] rounded hover:bg-[#2a3640]">
          Refresh Users
        </button>
      </div>
    )
  }

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button onClick={fetchUsers} className="px-4 py-2 bg-[#34434F] text-[#E2C269] rounded hover:bg-[#2a3640]">
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-[#E2C269]">
          <thead className="bg-[#34434F] text-[#E2C269]">
            <tr>
              <th className="p-3 border border-[#E2C269]">Name</th>
              <th className="p-3 border border-[#E2C269]">Email</th>
              <th className="p-3 border border-[#E2C269]">Role</th>
              <th className="p-3 border border-[#E2C269]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-[#1b1b1b] hover:bg-[#2c2c2c]">
                <td className="p-3 border border-[#E2C269]">{user.name}</td>
                <td className="p-3 border border-[#E2C269]">{user.email}</td>
                <td className="p-3 border border-[#E2C269] capitalize">{user.role}</td>
                <td className="p-3 border border-[#E2C269] space-x-2">
                  {user.role !== "admin" ? (
                    <button
                      onClick={() => updateUser(user.id, { role: "admin" })}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => updateUser(user.id, { role: "user" })}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
                    >
                      Make User
                    </button>
                  )}
                  <button
                    onClick={() => removeUser(user.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded ml-2"
                  >
                    Delete
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
