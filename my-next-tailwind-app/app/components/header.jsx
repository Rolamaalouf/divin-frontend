'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Wines', href: '/wines' },
  { name: 'Contact', href: '/contact' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 py-3 shadow-sm sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + Burger */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={100} height={40} />
          </Link>

          {/* Burger (only on small screens) */}
          <button
            className="md:hidden ml-2 text-[#E2C269]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop nav (md and up) */}
        <nav className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[#E2C269] font-semibold hover:underline"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons (always visible) */}
        <div className="flex items-center gap-4 text-[#E2C269]">
          <User className="w-5 h-5" />
          <ShoppingCart className="w-5 h-5" />
        </div>
      </div>

      {/* Mobile nav (only visible if menuOpen on small screens) */}
      {menuOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#E2C269] font-semibold hover:underline"
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
