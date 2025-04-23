'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, getCurrentUser, registerUser } from '../lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { clearGuestId } from '../utils/guestId'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await loginUser(credentials);
      const loggedUser = res.data?.user;
      setUser(loggedUser);

      if (loggedUser?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      clearGuestId(); 
      setUser(null);
      router.push('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const res = await registerUser(formData);
      toast.success('Registered successfully!');
  
      // Try logging in after registration
      const loginRes = await loginUser({ email: formData.email, password: formData.password });
      const loggedUser = loginRes.data?.user;
      setUser(loggedUser);
  
      if (loggedUser?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/'); // or router.push('/login') if you want that
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Registration or auto-login failed');
      throw error; // Let RegisterPage catch this too
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
