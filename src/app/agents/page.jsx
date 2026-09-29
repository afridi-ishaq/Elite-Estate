import Link from "next/link";
import Image from "next/image";
import { getAgents } from "@/lib/agent-service";
import Container from "@/components/Container";

export default async function AgentsPage() {
  const agents = await getAgents();

  return (
    <main className="bg-white min-h-screen pt-32 pb-24">

      {/* Hero */}
      <section className="mb-16">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C89B3C]">
              Our Professionals
            </p>

            <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-[#0F4C5C]">
              Meet Our
              <span className="text-[#C89B3C]"> Experts</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Our experienced property professionals are here to help you
              discover the right property, negotiate with confidence, and
              make your next real estate decision with ease.
            </p>
          </div>
        </Container>
      </section>

      {/* Agents */}
      <section>
        <Container>
          {agents.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-900">
                No agents available
              </h2>

              <p className="mt-2 text-gray-500">
                Our agents will appear here once they are added.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-80 bg-gray-100 overflow-hidden">
                    {agent.image ? (
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#0F4C5C]">
                        <span className="text-6xl font-semibold text-white">
                          {agent.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-sm text-[#C89B3C] font-medium">
                      {agent.title || "Property Consultant"}
                    </p>

                    <h2 className="mt-1 text-2xl font-semibold text-[#0F4C5C]">
                      {agent.name}
                    </h2>

                    <div className="mt-5 grid grid-cols-2 gap-4 border-y border-gray-100 py-4">
                      <div>
                        <p className="text-xs text-gray-500">
                          Experience
                        </p>

                        <p className="mt-1 font-semibold text-gray-900">
                          {agent.experience ?? 0} Years
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Listings
                        </p>

                        <p className="mt-1 font-semibold text-gray-900">
                          {agent.listings ?? 0}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-gray-600 line-clamp-2">
                      {agent.bio ||
                        "Dedicated to helping clients find exceptional properties and make confident real estate decisions."}
                    </p>

                    <Link
                      href={`/agents/${agent.id}`}
                      className="mt-6 block w-full rounded-xl bg-[#0F4C5C] px-5 py-3 text-center font-medium text-white hover:bg-[#0b3d49] transition"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}