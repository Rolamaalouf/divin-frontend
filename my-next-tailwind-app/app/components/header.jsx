"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import IconPopup from "./IconPopup";
import CartItemList from "./CartItemList";
import WishlistItemList from "./WishlistItemList";
import { useCartItems, useRemoveCartItem } from "../hooks/useCartHooks";
import { useWishlist, useRemoveFromWishlist } from "../hooks/useWishlistHooks";
import { deleteCart } from "../lib/api";
import { toast } from "react-toastify";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Wines", href: "/wines" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartPopupOpen, setCartPopupOpen] = useState(false);
  const dropdownRef = useRef();
  const popupRef = useRef();  
  const { user, logout } = useAuth();

  const {
    data: cartItems = [],
    isLoading: cartLoading,
    error: cartError,
    refetch: refetchCart,
  } = useCartItems();

  const {
    data: wishlistItems = [],
    isLoading: wishlistLoading,
    error: wishlistError,
    refetch: refetchWishlist,
  } = useWishlist();

  const removeCartItemMutation = useRemoveCartItem();
  const removeWishlistItemMutation = useRemoveFromWishlist();

  const handleRemoveCartItem = (id) => {
    removeCartItemMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Item removed from cart");
        refetchCart();
      },
      onError: () => toast.error("Failed to remove item"),
    });
  };

  const handleClearCart = async () => {
    if (!cartItems.length) return;
    try {
      const cartId = cartItems[0].cart_id;
      await deleteCart(cartId);
      toast.success("Cart cleared!");
      refetchCart();
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };

  const handleRemoveWishlistItem = (id) => {
    removeWishlistItemMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Item removed from wishlist");
        refetchWishlist();
      },
      onError: () => toast.error("Failed to remove item"),
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setCartPopupOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlist = wishlistItems.length;

  // Open the popup briefly when cartItems change
  useEffect(() => {
    if (cartItems.length > 0) {
      setCartPopupOpen(true);
      const timer = setTimeout(() => setCartPopupOpen(false), 60000); 
      return () => clearTimeout(timer);
    }
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length === 0) {
      const timer = setTimeout(() => {
        setCartPopupOpen(false);
      }, 1500); // 1.5 seconds delay
      return () => clearTimeout(timer);
    }
  }, [cartItems]);

  return (
    <header
      className={`w-full px-4 py-3 shadow-sm sticky top-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-[#1B2930]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={100} height={40} />
          </Link>
          <button
            className="md:hidden ml-2 text-[#E2C269]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[#E2C269] font-semibold text-[24px] md:text-[32px] hover:underline"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 text-[#E2C269] relative">
          {/* User */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="User menu"
              >
                <User className="w-6 h-6  md:w-8 md:h-8 hover:text-white transition-colors" />
              </button>
              {dropdownOpen && (
                <div className="absolute  bg-white right-0 mt-2 w-48 rounded-md  z-50 text-gray-800">
                  <ul className="py-2 text-sm">
                    {user.role === "admin" && (
                      <li>
                        <Link
                          href="/admin"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Order History
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link href="/register" aria-label="Register">
              <User className="w-6 h-6 md:w-8 md:h-8 hover:text-white transition-colors" />
            </Link>
          )}

          <IconPopup
            icon={ShoppingCart}
            count={totalCartQty}
            open={cartPopupOpen}
            setOpen={setCartPopupOpen}
            ref={popupRef} 
          >
            {cartLoading && <p>Loading cart...</p>}
            {cartError && <p>Error loading cart</p>}
            {!cartLoading && !cartError && (
              <div className="fixed top-20 right-0 w-96 bg-white shadow-lg rounded-lg p-6 z-50 max-h-[600px] overflow-y-auto">
                {cartItems.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  <CartItemList
                    items={cartItems}
                    onDelete={handleRemoveCartItem}
                    onClearCart={handleClearCart}
                  />
                )}
              </div>
            )}
          </IconPopup>

          {/* Wishlist */}
          <IconPopup icon={Heart} count={totalWishlist}>
            {wishlistLoading && <p>Loading wishlist...</p>}
            {wishlistError && <p>Error loading wishlist</p>}
            {!wishlistLoading && !wishlistError && (
              <WishlistItemList
                items={wishlistItems}
                onDelete={handleRemoveWishlistItem}
              />
            )}
          </IconPopup>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[#E2C269] font-semibold text-lg hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
