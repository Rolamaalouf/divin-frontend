'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Invalid email or password');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-[#E2C269] bg-[#34434F] bg-[url('/flow.jpg')] bg-cover bg-center">
      <ToastContainer
        position="top-left"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
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
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-[#34434F] border border-[#E2C269] text-white placeholder:text-white/70"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
