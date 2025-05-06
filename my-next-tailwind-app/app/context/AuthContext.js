'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, getCurrentUser, registerUser } from '../lib/api';
import { transferGuestCartToUser } from '../lib/api'; // ⬅️ Import the transfer function
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();

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

  const handleCartTransfer = async () => {
    const guestId = localStorage.getItem('guest_id');
    if (!guestId) return;
  
    try {
      await transferGuestCartToUser(guestId);
    } catch (err) {
      if (err.response?.status === 404) {
        console.warn('No guest cart to transfer (likely empty).');
      } else {
        console.error('Guest cart transfer failed:', err);
      }
    } finally {
      localStorage.removeItem('guest_id');
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
    }
  };
  
  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await loginUser(credentials);
      const loggedUser = res.data?.user;
      setUser(loggedUser);

      await handleCartTransfer(); // ⬅️ Transfer guest cart on login

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
      setUser(null);
      queryClient.invalidateQueries({ queryKey: ['cart-items'] }); // Clear user cart
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

      // Auto login after registration
      const loginRes = await loginUser({ email: formData.email, password: formData.password });
      const loggedUser = loginRes.data?.user;
      setUser(loggedUser);

      await handleCartTransfer(); // ⬅️ Transfer guest cart on register

      if (loggedUser?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Registration or login failed');
      throw error;
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
