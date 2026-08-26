export const dynamic = "force-dynamic";
import { Suspense } from "react";
import Container from "@/components/Container";
import PropertyCard from "@/components/PropertyCard";
import {
  getFilteredProperties,
} from "@/lib/property-service";

export default async function PropertiesPage({
  searchParams,
}) {

 const params = await searchParams;

const search = params?.search || "";
const city = params?.city || "";

const properties =
  await getFilteredProperties(
    search,
    city
  );

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
          <form className="mb-8" action="/properties" method="GET">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search city or property..."
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              p-4
            "
          />
          <select
            name="city"
            defaultValue={city}
            className="
              border
              border-gray-300
              rounded-xl
              p-4
            "
          >

            <option value="">All Cities</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
            <option value="Peshawar">Peshawar</option>
          </select>
          <button
            type="submit"
            className="
              bg-[#0F4C5C]
              text-white
              px-6
              py-4
              rounded-xl
              ml-2
            "
          >
            Filter
          </button>
        </form>
          
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