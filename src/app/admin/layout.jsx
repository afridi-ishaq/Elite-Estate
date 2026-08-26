"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";

export default function AdminLayout({ children }) {
  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden flex flex-col bg-[#F8F7F4]">
      {/* 
        If you have a global Top Header/Navbar component, place it here.
        It will stay permanently fixed at the top without moving.
      */}

      {/* Main Resizable Body Container */}
      <div className="flex-1 relative w-full h-full overflow-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full w-full flex-1"
        >
          {/* Resizable Sidebar */}
          <AdminSidebar />

          {/* Main Dashboard Content Area */}
          <ResizablePanel defaultSize={1080} minSize={50}>
            <main className="h-full w-full overflow-y-auto overflow-x-hidden p-6">
              {children}
            </main>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}