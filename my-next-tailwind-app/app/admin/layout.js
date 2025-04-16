'use client';

import ProtectedAdminRoute from '../components/ProtectedAdminRoute';
import Sidebar from '../components/Sidebar';
import { UsersProvider } from '../context/UserContext';
import { ProductProvider } from '../context/ProductContext';
import { CategoryProvider } from '../context/CategoryContext';

export default function AdminLayout({ children }) {
  return (
    <ProtectedAdminRoute>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen">
          <UsersProvider>
            <ProductProvider>
              <CategoryProvider>
                {children}
              </CategoryProvider>
            </ProductProvider>
          </UsersProvider>
        </main>
      </div>
    </ProtectedAdminRoute>
  );
}

