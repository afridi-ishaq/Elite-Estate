"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/agents", label: "Agents" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Automatically close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-gray-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between gap-4">
          
          <Link href="/" className="text-2xl font-bold tracking-tight text-[#0F4C5C] hover:text-2xl flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-[#0F4C5C] text-white flex items-center justify-center font-serif text-lg">
              E
            </span>
            <span>
              Elite<span className="text-[#C89B3C]">Estates</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-lg font-medium rounded-full transition-colors ${
                    isActive
                      ? "text-[#0F4C5C] bg-[#0F4C5C]/10 font-semibold"
                      : "text-gray-600 hover:text-[#0F4C5C] hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              style={{ color: "white" }}
              className="bg-[#0F4C5C] hover:bg-[#0c3d4a] text-white text-lg font-medium px-5 py-2.5 rounded-xl transition"
            >
              Book Consultation
            </Link>
          </div>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100"
          >
            {isOpen ? <HiX className="w-7 h-7" /> : <HiOutlineMenuAlt3 className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-6 flex flex-col gap-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl text-base font-medium ${
                  isActive
                    ? "text-[#0F4C5C] bg-[#0F4C5C]/10 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-2">
            <Link
              href="/contact"
              className="w-full block text-center bg-[#0F4C5C] text-white font-medium py-3 rounded-xl"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}