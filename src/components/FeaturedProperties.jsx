import Link from "next/link";
import Container from "./Container";
import { getFeaturedProperties } from "@/lib/property-service";

export default async function FeaturedProperties() {
  const featuredProperties =
    await getFeaturedProperties();

  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="mb-12">
          <span className="text-[#C89B3C] font-semibold">
            Featured Listings
          </span>

          <h2 className="text-4xl font-bold mt-2">
            Premium Properties
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              className="
                bg-white
                rounded-2xl
                overflow-hidden
                shadow-md
                hover:shadow-xl
                transition
              "
            >
              <img
                src={property.image}
                alt={property.title}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="font-semibold text-xl">
                  {property.title}
                </h3>

                <p className="text-gray-500 mt-2">
                  {property.city}
                </p>

                <p className="text-[#0F4C5C] font-bold mt-2">
                  PKR {property.price.toLocaleString()}
                </p>

                <Link
                  href={`/properties/${property.id}`}
                  className="
                    mt-5
                    block
                    text-center
                    w-full
                    bg-[#0F4C5C]
                    text-white
                    py-3
                    rounded-xl
                  "
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}