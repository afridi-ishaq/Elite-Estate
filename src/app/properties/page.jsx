export const dynamic = "force-dynamic";

import Container from "@/components/Container";
import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/lib/property-service";

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <main className="pt-32 pb-24">
      <Container>
        <div className="mb-12">
          <span className="text-[#C89B3C] font-semibold">
            Properties
          </span>

          <h1 className="text-5xl font-bold mt-3">
            Browse Properties
          </h1>

          <p className="text-gray-600 mt-4">
            Discover luxury homes and investment opportunities.
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No Properties Found
            </h2>

            <p className="text-gray-500 mt-3">
              Add some properties to the database first.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}