"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt3, HiX, HiPhone } from "react-icons/hi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/agents", label: "Agents" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const PHONE_NUMBER = "+92 3040944242";
const PHONE_HREF = "tel:+923040944242";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-1"
          : "bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-2"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 md:h-20 flex items-center justify-between gap-4">

          {/* Brand Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-[#0F4C5C] flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <span className="w-10 h-10 rounded-xl bg-[#0F4C5C] text-white flex items-center justify-center font-serif text-xl shadow-md">
              E
            </span>
            <span className="font-sans">
              Elite<span className="text-[#C89B3C]">Estates</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-4 py-2 text-base font-medium rounded-full transition-all duration-200 ${isActive
                      ? "text-[#0F4C5C] bg-[#0F4C5C]/10 font-semibold"
                      : "text-gray-600 hover:text-[#0F4C5C] hover:bg-gray-100/60"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 font-semibold text-[#0F4C5C] hover:text-[#0c3d4a] transition-colors"
            >
              <HiPhone className="w-4 h-4 text-[#C89B3C]" />
              <span>{PHONE_NUMBER}</span>
            </a>

            <Link
              href="/sell"
              className="relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-[#0F4C5C] px-5 py-2.5 text-sm font-medium text-[#0F4C5C] shadow-sm transition-all duration-300 group hover:text-white hover:shadow-md active:scale-95"
            >
              <span className="absolute inset-0 w-full h-full bg-[#0F4C5C] transition-transform duration-300 ease-out -translate-x-full group-hover:translate-x-0" />
              <span className="relative z-10">Sell Property</span>
            </Link>

            <Link
              href="/contact"
              className="bg-[#0F4C5C] hover:bg-[#0c3d4a] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open navigation menu"}
            className="md:hidden p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20 transition-colors"
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiOutlineMenuAlt3 className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive
                      ? "text-[#0F4C5C] bg-[#0F4C5C]/10 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <hr className="border-gray-100 my-1" />

          {/* Mobile Action Buttons */}
          <div className="flex flex-col gap-3">
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-2 py-2.5 text-[#0F4C5C] font-semibold"
            >
              <HiPhone className="w-4 h-4 text-[#C89B3C]" />
              <span>{PHONE_NUMBER}</span>
            </a>

            <Link
              href="/sell"
              className="w-full text-center border border-[#0F4C5C] text-[#0F4C5C] font-medium py-3 rounded-xl hover:bg-[#0F4C5C] hover:text-white transition-colors"
            >
              Sell Property
            </Link>

            <Link
              href="/contact"
              className="w-full text-center bg-[#0F4C5C] text-white font-medium py-3 rounded-xl shadow-sm hover:bg-[#0c3d4a] transition-colors"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}