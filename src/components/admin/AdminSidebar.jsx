"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi";
import { ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <ResizablePanel
        defaultSize={200}
        minSize={80}
        maxSize={200}
        collapsible={true}
        collapsedSize={80}
        onCollapse={() => setIsCollapsed(true)}
        onExpand={() => setIsCollapsed(false)}
        className="bg-[#0F4C5C] text-white p-4 min-h-screen transition-all duration-300"
      >
        <aside className="h-full flex flex-col justify-between">
          <div>
            <h2
              className={`font-bold -ml-1.5 mb-8 mt-16 transition-all duration-200 ${
                isCollapsed ? "text-center text-sm" : "text-xl px-2"
              }`}
            >
              {isCollapsed ? "EE" : "Elite Estates"}
            </h2>

            <nav className="space-y-3">
              <Link
                href="/admin"
                title="Dashboard"
                className={`flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <HiOutlineHome size={22} className="shrink-0" />
                {!isCollapsed && <span className="truncate">Dashboard</span>}
              </Link>

              <Link
                href="/admin/properties"
                title="Properties"
                className={`flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <HiOutlineOfficeBuilding size={22} className="shrink-0" />
                {!isCollapsed && <span className="truncate">Properties</span>}
              </Link>

              <Link
                href="/admin/leads"
                title="Leads"
                className={`flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <HiOutlineUserGroup size={22} className="shrink-0" />
                {!isCollapsed && <span className="truncate">Leads</span>}
              </Link>

              <Link
                href="/admin/agents"
                title="Agents"
                className={`flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <HiOutlineUsers size={22} className="shrink-0" />
                {!isCollapsed && <span className="truncate">Agents</span>}
              </Link>
            </nav>
          </div>
        </aside>
      </ResizablePanel>

      <ResizableHandle withHandle />
    </>
  );
}