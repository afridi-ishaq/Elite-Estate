"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        <AdminSidebar />
        <ResizablePanel defaultSize={80}>
          <div className="h-full overflow-y-auto bg-[#F8F7F4] p-6">
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}