'use client';

import { AuthProvider } from '../context/AuthContext';
import { useSyncCartOnAuthChange } from '../hooks/useCartHooks'; // adjust path if needed

function CartSyncWrapper({ children }) {
  useSyncCartOnAuthChange(); // ✅ Sync cart on auth change
  return <>{children}</>;
}

export default function AuthClientWrapper({ children }) {
  return (
    <AuthProvider>
      <CartSyncWrapper>{children}</CartSyncWrapper>
    </AuthProvider>
  );
}
