"use client";

import Link from "next/link";
import Container from "./Container";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiArrowUp,
  FiSend,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Agents", href: "/agents" },
  { label: "Featured Properties", href: "/properties" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact Us", href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "Buy Property", href: "/properties?action=buy" },
  { label: "Sell Property", href: "/sell" },
  { label: "Rentals & Leasing", href: "/properties?action=rent" },
  { label: "Property Management", href: "/services/management" },
  { label: "Real Estate Advisory", href: "/services/advisory" },
];

const SOCIAL_LINKS = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0F1416] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <Container>
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand Info & Socials */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5 group">
                <span className="bg-[#0F4C5C] text-white w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform">
                  E
                </span>
                <span className="text-2xl font-bold tracking-tight text-white group-hover:text-[#C89B3C] transition-colors">
                  Elite Estates
                </span>
              </Link>

              <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-sm">
                Redefining luxury real estate. Delivering exceptional properties, 
                unmatched market insights, and tailored investment solutions.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0F4C5C] hover:border-[#0F4C5C] transition-all"
                  >
                    <Icon className="text-sm" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-[#C89B3C] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-[#C89B3C] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-[#C89B3C] text-lg mt-0.5 shrink-0" />
                <span>Sector F-6/1, Blue Area, Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-[#C89B3C] text-lg shrink-0" />
                <a
                  href="mailto:info@eliteestates.com"
                  className="hover:text-white transition-colors"
                >
                  info@eliteestates.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-[#C89B3C] text-lg shrink-0" />
                <a
                  href="tel:+923001234567"
                  className="hover:text-white transition-colors"
                >
                  +92 300 1234567
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Newsletter Banner */}
        <div className="py-8 my-8 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <h5 className="text-lg font-semibold text-white">
              Subscribe to Market Insights
            </h5>
            <p className="text-xs text-slate-400 mt-1">
              Get exclusive luxury property listings and market updates delivered directly to your inbox.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full md:w-auto flex items-center gap-2 max-w-md"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0F4C5C] transition-colors"
              required
            />
            <button
              type="submit"
              className="bg-[#0F4C5C] hover:bg-[#0c3d4a] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all shrink-0 flex items-center gap-2"
            >
              <span>Subscribe</span>
              <FiSend className="text-xs" />
            </button>
          </form>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Elite Estates. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="hover:text-slate-300 transition-colors">
              Sitemap
            </Link>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <FiArrowUp />
          </button>
        </div>
      </Container>
    </footer>
  );
}