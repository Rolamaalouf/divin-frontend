'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Menu,
  X,
  Home,
  Users,
  ShoppingCart,
  ClipboardList,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useAuth } from '../context/AuthContext';

const iconClass = "text-[#E2C269] w-5 h-5"; // Gold color and uniform size

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const handleLinkClick = () => {
    if (window.innerWidth < 768) setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (loading) return null;
  if (!user || user.role !== "admin") return null;

  return (
    <div className="flex">
      <div className={`bg-[#34434F] text-white fixed h-screen w-64 z-10 p-6 transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}>
        <button className="absolute top-4 right-4 md:hidden text-white text-2xl" onClick={() => setIsOpen(false)}>
          <X />
        </button>

        <div className="flex flex-col items-center mt-4 md:mt-0">
        <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            priority
          />
          <h2 className="text-xl font-bold mt-2">Admin</h2>
        </div>

        <div className="flex flex-col mt-10 gap-6 text-lg">
          <Link href="/" onClick={handleLinkClick} className="flex items-center gap-3 hover:text-gray-300 transition">
            <Home className={iconClass} /> Home
          </Link>
          <Link href="/admin" onClick={handleLinkClick} className="flex items-center gap-3 hover:text-gray-300 transition">
            <LayoutDashboard className={iconClass} /> Dashboard
          </Link>
          <Link href="/admin/users" onClick={handleLinkClick} className="flex items-center gap-3 hover:text-gray-300 transition">
            <Users className={iconClass} /> Users
          </Link>
          <Link href="/admin/products" onClick={handleLinkClick} className="flex items-center gap-3 hover:text-gray-300 transition">
            <ShoppingCart className={iconClass} /> Products
          </Link>
          <Link href="/admin/orders" onClick={handleLinkClick} className="flex items-center gap-3 hover:text-gray-300 transition">
            <ClipboardList className={iconClass} /> Orders
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 hover:text-gray-300 transition text-left">
            <LogOut className={iconClass} /> Logout
          </button>
        </div>
      </div>

      <button className="absolute top-5 left-5 md:hidden bg-[#A68F7B] text-white p-2 rounded focus:outline-none z-20" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      <div className={`flex-1 p-4 transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"} md:ml-64`}>
        {/* Page content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
