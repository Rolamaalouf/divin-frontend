import { Pencil, Trash2 } from 'lucide-react';

export const UserTable = ({ users, handleEdit, handleDelete }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300 text-[#001f3f]">
      <thead className="bg-[#34434F] text-white">
        <tr>
          <th className="p-3 border">Name</th>
          <th className="p-3 border">Email</th>
          <th className="p-3 border">Role</th>
          <th className="p-3 border">Phone</th>
          <th className="p-3 border">Region</th>
          <th className="p-3 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-100 text-sm md:text-base">
            <td className="p-2 border">{user.name}</td>
            <td className="p-2 border">{user.email}</td>
            <td className="p-2 border capitalize">{user.role}</td>
            <td className="p-2 border">{user?.address?.phone || '-'}</td>
            <td className="p-2 border">{user?.address?.region || '-'}</td>
            <td className="p-2 border flex justify-center items-center gap-2">
              <button
                onClick={() => handleEdit(user)}
                className="text-blue-600 hover:text-blue-800"
                aria-label="Edit"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-600 hover:text-red-800"
                aria-label="Delete"
              >
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
