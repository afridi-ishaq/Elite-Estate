"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";
import { 
  Search, MapPin, ArrowRight, Bed, Bath, Maximize, 
  ChevronLeft, ChevronRight, CheckCircle2 
} from "lucide-react";

const FEATURED_PROPERTIES = [
  {
    id: 1,
    title: "The Grand Horizon Villa",
    location: "Sector F-6, Islamabad",
    price: "PKR 18.5 Crore",
    type: "buy",
    beds: 5,
    baths: 6,
    sqft: "1,200 Sq. Yds",
    image: "/images/realestate.jpg",
  },
  {
    id: 2,
    title: "Modern Executive Penthouse",
    location: "DHA Phase 6, Lahore",
    price: "PKR 4.2 Lakh / mo",
    type: "rent",
    beds: 3,
    baths: 4,
    sqft: "4,500 Sq. Ft",
    image: "/images/realestate.jpg",
  },
];

export default function Hero() {
  const [searchTab, setSearchTab] = useState("buy");
  const [activePropertyIndex, setActivePropertyIndex] = useState(0);

  const currentProperty = FEATURED_PROPERTIES[activePropertyIndex];

  const handleNextProperty = () => {
    setActivePropertyIndex((prev) => (prev + 1) % FEATURED_PROPERTIES.length);
  };

  const handlePrevProperty = () => {
    setActivePropertyIndex((prev) =>
      prev === 0 ? FEATURED_PROPERTIES.length - 1 : prev - 1
    );
  };

  const searchTabs = ["buy", "rent", "commercial"];

  return (
    <section className="relative min-h-[90vh] bg-slate-50 text-slate-900 pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 overflow-hidden flex items-center">
      {/* Background Soft Ambient Glowing Orbs */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-[#0F4C5C]/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-[#C89B3C]/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <Container className="relative z-10 w-full px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Interactive Search & Pitch */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-5 sm:space-y-7"
          >
            {/* Social Proof Trust Stack */}
            <div className="inline-flex items-center gap-2.5 sm:gap-3 px-3 sm:px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm max-w-full">
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <span className="inline-block h-5 w-5 sm:h-6 sm:w-6 rounded-full ring-2 ring-white bg-slate-300" />
                <span className="inline-block h-5 w-5 sm:h-6 sm:w-6 rounded-full ring-2 ring-white bg-slate-400" />
                <span className="inline-block h-5 w-5 sm:h-6 sm:w-6 rounded-full ring-2 ring-white bg-slate-500" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-700 truncate">
                Trusted by <span className="text-[#0F4C5C] font-bold">10,000+</span> homeowners
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] sm:leading-[1.12] text-slate-900">
              Find your next space <br className="hidden sm:inline" />
              with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F4C5C] via-[#16697A] to-[#C89B3C]">absolute confidence.</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
              Explore verified residential listings, commercial hubs, and luxury plots across Pakistan with transparent NOC verification.
            </p>

            {/* Smart Tabbed Search Engine */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 shadow-xl shadow-slate-200/70 max-w-2xl">
              
              {/* Search Mode Tabs */}
              <div className="flex gap-1.5 sm:gap-2 mb-2.5 border-b border-slate-100 pb-2 overflow-x-auto">
                {searchTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSearchTab(tab)}
                    className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all shrink-0 ${
                      searchTab === tab
                        ? "bg-[#0F4C5C] text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form action="/properties" method="GET" className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <input type="hidden" name="type" value={searchTab} />

                {/* Location / Keyword Input */}
                <div className="sm:col-span-5 relative flex items-center px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-[#0F4C5C] focus-within:bg-white transition">
                  <Search size={18} className="text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    name="search"
                    placeholder="Area, project, or title..."
                    className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none min-w-0"
                  />
                </div>

                {/* City Select */}
                <div className="sm:col-span-4 relative flex items-center px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-[#0F4C5C] focus-within:bg-white transition">
                  <MapPin size={18} className="text-slate-400 mr-1.5 shrink-0" />
                  <select
                    name="city"
                    className="w-full bg-transparent text-sm text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="">All Cities</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Peshawar">Peshawar</option>
                  </select>
                </div>

                {/* Search Action */}
                <button
                  type="submit"
                  className="sm:col-span-3 bg-[#0F4C5C] hover:bg-[#0B3A46] active:scale-[0.98] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-[#0F4C5C]/20"
                >
                  <span>Search</span>
                  <ArrowRight size={16} />
                </button>
              </form>

              {/* Trending Quick Tags */}
              <div className="flex items-center gap-2 mt-2.5 pt-2 text-xs text-slate-500 overflow-x-auto no-scrollbar">
                <span className="font-semibold text-slate-400 shrink-0">Popular:</span>
                {["DHA Phase 6", "F-7 Islamabad", "Bahria Town", "Gulberg"].map((tag) => (
                  <Link
                    key={tag}
                    href={`/properties?search=${encodeURIComponent(tag)}`}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 transition shrink-0 text-[11px] sm:text-xs"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Guarantees Line */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                NOC &amp; Registry Verified
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                Zero Commission Hidden Fees
              </span>
            </div>
          </motion.div>

          {/* Right Column: Interactive Featured Property Showcase Widget */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 relative mt-4 lg:mt-0"
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 bg-white shadow-2xl shadow-slate-300/60">
              
              {/* Animated Image Container */}
              <div className="relative h-[340px] sm:h-[420px] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProperty.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentProperty.image}
                      alt={currentProperty.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Top Badge Overlay */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center">
                  <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[#C89B3C] text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-[#C89B3C]/30">
                    Featured Choice
                  </span>

                  {/* Manual Carousel Controls */}
                  <div className="flex items-center gap-1 bg-slate-900/60 backdrop-blur-md p-1 rounded-full border border-white/20">
                    <button
                      type="button"
                      onClick={handlePrevProperty}
                      className="p-1 text-white hover:text-[#C89B3C] transition"
                      aria-label="Previous property"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextProperty}
                      className="p-1 text-white hover:text-[#C89B3C] transition"
                      aria-label="Next property"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Property Brief (Floating Glass Box inside image bottom) */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md text-slate-900 shadow-xl space-y-2.5">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug truncate">
                        {currentProperty.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin size={12} className="text-[#0F4C5C] shrink-0" /> {currentProperty.location}
                      </p>
                    </div>
                    <p className="text-sm sm:text-base font-extrabold text-[#0F4C5C] shrink-0">
                      {currentProperty.price}
                    </p>
                  </div>

                  {/* Property Quick Specs Bar */}
                  <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-100 text-slate-600 text-[11px] sm:text-xs">
                    <div className="flex items-center gap-1 font-medium">
                      <Bed size={13} className="text-slate-400 shrink-0" />
                      <span className="truncate">{currentProperty.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-1 font-medium">
                      <Bath size={13} className="text-slate-400 shrink-0" />
                      <span className="truncate">{currentProperty.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1 font-medium">
                      <Maximize size={13} className="text-slate-400 shrink-0" />
                      <span className="truncate">{currentProperty.sqft}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}