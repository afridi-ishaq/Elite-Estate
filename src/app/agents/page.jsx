import Link from "next/link";
import Image from "next/image";
import { getAgents } from "@/lib/agent-service";
import Container from "@/components/Container";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Agents",
  description: "Meet the real estate professionals at Elite Estates.",
};

export default async function AgentsPage() {
  const agents = await getAgents();

  return (
    <main className="min-h-screen bg-white pb-24 pt-28 md:pt-32">
      {/* Hero */}
      <section className="mb-12 md:mb-16">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">
              Our Professionals
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#0F4C5C] md:text-6xl">
              Meet Our
              <span className="text-[#C89B3C]"> Experts</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Our experienced property professionals are here to help you
              discover the right property, negotiate with confidence, and make
              your next real estate decision with ease.
            </p>
          </div>
        </Container>
      </section>

      {/* Agents */}
      <section>
        <Container>
          {agents.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                No agents available
              </h2>
              <p className="mt-2 text-gray-500">
                Our agents will appear here once they are added.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {agents.map((agent) => {
                const listingCount =
                  agent._count?.properties || agent.listings || 0;

                return (
                  <div
                    key={agent.id}
                    className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="relative h-72 overflow-hidden bg-gray-100 sm:h-80">
                      {agent.image ? (
                        <Image
                          src={agent.image}
                          alt={agent.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#0F4C5C]">
                          <span className="text-6xl font-semibold text-white">
                            {agent.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <p className="text-sm font-medium text-[#C89B3C]">
                        {agent.title || "Property Consultant"}
                      </p>

                      <h2 className="mt-1 text-2xl font-semibold text-[#0F4C5C]">
                        {agent.name}
                      </h2>

                      <div className="mt-5 grid grid-cols-2 gap-4 border-y border-gray-100 py-4">
                        <div>
                          <p className="text-xs text-gray-500">Experience</p>
                          <p className="mt-1 font-semibold text-gray-900">
                            {agent.experience ?? 0} Years
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Listings</p>
                          <p className="mt-1 font-semibold text-gray-900">
                            {listingCount}
                          </p>
                        </div>
                      </div>

                      <p className="mt-4 line-clamp-2 text-sm text-gray-600">
                        {agent.bio ||
                          "Dedicated to helping clients find exceptional properties and make confident real estate decisions."}
                      </p>

                      <Link
                        href={`/agents/${agent.id}`}
                        className="mt-6 block w-full rounded-xl bg-[#0F4C5C] px-5 py-3 text-center font-medium text-white transition hover:bg-[#0b3d49]"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}