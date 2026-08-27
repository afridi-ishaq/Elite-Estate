export const dynamic = "force-dynamic";
import { Suspense } from "react";
import Container from "@/components/Container";
import PropertyCard from "@/components/PropertyCard";
import { getFilteredProperties } from "@/lib/property-service";

export default async function PropertiesPage({ searchParams }) {
  const params = await searchParams;

  const search = params?.search || "";
  const city = params?.city || "";
  const minPrice = params?.minPrice || "";
  const maxPrice = params?.maxPrice || "";
  const propertyType = params?.propertyType || "";

  const properties = await getFilteredProperties(
    search,
    city,
    minPrice,
    maxPrice,
    propertyType
  );

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-24 text-slate-800 antialiased">
      <Container>
        {/* Header Section */}
        <header className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B3C]/10 text-[#C89B3C] text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C89B3C]"></span>
            Exclusive Listings
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Find Your Dream Space
          </h1>

          <p className="text-slate-600 text-lg mt-3 leading-relaxed">
            Explore curated luxury residences, prime commercial spots, and high-yield investment opportunities.
          </p>
        </header>

        {/* Filter Card */}
        <section className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-200/50 p-4 sm:p-6 mb-12 transition-all">
          <form action="/properties" method="GET" className="flex flex-col gap-4">
            
            {/* Top Bar: Search Input */}
            <div className="relative w-full">
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search by neighborhood, keyword, or title..."
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] focus:border-transparent focus:bg-white transition-all text-sm"
              />
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Bottom Row: Selects, Prices, and Action */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* City Selector */}
              <div className="relative">
                <select
                  name="city"
                  defaultValue={city}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] focus:bg-white transition-all text-sm font-medium"
                >
                  <option value="">All Cities</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Peshawar">Peshawar</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              {/* Property Type Selector */}
              <div className="relative">
                <select
                  name="propertyType"
                  defaultValue={propertyType}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] focus:bg-white transition-all text-sm font-medium"
                >
                  <option value="">All Types</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Plot">Plot</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              {/* Min Price */}
              <input
                type="number"
                name="minPrice"
                defaultValue={minPrice}
                placeholder="Min Price ($)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] focus:bg-white transition-all text-sm"
              />

              {/* Max Price */}
              <input
                type="number"
                name="maxPrice"
                defaultValue={maxPrice}
                placeholder="Max Price ($)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] focus:bg-white transition-all text-sm"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#0F4C5C] hover:bg-[#0B3A46] active:scale-[0.98] text-white font-semibold py-3.5 px-6 rounded-xl shadow-md shadow-[#0F4C5C]/20 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <span>Apply Filters</span>
              </button>
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
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0H9m1 0h1m-1 5h1m-1 0H9" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900">No Matching Properties</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
              We couldn't find anything matching your filter criteria. Try clearing some filters or searching for a different keyword.
            </p>
            <a 
              href="/properties" 
              className="inline-block mt-6 text-sm font-semibold text-[#0F4C5C] hover:text-[#0B3A46] underline underline-offset-4"
            >
              Reset all filters
            </a>
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