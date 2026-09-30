import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAgentById } from "@/lib/agent-service";
import Container from "@/components/Container";

export default async function AgentProfilePage({ params }) {
  const { id } = await params;

  const agent = await getAgentById(id);

  if (!agent) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <Container>

        {/* Back */}
        <Link
          href="/agents"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#0F4C5C] transition"
        >
          ← Back to Agents
        </Link>

        {/* Profile */}
        <section className="mt-8 grid lg:grid-cols-[400px_1fr] gap-12 items-start">

          {/* Image */}
          <div className="relative h-[480px] overflow-hidden rounded-3xl bg-gray-100">
            {agent.image ? (
              <Image
                src={agent.image}
                alt={agent.name}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#0F4C5C]">
                <span className="text-8xl font-semibold text-white">
                  {agent.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Information */}
          <div className="pt-4">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">
              {agent.title || "Property Consultant"}
            </p>

            <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-[#0F4C5C]">
              {agent.name}
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
              {agent.bio ||
                "Dedicated to helping clients find exceptional properties and make confident real estate decisions."}
            </p>

            {/* Stats */}
            <div className="grid sm:grid-cols-2 gap-4 mt-10 max-w-xl">

              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                <p className="text-sm text-gray-500">
                  Experience
                </p>

                <p className="mt-1 text-2xl font-semibold text-[#0F4C5C]">
                  {agent.experience ?? 0} Years
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                <p className="text-sm text-gray-500">
                  Listings
                </p>

                <p className="mt-1 text-2xl font-semibold text-[#0F4C5C]">
                  {agent.listings ?? 0}
                </p>
              </div>

            </div>

            {/* Contact */}
            <div className="mt-10 border-t border-gray-200 pt-8">

              <h2 className="text-xl font-semibold text-gray-900">
                Contact {agent.name.split(" ")[0]}
              </h2>

              <div className="mt-5 space-y-3 text-gray-600">

                <p>
                  <span className="font-medium text-gray-900">
                    Email:
                  </span>{" "}
                  {agent.email}
                </p>

                {agent.phone && (
                  <p>
                    <span className="font-medium text-gray-900">
                      Phone:
                    </span>{" "}
                    {agent.phone}
                  </p>
                )}

              </div>

              <div className="mt-7 flex flex-wrap gap-3">

                <a
                  href={`mailto:${agent.email}`}
                  className="rounded-xl bg-[#0F4C5C] px-6 py-3 font-medium text-white hover:bg-[#0b3d49] transition"
                >
                  Email Agent
                </a>

                {agent.phone && (
                  <a
                    href={`tel:${agent.phone}`}
                    className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-800 hover:bg-gray-50 transition"
                  >
                    Call Agent
                  </a>
                )}

              </div>
            </div>

          </div>
        </section>

        {/* Future properties section */}
        <section className="mt-24 border-t border-gray-200 pt-16">

          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">
              Portfolio
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
  {agent.properties.map((property) => (
    <div
      key={property.id}
      className="border rounded-2xl overflow-hidden bg-white"
    >
      <img
        src={property.images?.[0]}
        alt={property.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-bold">
          {property.title}
        </h3>

        <p className="text-gray-500 text-sm">
          {property.city}
        </p>

        <p className="font-bold text-[#0F4C5C] mt-2">
          PKR {property.price.toLocaleString()}
        </p>
      </div>
    </div>
  ))}
</div>

            
          </div>

        </section>

      </Container>
    </main>
  );
}