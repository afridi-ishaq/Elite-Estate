export const dynamic = "force-dynamic";
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
                  style={{ color: "white" }}
                  className="inline-flex items-center justify-center gap-1.5 bg-[#0F4C5C] hover:bg-[#0c3d4a] active:bg-[#092e38] text-white text-xs sm:text-sm font-medium px-3.5 py-2 rounded-lg transition-colors duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] focus:ring-offset-2"
                >
                  {/* Edit Pencil Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  <span>Edit</span>
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