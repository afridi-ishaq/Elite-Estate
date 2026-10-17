"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Building2,
  Users,
  UserCheck,
  Settings,
  Globe,
} from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/agents", label: "Agents", icon: UserCheck },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function MobileAdminNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer after navigating
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close with the Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open admin menu"
        className="fixed bottom-4 left-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-[#0F4C5C] text-white shadow-xl active:scale-95"
      >
        <Menu size={22} aria-hidden />
      </button>

      {open && (
        <div className="fixed inset-0 z-[70]">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50"
          />

          <nav className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col bg-[#0F4C5C] p-5 text-white shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-xl font-bold">Elite Estates</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-lg p-2 hover:bg-white/10"
              >
                <X size={20} aria-hidden />
              </button>
            </div>

            <div className="space-y-2">
              {LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-xl p-3 transition ${
                    isActive(href) ? "bg-white/15" : "hover:bg-white/10"
                  }`}
                >
                  <Icon size={20} className="shrink-0" aria-hidden />
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            <Link
              href="/"
              className="mt-auto flex items-center gap-3 rounded-xl border border-white/20 p-3 text-sm hover:bg-white/10"
            >
              <Globe size={18} aria-hidden />
              View website
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}