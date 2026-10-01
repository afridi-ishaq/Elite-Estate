"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";
import {
  Search,
  MapPin,
  ArrowRight,
  Bed,
  Bath,
  Maximize,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

export default function Hero({ featuredProperties = [] }) {
  const [searchTab, setSearchTab] = useState("buy");
  const [activePropertyIndex, setActivePropertyIndex] = useState(0);

  const currentProperty =
    featuredProperties[activePropertyIndex] || null;

  const handleNextProperty = () => {
    if (!featuredProperties.length) return;

    setActivePropertyIndex(
      (prev) => (prev + 1) % featuredProperties.length
    );
  };

  const handlePrevProperty = () => {
    if (!featuredProperties.length) return;

    setActivePropertyIndex((prev) =>
      prev === 0 ? featuredProperties.length - 1 : prev - 1
    );
  };

  const searchTabs = ["buy", "rent", "commercial"];

  return (
    <section className="relative min-h-[90vh] bg-slate-50 text-slate-900 pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 overflow-hidden flex items-center">

      {/* Background */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-[#0F4C5C]/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="absolute bottom-10 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-[#C89B3C]/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <Container className="relative z-10 w-full px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-5 sm:space-y-7"
          >

            {/* Trust */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
              <div className="flex -space-x-2">
                <span className="h-6 w-6 rounded-full ring-2 ring-white bg-slate-300" />
                <span className="h-6 w-6 rounded-full ring-2 ring-white bg-slate-400" />
                <span className="h-6 w-6 rounded-full ring-2 ring-white bg-slate-500" />
              </div>

              <span className="text-xs font-semibold text-slate-700">
                Trusted by{" "}
                <span className="text-[#0F4C5C] font-bold">
                  10,000+
                </span>{" "}
                homeowners
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-900">
              Find your next space{" "}
              <br className="hidden sm:inline" />
              with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F4C5C] via-[#16697A] to-[#C89B3C]">
                absolute confidence.
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
              Explore verified residential listings, commercial hubs,
              and luxury plots across Pakistan with transparent NOC
              verification.
            </p>

            {/* Search */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xl max-w-2xl">

              <div className="flex gap-2 mb-3 border-b border-slate-100 pb-2 overflow-x-auto">
                {searchTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSearchTab(tab)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                      searchTab === tab
                        ? "bg-[#0F4C5C] text-white"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <form
                action="/properties"
                method="GET"
                className="grid grid-cols-1 sm:grid-cols-12 gap-2"
              >
                <input
                  type="hidden"
                  name="type"
                  value={searchTab}
                />

                <div className="sm:col-span-5 flex items-center px-3 py-2.5 bg-slate-50 rounded-xl border">
                  <Search size={18} className="text-slate-400 mr-2" />

                  <input
                    type="text"
                    name="search"
                    placeholder="Area, project, or title..."
                    className="w-full bg-transparent text-sm focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-4 flex items-center px-3 py-2.5 bg-slate-50 rounded-xl border">
                  <MapPin size={18} className="text-slate-400 mr-1.5" />

                  <select
                    name="city"
                    className="w-full bg-transparent text-sm focus:outline-none"
                  >
                    <option value="">All Cities</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Peshawar">Peshawar</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="sm:col-span-3 bg-[#0F4C5C] hover:bg-[#0B3A46] text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2"
                >
                  Search
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>

            {/* Guarantees */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-500" />
                NOC & Registry Verified
              </span>

              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-500" />
                Zero Commission Hidden Fees
              </span>
            </div>
          </motion.div>

          {/* RIGHT — DYNAMIC FEATURED PROPERTY */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative mt-4 lg:mt-0"
          >
            {currentProperty ? (
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-2xl">

                <div className="relative h-[340px] sm:h-[420px] w-full">

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
                        src={currentProperty.images?.[0]}
                        alt={currentProperty.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Badge + Controls */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/80 text-[#C89B3C] text-xs font-bold uppercase">
                      Featured Choice
                    </span>

                    {featuredProperties.length > 1 && (
                      <div className="flex gap-1 bg-slate-900/60 p-1 rounded-full">
                        <button
                          type="button"
                          onClick={handlePrevProperty}
                          className="p-1 text-white hover:text-[#C89B3C]"
                        >
                          <ChevronLeft size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={handleNextProperty}
                          className="p-1 text-white hover:text-[#C89B3C]"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Property Information */}
                  <div className="absolute bottom-3 left-3 right-3 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl">

                    <div className="flex justify-between items-start gap-2">

                      <div className="min-w-0">
                        <h3 className="font-bold text-sm sm:text-base truncate">
                          {currentProperty.title}
                        </h3>

                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <MapPin size={12} />
                          {currentProperty.city}
                        </p>
                      </div>

                      <p className="text-sm sm:text-base font-extrabold text-[#0F4C5C]">
                        PKR {currentProperty.price.toLocaleString()}
                      </p>

                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-slate-100 text-xs text-slate-600">

                      <div className="flex items-center gap-1">
                        <Bed size={13} />
                        {currentProperty.bedrooms} Beds
                      </div>

                      <div className="flex items-center gap-1">
                        <Bath size={13} />
                        {currentProperty.bathrooms} Baths
                      </div>

                      <div className="truncate">
                        {currentProperty.propertyType || "Property"}
                      </div>

                    </div>

                    <Link
                      href={`/properties/${currentProperty.id}`}
                      className="mt-3 block text-center bg-[#0F4C5C] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#0B3A46] transition"
                    >
                      View Property
                    </Link>

                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[420px] rounded-3xl bg-slate-100 flex items-center justify-center">
                <p className="text-slate-500">
                  No featured properties available.
                </p>
              </div>
            )}
          </motion.div>

        </div>
      </Container>
    </section>
  );
}