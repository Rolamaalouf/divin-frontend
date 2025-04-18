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
  return res.data; 
};
export const getProductById = (id) => API.get(`/api/products/${id}`);
export const createProduct = (data) => API.post("/api/products", data);
export const updateProduct = (id, data) => API.put(`/api/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/api/products/${id}`);


export const getAllCategories = async () => {
  const res = await API.get("/api/categories");
  console.log('[API] Categories response:', res.data);
  return res.data;
};
export const getCategoryById = (id) => API.get(`/api/categories/${id}`);
export const createCategory = (data) => API.post("/api/categories", data);
export const updateCategory = (id, data) => API.put(`/api/categories/${id}`, data);
export const deleteCategory = (id) => API.delete(`/api/categories/${id}`);

// Orders
export const getOrders = () => API.get("/api/orders").then((res) => res.data);
export const getOrderById = (id) => API.get(`/api/orders/${id}`).then((res) => res.data);
export const createOrder = (data) => API.post("/api/orders", data).then((res) => res.data);
export const createGuestOrder = (data) => API.post("/api/orders/guest", data).then((res) => res.data);
export const updateOrder = (id, data) => API.put(`/api/orders/${id}`, data).then((res) => res.data);
export const deleteOrder = (id) => API.delete(`/api/orders/${id}`).then((res) => res.data);

// Order Items
export const getOrderItems = () => API.get("/api/order-items").then((res) => res.data);
export const getOrderItemById = (id) => API.get(`/api/order-items/${id}`).then((res) => res.data);
export const createOrderItem = (data) => API.post("/api/order-items", data).then((res) => res.data);
export const updateOrderItem = (id, data) => API.put(`/api/order-items/${id}`, data).then((res) => res.data);
export const deleteOrderItem = (id) => API.delete(`/api/order-items/${id}`).then((res) => res.data);
export const createGuestOrderItem = (data) => API.post("/api/order-items/guest", data).then((res) => res.data);
export const getMyOrderItems = () => API.get("/api/order-items/my-orders").then((res) => res.data);

export default API;

