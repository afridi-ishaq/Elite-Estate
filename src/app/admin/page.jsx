import Link from "next/link";
import Container from "@/components/Container";

export default function AdminPage() {
  return (
    <main className="pt-32 pb-24">
      <Container>
        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 mt-3">
            Manage properties, leads and agents.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Link
            href="/admin/properties"
            className="
              bg-white
              rounded-3xl
              p-8
              shadow-md
              hover:shadow-xl
            "
          >
            <h2 className="text-2xl font-bold">
              Properties
            </h2>

            <p className="text-gray-500 mt-3">
              Manage property listings.
            </p>
          </Link>

          <Link
            href="/admin/leads"
            className="
              bg-white
              rounded-3xl
              p-8
              shadow-md
              hover:shadow-xl
            "
          >
            <h2 className="text-2xl font-bold">
              Leads
            </h2>

            <p className="text-gray-500 mt-3">
              View customer inquiries.
            </p>
          </Link>

          <Link
            href="/admin/agents"
            className="
              bg-white
              rounded-3xl
              p-8
              shadow-md
              hover:shadow-xl
            "
          >
            <h2 className="text-2xl font-bold">
              Agents
            </h2>

            <p className="text-gray-500 mt-3">
              Manage agents.
            </p>
          </Link>
        </div>
      </Container>
    </main>
  );
}