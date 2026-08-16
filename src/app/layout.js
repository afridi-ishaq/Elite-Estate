import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import AdminSidebar from "@/components/admin/AdminSidebar";
import "./globals.css";


export const metadata = {
  title: "Elite Estates",
  description: "Luxury Real Estate Platform",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="bg-[#F8F7F4] text-[#1A1A1A]">
        <Providers>
          <Navbar />
          
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}