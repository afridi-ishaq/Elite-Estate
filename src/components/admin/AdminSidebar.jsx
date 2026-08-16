"use client";

import Link from "next/link";
import {
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi";

export default function AdminSidebar() {
  return (
    <aside
      className="
        w-64
        min-h-screen
        bg-[#0F4C5C]
        text-white
        p-6
      "
    >
      <h2 className="text-2xl font-bold mb-10 mt-20">
        Elite Estates
      </h2>

      <nav className="space-y-3">
        <Link
          href="/admin"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10"
        >
          <HiOutlineHome size={22} />
          Dashboard
        </Link>

        <Link
          href="/admin/properties"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10"
        >
          <HiOutlineOfficeBuilding size={22} />
          Properties
        </Link>

        <Link
          href="/admin/leads"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10"
        >
          <HiOutlineUserGroup size={22} />
          Leads
        </Link>

        <Link
          href="/admin/agents"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10"
        >
          <HiOutlineUsers size={22} />
          Agents
        </Link>
      </nav>
    </aside>
  );
}