'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth(); // Get login function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Use login from AuthContext instead of directly using api.js
      await login({ email, password });
    } catch (error) {
      console.error('Login failed:', error);
      // Optionally show error to user
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-[#E2C269] bg-[#34434F] bg-[url('/flow.jpg')] bg-cover bg-center">
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
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-[#34434F] border border-[#E2C269] text-white placeholder:text-white/70"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-3 bg-[#E2C269] text-[#34434F] font-semibold rounded hover:bg-[#f0da85]"
        >
          Login
        </button>
      </form>
    </div>
  );
}
