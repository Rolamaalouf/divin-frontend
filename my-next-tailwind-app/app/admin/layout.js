// app/admin/layout.js (for App Router)
'use client';
import ProtectedAdminRoute from '../components/ProtectedAdminRoute';
import Sidebar from '../components/Sidebar'; // Or your sidebar component
import { UsersProvider } from '../context/UserContext';

export default function AdminLayout({ children }) {
  return (
    <ProtectedAdminRoute>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-[#f5f5f5] min-h-screen">
          <UsersProvider>
          {children}
          </UsersProvider>
        </main>
      </div>
    </ProtectedAdminRoute>
  );
}
