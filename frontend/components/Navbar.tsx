"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200">

      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center group">

  <span className="text-xl font-bold text-gray-900">
    DocTools
  </span>

  <span className="text-xl font-bold text-blue-600 ml-1 group-hover:text-blue-700 transition">
    Hub
  </span>

</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600 font-medium">

          <Link href="/" className="hover:text-black transition">
            Home
          </Link>

          <Link href="#tools" className="hover:text-black transition">
            Tools
          </Link>

          <Link href="/qr-generator" className="hover:text-black transition">
            QR Generator
          </Link>

          <Link href="/pdf-compressor" className="hover:text-black transition">
            Compress PDF
          </Link>

        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <Link
            href="#tools"
            className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-black transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm text-gray-600 items-center text-center w-full">

  <Link href="/" onClick={() => setOpen(false)}>
    Home
  </Link>

  <Link href="#tools" onClick={() => setOpen(false)}>
    Tools
  </Link>

  <Link href="/qr-generator" onClick={() => setOpen(false)}>
    QR Generator
  </Link>

  <Link href="/pdf-compressor" onClick={() => setOpen(false)}>
    Compress PDF
  </Link>

  <Link
    href="#tools"
    onClick={() => setOpen(false)}
    className="mt-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-center w-full max-w-[200px]"
  >
    Get Started
  </Link>

</div>
      )}
    </nav>
  );
}