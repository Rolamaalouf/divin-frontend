'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getAllCategories } from '../lib/api';
import { toast } from 'react-toastify';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    console.log('[CategoryContext] Fetching categories...');
    setLoading(true);
    try {
      const res = await getAllCategories();
      console.log('[CategoryContext] API response:', res);
      setCategories(res?.categories ?? []);
    } catch (err) {
      console.error('[CategoryContext] Failed to fetch:', err);
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);
  
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading, fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  );
  
};

export const useCategories = () => useContext(CategoryContext);
