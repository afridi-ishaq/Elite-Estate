import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}) {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 bg-[#F8F7F4] min-h-screen">
        {children}
      </div>
    </div>
  );
}