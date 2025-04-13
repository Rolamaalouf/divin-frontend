'use client';

import React, { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
<header
  className={`w-full px-4 py-3 shadow-sm sticky top-0 z-50 transition-colors duration-300 ${
    isScrolled ? 'bg-[#33434F]' : 'bg-transparent'
  }`}
>

      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + Burger */}
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

        {/* Desktop nav */}
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
        <div className="flex items-center gap-4 text-[#E2C269]">
        <Link href="/register" aria-label="Register">
  <User className="w-6 h-6 md:w-8 md:h-8 hover:text-white transition-colors" />
</Link>

          <ShoppingCart className="w-6 h-6 md:w-8 md:h-8" />
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-3 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#E2C269] text-[20px] font-medium hover:underline"
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
