'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-[#E2C269] bg-[#34434F] bg-[url('/flow.jpg')] bg-cover bg-center">
      <ToastContainer position="top-left" autoClose={4000} theme="dark" />

      <div className="absolute top-6 left-6">
        <Link href="/" className="text-[#FFFFFF] underline hover:text-yellow-300 text-sm">
          ← Home
        </Link>
      </div>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-[#1E2A33]/50 p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-[#34434F] border border-[#E2C269] text-white placeholder:text-white/70"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-3 pr-10 rounded bg-[#34434F] border border-[#E2C269] text-white placeholder:text-white/70"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {password && (
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white/80 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#E2C269] text-[#34434F] font-semibold rounded hover:bg-[#f0da85]"
        >
          Login
        </button>

        <p className="text-center text-sm text-white">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-[#E2C269] underline hover:text-yellow-300">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
