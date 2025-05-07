'use client';

import { useState } from 'react';
import { Pencil, Trash2, Eye } from 'lucide-react';

export const UserTable = ({ users, handleEdit, handleDelete }) => {
  const [visibleDetails, setVisibleDetails] = useState({});
  const [selectedRole, setSelectedRole] = useState('all');

  const toggleDetails = (id) => {
    setVisibleDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const roles = ['all', ...new Set(users.map((user) => user.role))];
  const filteredUsers =
    selectedRole === 'all'
      ? users
      : users.filter((user) => user.role === selectedRole);

  return (
    <div className="overflow-x-auto space-y-4">
      {/* Filter by Role */}
      <div className="flex items-center gap-3 mb-2">
        <label htmlFor="role-filter" className="text-[#001f3f] font-semibold">
          Filter by Role:
        </label>
        <select
          id="role-filter"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 text-sm"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* User Table */}
      <table className="min-w-full bg-white border border-gray-300 text-[#001f3f]">
        <thead className="bg-[#34434F] text-white">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Details</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100 text-sm md:text-base">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border capitalize">{user.role}</td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => toggleDetails(user.id)}
                  className="text-gray-600 hover:text-black"
                  aria-label="Toggle Details"
                >
                  <Eye size={18} />
                </button>
              </td>
              <td className="p-2 border">
  <div className="flex justify-center items-center gap-2">
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
  </div>
</td>

            </tr>
          ))}
          {filteredUsers.map(
            (user) =>
              visibleDetails[user.id] && (
                <tr key={`${user.id}-details`} className="bg-gray-50 text-sm md:text-base">
                  <td colSpan={5} className="p-3 border border-t-0">
                    <strong>Phone:</strong> {user?.address?.phone || 'N/A'} <br />
                    <strong>Region:</strong> {user?.address?.region || 'N/A'}
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};
