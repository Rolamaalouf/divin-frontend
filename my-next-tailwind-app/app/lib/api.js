// lib/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const loginUser = (data) => API.post("/api/auth/login", data);
export const registerUser = (data) => API.post("/api/auth/register", data);
export const getAllUsers = () => API.get("/api/auth");
export const logoutUser = () => API.post("/api/auth/logout"); 
export const getCurrentUser = () => API.get('/api/auth/me');
export const editUser = (id, updatedData) => API.put(`/api/auth/${id}`, updatedData);
export const deleteUser = (id) => API.delete(`/api/auth/${id}`);

export const getAllProducts = async () => {
  const res = await API.get("/api/products");
  console.log('[API] Products response:', res.data);
  return res.data; // ✅ Make sure it's { products: [...] }
};
export const getProductById = (id) => API.get(`/api/products/${id}`);
export const createProduct = (data) => API.post("/api/products", data);
export const updateProduct = (id, data) => API.put(`/api/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/api/products/${id}`);


export const getAllCategories = async () => {
  const res = await API.get("/api/categories");
  console.log('[API] Categories response:', res.data);
  return res.data; // ✅ Make sure it's { categories: [...] }
};
export const getCategoryById = (id) => API.get(`/api/categories/${id}`);
export const createCategory = (data) => API.post("/api/categories", data);
export const updateCategory = (id, data) => API.put(`/api/categories/${id}`, data);
export const deleteCategory = (id) => API.delete(`/api/categories/${id}`);


export default API;
