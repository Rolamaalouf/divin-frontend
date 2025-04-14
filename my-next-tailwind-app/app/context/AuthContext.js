// context/AuthContext.js
'use client';
import { createContext, useContext, useState } from 'react';
import { loginUser, logoutUser } from '../lib/api';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Login function
const login = async (credentials) => {
  setLoading(true);
  try {
    const res = await loginUser(credentials);
    console.log('Login API response:', res); // 🔍 Add this
    const loggedUser = res.data?.user;
    setUser(loggedUser);

    if (loggedUser?.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message || error);
  } finally {
    setLoading(false);
  }
};


  // Logout function
  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
