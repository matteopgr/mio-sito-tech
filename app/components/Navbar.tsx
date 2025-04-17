'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo / Brand Name */}
        <Link href="/" className="text-2xl font-bold hover:text-gray-100 transition flex items-center space-x-2">
          <span>Tech Converter</span>
        </Link>
        
        {/* Hamburger menu for mobile view */}
        <button
          className="lg:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Navigation"
        >
          ☰
        </button>

        {/* Navbar Links */}
        <div className={`lg:flex space-x-6 ${menuOpen ? 'block' : 'hidden'} lg:block`}>
          <Link href="/" className="hover:text-gray-100 transition">Home</Link>
          <Link href="/features" className="hover:text-gray-100 transition">Features</Link>
          <Link href="/about" className="hover:text-gray-100 transition">About</Link>
          <Link href="/contact" className="hover:text-gray-100 transition">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
