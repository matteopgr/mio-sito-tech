'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold hover:text-gray-100 transition">
          Tech Converter
        </Link>
      </div>
    </nav>
  );
}
