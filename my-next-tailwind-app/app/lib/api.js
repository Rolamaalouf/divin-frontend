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

export default API;
