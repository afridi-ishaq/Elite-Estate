import Link from "next/link";
import Container from "./Container";
import { getFeaturedProperties } from "@/lib/property-service";

export default async function FeaturedProperties() {
  let featuredProperties = [];

  try {
    featuredProperties = await getFeaturedProperties();
  } catch (error) {
    console.error("Failed to load featured properties:", error);
  }

  return (
    <section className="bg-white py-20 md:py-24">
      <Container>
        {/* Section Heading */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">
              Featured Listings
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F4C5C] sm:text-4xl lg:text-5xl">
              Premium Properties
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
              Explore exceptional properties selected for their location,
              design, comfort, and investment potential.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex w-fit items-center gap-2 font-semibold text-[#0F4C5C] transition hover:text-[#C89B3C]"
          >
            View All Properties
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Property Listings */}
        {featuredProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property) => {
              const image =
                property.images?.[0] || "/images/realestate.jpg";

              return (
                <article
                  key={property.id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Property Image */}
                  <Link
                    href={`/properties/${property.id}`}
                    className="relative block overflow-hidden"
                    aria-label={`View ${property.title}`}
                  >
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      <img
                        src={image}
                        alt={property.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-[#C89B3C] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                          Featured
                        </span>
                      </div>

                      {property.propertyType && (
                        <div className="absolute bottom-4 left-4">
                          <span className="rounded-md bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#0F4C5C] shadow-sm">
                            {property.propertyType}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Property Details */}
                  <div className="p-6">
                    <p className="text-sm font-medium text-gray-500">
                      {property.city}
                    </p>

                    <h3 className="mt-2 line-clamp-1 text-xl font-bold text-gray-900 transition group-hover:text-[#0F4C5C]">
                      <Link href={`/properties/${property.id}`}>
                        {property.title}
                      </Link>
                    </h3>

                    <p className="mt-3 text-2xl font-bold text-[#0F4C5C]">
                      PKR {Number(property.price).toLocaleString("en-PK")}
                    </p>

                    <div className="my-5 border-t border-gray-100" />

                    {/* Property Features */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span aria-hidden="true">🛏</span>
                        <span>
                          {property.bedrooms}{" "}
                          {property.bedrooms === 1 ? "Bed" : "Beds"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span aria-hidden="true">🛁</span>
                        <span>
                          {property.bathrooms}{" "}
                          {property.bathrooms === 1 ? "Bath" : "Baths"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span aria-hidden="true">📍</span>
                        <span>{property.city}</span>
                      </div>
                    </div>

                    {/* View Details */}
                    <Link
                      href={`/properties/${property.id}`}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-[#0F4C5C] px-5 py-3 font-semibold text-[#0F4C5C] transition duration-300 hover:bg-[#0F4C5C] hover:text-white"
                    >
                      View Property Details
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">
            <h3 className="text-xl font-semibold text-gray-900">
              No Featured Properties Yet
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-gray-600">
              Featured listings will appear here once properties have been
              added through the admin dashboard.
            </p>

            <Link
              href="/properties"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#0F4C5C] px-6 py-3 font-semibold text-white transition hover:bg-[#0b3c49]"
            >
              Explore Properties
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}