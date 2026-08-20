import AdminSidebar from "@/components/admin/AdminSidebar";


export default function AdminLayout({
  children,
}) {
  return (
    <div className="flex">
      <AdminSidebar className="fixed left-0 top-0 bottom-0 h-full" />

      <div className="flex-1 bg-[#F8F7F4] min-h-screen">
        {children}
      </div>
    </div>
  );
}