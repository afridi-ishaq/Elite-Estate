import Link from "next/link";
import Container from "@/components/Container";
import { getAdminProperties } from "@/lib/admin-property-service";

export default async function AdminPropertiesPage() {
  const properties = await getAdminProperties();

  return (
    <main className="pt-32 pb-24">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Properties
          </h1>

          <Link
            href="/admin/properties/new"
            className="bg-[#0F4C5C] text-white px-5 py-3 rounded-xl"
          >
            Add Property
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          {properties.map((property) => (
            <div
              key={property.id}
              className="border-b py-4 flex justify-between"
            >
              <div>
                <h3 className="font-bold">
                  {property.title}
                </h3>

                <p>{property.city}</p>
              </div>

              <div>
                PKR {property.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}