'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getAllProducts, createProduct, updateProduct as updateProductAPI } from '../lib/api';
import { toast } from 'react-toastify';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    console.log('[ProductContext] Fetching products...'); // 👈 Add this
    setLoading(true);
    try {
      const res = await getAllProducts();
      console.log('[ProductContext] API response:', res); // 👈 Add this
      setProducts(res?.products ?? []);
    } catch (err) {
      console.error('[ProductContext] Failed to fetch:', err);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const addProduct = async (productData) => {
    try {
      await createProduct(productData);
      toast.success('Product created');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to create product');
      console.error('Product creation error:', err);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      await updateProductAPI(id, productData);
      toast.success('Product updated');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to update product');
      console.error('Product update error:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, fetchProducts, addProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// ✅ Renamed for clarity
export const useProductContext = () => useContext(ProductContext);
