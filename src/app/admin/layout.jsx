"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import MobileAdminNav from "@/components/admin/MobileAdminNav";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export default function AdminLayout({ children }) {
  const isDesktop = useIsDesktop();

  // Wait one tick so we know which layout to draw
  if (isDesktop === null) {
    return <div className="fixed inset-0 bg-[#F8F7F4]" />;
  }

  // Mobile and small tablets: full-width content + drawer menu
  if (!isDesktop) {
    return (
      <div className="fixed inset-0 flex flex-col bg-[#F8F7F4]">
        <main className="h-full w-full overflow-y-auto overflow-x-hidden pb-20">
          {children}
        </main>
        <MobileAdminNav />
      </div>
    );
  }

  // Desktop: your original resizable sidebar layout
  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden flex flex-col bg-[#F8F7F4]">
      <div className="flex-1 relative w-full h-full overflow-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full w-full flex-1"
        >
          <AdminSidebar />

          <ResizablePanel defaultSize={1080} minSize={50}>
            <main className="h-full w-full overflow-y-auto overflow-x-hidden">
              {children}
            </main>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}