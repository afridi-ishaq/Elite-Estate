import Container from "@/components/Container";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";

export default function PropertiesPage() {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}