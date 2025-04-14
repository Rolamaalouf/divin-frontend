'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect when loading is false and user is not available or role is not admin
    if (!loading) {
      if (!user || user.role !== 'admin') {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!user) {
    return <div className="text-white">You must be logged in to access this page.</div>;
  }

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">Welcome, {user.email} 👋</p>
    </div>
  );
}
