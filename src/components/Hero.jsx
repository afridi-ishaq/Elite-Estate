"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  Search,
  MapPin,
  ArrowUpRight,
  BedDouble,
  Bath,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Building2,
  House,
  KeyRound,
} from "lucide-react";
import Container from "./Container";

const SEARCH_TABS = [
  { value: "buy", label: "Buy", icon: House },
  { value: "rent", label: "Rent", icon: KeyRound },
  { value: "commercial", label: "Commercial", icon: Building2 },
];

const CITIES = ["Islamabad", "Lahore", "Karachi", "Peshawar"];
const ROTATE_MS = 6000;
const FALLBACK_IMAGE = "/images/realestate.jpg";

function formatPKR(value) {
  const price = Number(value);

  if (!Number.isFinite(price) || price <= 0) {
    return "Price on request";
  }

  if (price >= 1e7) {
    return `PKR ${(price / 1e7).toFixed(2).replace(/\.?0+$/, "")} Crore`;
  }

  if (price >= 1e5) {
    return `PKR ${(price / 1e5).toFixed(2).replace(/\.?0+$/, "")} Lakh`;
  }

  return `PKR ${price.toLocaleString("en-PK")}`;
}

export default function Hero({
  featuredProperties = [],
  stats = null,
}) {
  const reduceMotion = useReducedMotion();

  const [searchTab, setSearchTab] = useState("buy");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const properties = Array.isArray(featuredProperties)
    ? featuredProperties
    : [];

  const total = properties.length;
  const activeIndex = total ? index % total : 0;
  const property = total ? properties[activeIndex] : null;

  useEffect(() => {
    if (total < 2 || paused || reduceMotion) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, ROTATE_MS);

    return () => clearInterval(timer);
  }, [total, paused, reduceMotion]);

  function nextProperty() {
    if (total > 1) {
      setIndex((current) => (current + 1) % total);
    }
  }

  function previousProperty() {
    if (total > 1) {
      setIndex((current) => (current - 1 + total) % total);
    }
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#F7F6F2]">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-24 h-[500px] w-[500px] rounded-full bg-[#D9C7A7]/25 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-[350px] w-[350px] rounded-full bg-[#0F4C5C]/5 blur-3xl"
      />

      <Container className="relative px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* LEFT: Main introduction and search */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="relative z-10 lg:col-span-7"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D9C7A7] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#0F4C5C] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#C89B3C]" />
              Your next chapter starts here
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.12] tracking-tight text-[#142E33] sm:text-5xl lg:text-[4.25rem]">
              Find a place
              <br />
              <span className="font-serif italic font-medium text-[#0F4C5C]">
                worth calling home.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Discover exceptional homes, investment opportunities, and
              commercial spaces across Pakistan with guidance from
              experienced local agents.
            </p>

            {/* Search panel */}
            <div className="mt-9 max-w-2xl rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_18px_60px_rgba(15,76,92,0.10)] sm:p-5">
              <div
                className="flex gap-2 border-b border-slate-100 pb-4"
                role="group"
                aria-label="Property purpose"
              >
                {SEARCH_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const selected = searchTab === tab.value;

                  return (
                    <button
                      key={tab.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setSearchTab(tab.value)}
                      className={`inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition sm:px-5 ${
                        selected
                          ? "bg-[#0F4C5C] text-white shadow-md"
                          : "text-slate-500 hover:bg-slate-50 hover:text-[#0F4C5C]"
                      }`}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <form
                action="/properties"
                method="GET"
                role="search"
                className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-12"
              >
                <input type="hidden" name="type" value={searchTab} />

                <label className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-[#FAFAF8] px-4 py-3.5 transition focus-within:border-[#0F4C5C] focus-within:ring-2 focus-within:ring-[#0F4C5C]/10 sm:col-span-5">
                  <Search size={19} className="shrink-0 text-[#0F4C5C]" />

                  <span className="min-w-0 flex-1">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Find a property
                    </span>

                    <input
                      type="text"
                      name="search"
                      placeholder="Area or property name"
                      className="w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </span>
                </label>

                <label className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-[#FAFAF8] px-4 py-3.5 transition focus-within:border-[#0F4C5C] focus-within:ring-2 focus-within:ring-[#0F4C5C]/10 sm:col-span-4">
                  <MapPin size={19} className="shrink-0 text-[#0F4C5C]" />

                  <span className="min-w-0 flex-1">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Location
                    </span>

                    <select
                      name="city"
                      defaultValue=""
                      className="w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none"
                    >
                      <option value="">All cities</option>

                      {CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>

                <button
                  type="submit"
                  className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#C89B3C] px-4 text-sm font-bold text-white transition hover:bg-[#B18A35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] focus-visible:ring-offset-2 sm:col-span-3"
                >
                  Search
                  <ArrowUpRight size={17} />
                </button>
              </form>
            </div>

            {/* Trust indicators */}
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              {[
                "Carefully selected listings",
                "Local property expertise",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-[#0F766E]"
                  />
                  {item}
                </div>
              ))}
            </div>

            {/* Real database statistics, when provided */}
            {stats && (
              <div className="mt-8 flex flex-wrap gap-8 border-t border-slate-200 pt-6 sm:gap-12">
                {stats.properties != null && (
                  <div>
                    <p className="text-2xl font-bold text-[#0F4C5C]">
                      {stats.properties}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Listed properties
                    </p>
                  </div>
                )}

                {stats.agents != null && (
                  <div>
                    <p className="text-2xl font-bold text-[#0F4C5C]">
                      {stats.agents}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Property experts
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* RIGHT: Premium featured property */}
          <div
            className="relative lg:col-span-5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            {property ? (
              <div className="relative mx-auto max-w-xl lg:max-w-none">
                {/* Offset decorative frame */}
                <div
                  aria-hidden="true"
                  className="absolute -right-3 -top-3 h-full w-full rounded-[2rem] border border-[#C89B3C]/50 sm:-right-4 sm:-top-4"
                />

                <div
                  className="relative overflow-hidden rounded-[1.75rem] bg-[#0F4C5C] shadow-[0_28px_80px_rgba(15,76,92,0.23)]"
                  role="region"
                  aria-roledescription="carousel"
                  aria-label="Featured property"
                >
                  <div className="relative h-[430px] sm:h-[510px]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={property.id}
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reduceMotion ? undefined : { opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={property.images?.[0] || FALLBACK_IMAGE}
                          alt={property.title || "Featured property"}
                          fill
                          priority={activeIndex === 0}
                          unoptimized
                          sizes="(max-width: 1024px) 100vw, 42vw"
                          className="object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#071E24]/95 via-[#071E24]/15 to-[#071E24]/20" />

                        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] backdrop-blur-md">
                              Featured property
                            </span>

                            <span className="text-xs font-medium text-white/80">
                              {activeIndex + 1} of {total}
                            </span>
                          </div>

                          <p className="mb-2 flex items-center gap-1.5 text-sm text-white/80">
                            <MapPin size={15} />
                            {property.city || "Pakistan"}
                          </p>

                          <h2 className="max-w-md text-2xl font-semibold leading-tight sm:text-3xl">
                            {property.title}
                          </h2>

                          <p className="mt-3 text-xl font-bold text-[#E5C47D] sm:text-2xl">
                            {formatPKR(property.price)}
                          </p>

                          <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/20 pt-4 text-sm text-white/90">
                            {Number(property.bedrooms) > 0 && (
                              <span className="flex items-center gap-2">
                                <BedDouble size={17} />
                                {property.bedrooms} beds
                              </span>
                            )}

                            {Number(property.bathrooms) > 0 && (
                              <span className="flex items-center gap-2">
                                <Bath size={17} />
                                {property.bathrooms} baths
                              </span>
                            )}

                            {property.propertyType && (
                              <span className="rounded-full bg-white/15 px-3 py-1 text-xs">
                                {property.propertyType}
                              </span>
                            )}
                          </div>

                          <Link
                            href={`/properties/${property.id}`}
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-[#0F4C5C] transition hover:bg-[#E5C47D] hover:text-[#142E33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F4C5C]"
                          >
                            Explore this property
                            <ArrowUpRight size={18} />
                          </Link>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Carousel controls */}
                    {total > 1 && (
                      <div className="absolute right-4 top-4 z-10 flex gap-2">
                        <button
                          type="button"
                          onClick={previousProperty}
                          aria-label="Previous featured property"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition hover:bg-white hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <ChevronLeft size={20} />
                        </button>

                        <button
                          type="button"
                          onClick={nextProperty}
                          aria-label="Next featured property"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition hover:bg-white hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Carousel position indicators */}
                {total > 1 && (
                  <div className="mt-5 flex items-center justify-center gap-2">
                    {properties.map((item, itemIndex) => (
                      <button
                        key={item.id}
                        type="button"
                        aria-label={`Show property ${itemIndex + 1}`}
                        aria-pressed={itemIndex === activeIndex}
                        onClick={() => setIndex(itemIndex)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          itemIndex === activeIndex
                            ? "w-8 bg-[#0F4C5C]"
                            : "w-2 bg-[#C9C8C1] hover:bg-[#C89B3C]"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-[#0F4C5C]/25 bg-white p-8 text-center shadow-sm">
                <Building2
                  size={40}
                  className="text-[#C89B3C]"
                  strokeWidth={1.4}
                />

                <h2 className="mt-5 text-xl font-semibold text-[#0F4C5C]">
                  Discover your next property
                </h2>

                <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
                  Explore the latest homes, commercial spaces, and investment
                  opportunities in our listings.
                </p>

                <Link
                  href="/properties"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0F4C5C] px-5 py-3 font-semibold text-white transition hover:bg-[#0B3A46]"
                >
                  Browse properties
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
