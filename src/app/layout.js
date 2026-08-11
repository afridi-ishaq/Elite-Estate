import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Elite Estates",
  description: "Luxury Real Estate Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F8F7F4] text-[#1A1A1A]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}