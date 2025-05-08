'use client';

import Link from 'next/link';
import {
  Facebook,
  Instagram,
  MessageCircleMore // Used for WhatsApp-like look
} from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // adjust path as needed

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-[#1B2930] text-[#E2C269] py-6">
      <div className="flex justify-center space-x-6 text-2xl mb-4">
        <a
          href="https://wa.me/96176933662"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <MessageCircleMore className="w-6 h-6 hover:text-white transition" />
        </a>
        <a
          href="https://www.instagram.com/divinlb/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <Instagram className="w-6 h-6 hover:text-white transition" />
        </a>
        <a
          href="https://www.facebook.com/people/Divinlb/100078197321687/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <Facebook className="w-6 h-6 hover:text-white transition" />
        </a>
      </div>

      <div className="text-center text-sm space-y-2">
        <div>&copy; {new Date().getFullYear()} Rola Maalouf</div>
        {!user && (
          <Link href="/login" className="underline hover:text-white transition block">
            Sign In
          </Link>
        )}
      </div>
    </footer>
  );
}
