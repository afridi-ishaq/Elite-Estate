import Link from "next/link";
import Container from "@/components/Container";
import { getAdminProperties } from "@/lib/admin-property-service";
import DeletePropertyButton from "@/components/DeletePropertyButton";
import { deleteProperty } from "@/actions/delete-property";

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
            style={{ color: "white" }}
          >
            Add Property
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          {properties.map((property) => (
            <div
              key={property.id}
              className="border-b py-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">
                  {property.title}
                </h3>

                <p>{property.city}</p>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  PKR {property.price.toLocaleString()}
                </div>

                <Link
                  href={`/admin/properties/${property.id}`}
                  className="bg-[#0F4C5C] text-white px-4 py-2 rounded-lg"
                  style={{ color: "white" }}
                >
                  Edit
                </Link>
                <DeletePropertyButton
                  action={async () => {
                    "use server";
                    await deleteProperty(property.id);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}