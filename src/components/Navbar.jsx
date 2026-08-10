"use client";

import Link from "next/link";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-[#0F4C5C]"
          >
            Elite Estates
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-[#1A1A1A] hover:text-[#0F4C5C] transition-colors"
            >
              Home
            </Link>

            <Link
              href="/properties"
              className="text-[#1A1A1A] hover:text-[#0F4C5C] transition-colors"
            >
              Properties
            </Link>

            <Link
              href="/agents"
              className="text-[#1A1A1A] hover:text-[#0F4C5C] transition-colors"
            >
              Agents
            </Link>

            <Link
              href="/about"
              className="text-[#1A1A1A] hover:text-[#0F4C5C] transition-colors"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-[#1A1A1A] hover:text-[#0F4C5C] transition-colors"
            >
              Contact
            </Link>
          </nav>

          <button
            className="
              hidden md:block
              bg-[#0F4C5C]
              text-white
              px-5
              py-2.5
              rounded-lg
              hover:opacity-90
              transition
            "
          >
            Book Consultation
          </button>

          <button className="md:hidden text-3xl text-[#1A1A1A]">
            <HiOutlineMenuAlt3 />
          </button>
        </div>
      </div>
    </header> 
  );
}