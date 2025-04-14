"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-100 px-4 py-3 shadow">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-blue-700 font-bold text-lg">TechBlog</div>
        <div className="flex space-x-4">
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <Link href="/articles" className="text-blue-600 hover:underline">
            Articoli
          </Link>
          <Link href="#" className="text-blue-600 hover:underline">
            Programmazione
          </Link>
          <Link href="#" className="text-blue-600 hover:underline">
            Sicurezza
          </Link>
          <Link href="#" className="text-blue-600 hover:underline">
            Blockchain
          </Link>
        </div>
      </div>
    </nav>
  );
}