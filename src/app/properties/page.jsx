export const dynamic = "force-dynamic";
import Link from "next/link";
import Container from "@/components/Container";
import PropertyCard from "@/components/PropertyCard";
import { getFilteredProperties } from "@/lib/property-service";
import { Search, MapPin, Home, SlidersHorizontal, RotateCcw, Building2 } from "lucide-react";

export default async function PropertiesPage({ searchParams }) {
  // Safe await for Next.js 15+ searchParams Promise
  const resolvedParams = await searchParams;

  const search = resolvedParams?.search || "";
  const city = resolvedParams?.city || "";
  const minPrice = resolvedParams?.minPrice || "";
  const maxPrice = resolvedParams?.maxPrice || "";
  const propertyType = resolvedParams?.propertyType || "";

  const isFiltered = Boolean(search || city || minPrice || maxPrice || propertyType);

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
        {/* Header Section */}
        <header className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B3C]/10 text-[#C89B3C] text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C89B3C] animate-pulse" />
            Exclusive Listings
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Find Your Dream Space
          </h1>

          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Explore curated luxury residences, prime commercial spots, and high-yield investment opportunities.
          </p>
        </header>

        {/* Filter Card */}
        <section className="bg-white border border-slate-200/80 rounded-2xl shadow-lg shadow-slate-200/40 p-4 sm:p-6 mb-10 transition-all">
          <form action="/properties" method="GET" className="space-y-4">
            
            {/* Top Bar: Search Input */}
            <div className="relative w-full">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 shrink-0" />
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search by neighborhood, keyword, or property title..."
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20 focus:border-[#0F4C5C] focus:bg-white transition-all text-sm"
              />
            </div>

            {/* Bottom Row: Selects, Prices, and Action */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* City Selector */}
              <div className="relative">
                <select
                  name="city"
                  defaultValue={city}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20 focus:border-[#0F4C5C] focus:bg-white transition-all text-sm font-medium pr-10"
                >
                  <option value="">All Cities</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Peshawar">Peshawar</option>
                </select>
                <MapPin className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>

              {/* Property Type Selector */}
              <div className="relative">
                <select
                  name="propertyType"
                  defaultValue={propertyType}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20 focus:border-[#0F4C5C] focus:bg-white transition-all text-sm font-medium pr-10"
                >
                  <option value="">All Types</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Plot">Plot</option>
                </select>
                <Home className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>

              {/* Min Price */}
              <input
                type="number"
                name="minPrice"
                defaultValue={minPrice}
                placeholder="Min Price (PKR)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20 focus:border-[#0F4C5C] focus:bg-white transition-all text-sm"
              />

              {/* Max Price */}
              <input
                type="number"
                name="maxPrice"
                defaultValue={maxPrice}
                placeholder="Max Price (PKR)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20 focus:border-[#0F4C5C] focus:bg-white transition-all text-sm"
              />

              {/* Actions: Apply & Clear */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#0F4C5C] hover:bg-[#0c3d4a] active:scale-[0.98] text-white font-semibold py-3.5 px-4 rounded-xl shadow-md shadow-[#0F4C5C]/15 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Apply</span>
                </button>

                {isFiltered && (
                  <Link
                    href="/properties"
                    title="Reset Filters"
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl p-3.5 flex items-center justify-center transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </form>
        </section>

        {/* Results Info Bar */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-sm font-medium text-slate-500">
            Showing <span className="text-slate-900 font-bold">{properties.length}</span> {properties.length === 1 ? 'property' : 'properties'}
          </p>
        </div>

        {/* Properties Grid / Empty State */}
        {properties.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center max-w-xl mx-auto shadow-sm my-8">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Building2 className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">No Matching Properties</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
              We couldn't find anything matching your filter criteria. Try clearing some filters or searching for a different keyword.
            </p>
            <Link 
              href="/properties" 
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-[#0F4C5C] hover:text-[#0c3d4a] underline underline-offset-4"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}