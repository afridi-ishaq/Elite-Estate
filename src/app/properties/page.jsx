
import Link from "next/link";
import Container from "@/components/Container";
import PropertyCard from "@/components/PropertyCard";
import { getFilteredProperties } from "@/lib/property-service";
import {
  Search,
  MapPin,
  Home,
  SlidersHorizontal,
  RotateCcw,
  Building2,
} from "lucide-react";
import PropertyMapToggle from "@/components/PropertyMapToggle";

export const metadata = {
  title: "Properties",
};

export default async function PropertiesPage({ searchParams }) {
  const resolvedParams = await searchParams;

  const search = resolvedParams?.search || "";
  const city = resolvedParams?.city || "";
  const minPrice = resolvedParams?.minPrice || "";
  const maxPrice = resolvedParams?.maxPrice || "";
  const propertyType = resolvedParams?.propertyType || "";

  const isFiltered = Boolean(
    search || city || minPrice || maxPrice || propertyType
  );

  const properties = await getFilteredProperties(
    search,
    city,
    minPrice,
    maxPrice,
    propertyType
  );

  return (
    <main className="min-h-screen bg-slate-50/50 pt-28 pb-24 text-slate-800 antialiased">
      <Container>
        <header className="mb-8 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#C89B3C]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#C89B3C]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#C89B3C]" />
            Exclusive Listings
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Find Your Dream Space
          </h1>

          <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
            Explore curated luxury residences, prime commercial spots, and
            high-yield investment opportunities.
          </p>
        </header>

        {/* Search and filters */}
        <section className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-lg shadow-slate-200/40 transition-all sm:p-6">
          <form action="/properties" method="GET" className="space-y-4">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search by neighborhood, keyword, or property title..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-[#0F4C5C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <div className="relative">
                <select
                  name="city"
                  defaultValue={city}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-10 text-sm font-medium text-slate-700 transition-all focus:border-[#0F4C5C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20"
                >
                  <option value="">All Cities</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Peshawar">Peshawar</option>
                </select>
                <MapPin className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>

              <div className="relative">
                <select
                  name="propertyType"
                  defaultValue={propertyType}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-10 text-sm font-medium text-slate-700 transition-all focus:border-[#0F4C5C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20"
                >
                  <option value="">All Types</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Plot">Plot</option>
                </select>
                <Home className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>

              <input
                type="number"
                name="minPrice"
                min="0"
                defaultValue={minPrice}
                placeholder="Min Price (PKR)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-[#0F4C5C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20"
              />

              <input
                type="number"
                name="maxPrice"
                min="0"
                defaultValue={maxPrice}
                placeholder="Max Price (PKR)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-[#0F4C5C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20"
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0F4C5C] px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#0F4C5C]/15 transition-all duration-200 hover:bg-[#0c3d4a] active:scale-[0.98]"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Apply
                </button>

                {isFiltered && (
                  <Link
                    href="/properties"
                    title="Reset Filters"
                    aria-label="Reset filters"
                    className="flex items-center justify-center rounded-xl bg-slate-100 p-3.5 text-slate-600 transition-all hover:bg-slate-200"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </form>
        </section>

        {/* Results and optional map */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 px-1">
          <p className="text-sm font-medium text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-900">
              {properties.length}
            </span>{" "}
            {properties.length === 1 ? "property" : "properties"}
          </p>

          <PropertyMapToggle properties={properties} />
        </div>

        {/* Property cards appear before any map */}
        {properties.length === 0 ? (
          <div className="my-8 mx-auto max-w-xl rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Building2 className="h-7 w-7" />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              No Matching Properties
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              We couldn&apos;t find anything matching your filters. Try
              clearing some filters or searching for a different keyword.
            </p>

            <Link
              href="/properties"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0F4C5C] underline underline-offset-4 hover:text-[#0c3d4a]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset all filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
