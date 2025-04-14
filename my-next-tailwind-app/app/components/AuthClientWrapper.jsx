'use client';
import { AuthProvider } from '../context/AuthContext';

export default function AuthClientWrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
