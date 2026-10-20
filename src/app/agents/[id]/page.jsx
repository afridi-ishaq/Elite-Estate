import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAgentById } from "@/lib/agent-service";
import Container from "@/components/Container";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const agent = await getAgentById(id);

  return {
    title: agent?.name || "Agent Details",
    description: agent
      ? `Learn more about ${agent.name}, a real estate agent at Elite Estates.`
      : "Meet our real estate professionals.",
  };
}

function formatPKR(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return "Price on request";
  if (n >= 1e7) return `PKR ${Number((n / 1e7).toFixed(2))} Crore`;
  if (n >= 1e5) return `PKR ${Number((n / 1e5).toFixed(2))} Lakh`;
  return `PKR ${n.toLocaleString("en-PK")}`;
}

export default async function AgentProfilePage({ params }) {
  const { id } = await params;
  const agent = await getAgentById(id);

  if (!agent) {
    notFound();
  }

  const properties = agent.properties ?? [];

  return (
    <main className="min-h-screen bg-white pb-24 pt-28 md:pt-32">
      <Container>
        <Link
          href="/agents"
          className="inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-[#0F4C5C]"
        >
          ← Back to Agents
        </Link>

        {/* Profile */}
        <section className="mt-8 grid items-start gap-8 lg:grid-cols-[400px_1fr] lg:gap-12">
          <div className="relative h-[380px] overflow-hidden rounded-3xl bg-gray-100 sm:h-[480px]">
            {agent.image ? (
              <Image
                src={agent.image}
                alt={agent.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#0F4C5C]">
                <span className="text-8xl font-semibold text-white">
                  {agent.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="pt-0 lg:pt-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">
              {agent.title || "Property Consultant"}
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0F4C5C] md:text-5xl">
              {agent.name}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              {agent.bio ||
                "Dedicated to helping clients find exceptional properties and make confident real estate decisions."}
            </p>

            <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Experience</p>
                <p className="mt-1 text-2xl font-semibold text-[#0F4C5C]">
                  {agent.experience ?? 0} Years
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Listings</p>
                <p className="mt-1 text-2xl font-semibold text-[#0F4C5C]">
                  {properties.length || agent.listings || 0}
                </p>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900">
                Contact {agent.name.split(" ")[0]}
              </h2>

              <div className="mt-5 space-y-3 break-words text-gray-600">
                <p>
                  <span className="font-medium text-gray-900">Email:</span>{" "}
                  {agent.email}
                </p>

                {agent.phone && (
                  <p>
                    <span className="font-medium text-gray-900">Phone:</span>{" "}
                    {agent.phone}
                  </p>
                )}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={`mailto:${agent.email}`}
                  className="rounded-xl bg-[#0F4C5C] px-6 py-3 font-medium text-white transition hover:bg-[#0b3d49]"
                >
                  Email Agent
                </a>

                {agent.phone && (
                  <a
                    href={`tel:${agent.phone}`}
                    className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-800 transition hover:bg-gray-50"
                  >
                    Call Agent
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="mt-20 border-t border-gray-200 pt-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">
            Portfolio
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#0F4C5C] md:text-3xl">
            Properties by {agent.name.split(" ")[0]}
          </h2>

          {properties.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
              No properties listed yet.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <Link
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="group overflow-hidden rounded-2xl border bg-white transition hover:shadow-lg"
                >
                  <div className="relative h-52 w-full bg-gray-100">
                    {property.images?.[0] && (
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="truncate font-bold">{property.title}</h3>
                    <p className="text-sm text-gray-500">{property.city}</p>
                    <p className="mt-2 font-bold text-[#0F4C5C]">
                      {formatPKR(property.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}