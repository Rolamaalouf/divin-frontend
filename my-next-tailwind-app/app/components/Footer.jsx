'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useAuth } from '../context/AuthContext'

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const { user } = useAuth(); 

  const handleSubscribe = async (e) => {
    e.preventDefault();

    const templateParams = { email };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        'template_aibocz8',
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );

      setStatus('Subscribed successfully!');
      setEmail('');
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('Subscription failed. Please try again.');
    }
  };

  return (
    <footer className="bg-[#031B28] text-white" role="contentinfo">
      <div className="container mx-auto px-4 py-2">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company Info */}
          <div className="space-y-4 py-2">
            <Image
              src="/logo.png"
              alt="Divinlb Logo"
              width={80}
              height={35}
              className="object-contain"
              priority
            />
          
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@divinlb.com" className="hover:text-white transition-colors">
                  info@divinlb.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <a href="tel:+96176933662" className="hover:text-[#E2C269] transition-colors">
                  +961 76 933 662
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Lebanon</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 py-4">
            <h4 className="text-lg font-semibold text-[#E2C269]">Quick Links</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-300 hover:text-[#E2C269] text-sm">About Us</Link></li>
                <li><Link href="/wines" className="text-gray-300 hover:text-[#E2C269] text-sm">Wines</Link></li>
                <li><Link href="/#selections" className="text-gray-300 hover:text-[#E2C269] text-sm">Categories</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-[#E2C269] text-sm">Contact</Link></li>
                 {!user && (
                  <li>
                    <Link
                      href="/login"
                      className="text-gray-300 hover:text-[#E2C269] text-sm underline"
                    >
                      Sign In
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>

          {/* Social Media */}
          <div className="space-y-4 py-4">
            <h4 className="text-lg font-semibold text-[#E2C269]">Stay Connected</h4>
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-gray-300">Follow Us</h5>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/96176933662"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-full hover:bg-[#E2C269] hover:text-slate-900 transition-colors"
                  aria-label="Contact us on WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/divinlb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-full hover:bg-[#E2C269] hover:text-slate-900 transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com/divinlb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-full hover:bg-[#E2C269] hover:text-slate-900 transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Subscribe Form */}
          <div className="space-y-4 py-4">
            <h4 className="text-lg font-semibold text-[#E2C269]">Subscribe</h4>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-2 rounded bg-slate-800 text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-[#E2C269]/80 text-slate-900 py-2 px-4 rounded hover:bg-white transition-colors"
              >
                Subscribe
              </button>
              {status && (
                <p
                  className={`text-sm ${
                    status.includes('success') ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Divinlb",
            logo: "/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+96176933662",
              contactType: "customer service",
              email: "info@divinlb.com",
            },
            sameAs: [
              "https://instagram.com/divinlb",
              "https://facebook.com/divinlb"
            ],
          }),
        }}
      />
      
        <p className="text-xs text-center text-gray-200 pb-6">© {currentYear} Rola Maalouf. All rights reserved.</p>
    </footer>
  );
}
