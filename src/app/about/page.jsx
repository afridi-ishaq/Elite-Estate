import Link from "next/link";
import Container from "@/components/Container";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us",
  description:
    "Elite Estates connects people with exceptional properties through a modern, transparent, client-focused experience.",
};

export default async function AboutPage() {
  const [properties, agents, cities] = await Promise.all([
    prisma.property.count(),
    prisma.agent.count(),
    prisma.property.groupBy({ by: ["city"] }),
  ]);

  const stats = [
    { label: "Properties", value: properties },
    { label: "Expert Agents", value: agents },
    { label: "Cities", value: cities.length },
  ].filter((s) => s.value > 0);

  return (
    <main className="min-h-screen bg-white pb-24 pt-28 md:pt-32">
      {/* Hero */}
      <section>
        <Container>
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">
              About Elite Estates
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#0F4C5C] md:text-6xl">
              Real Estate Built Around
              <span className="text-[#C89B3C]"> Trust.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Elite Estates connects people with exceptional properties
              through a modern, transparent, and client-focused real estate
              experience.
            </p>
          </div>
        </Container>
      </section>

      {/* Real stats */}
      {stats.length > 0 && (
        <section className="mt-12">
          <Container>
            <div className="grid grid-cols-3 gap-3 rounded-3xl border border-gray-100 bg-gray-50 p-5 text-center sm:gap-6 sm:p-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-heading text-3xl font-semibold text-[#0F4C5C] sm:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-gray-500 sm:text-sm">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Story */}
      <section className="mt-16 md:mt-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="rounded-3xl bg-[#0F4C5C] p-6 text-white sm:p-10 md:p-14">
              <p className="text-sm uppercase tracking-[0.2em] text-[#D9C7A7]">
                Our Approach
              </p>

              <h2 className="mt-5 text-3xl font-semibold md:text-4xl">
                A simpler way to find your next property.
              </h2>

              <p className="mt-6 leading-8 text-white/80">
                Buying, selling, or investing in property should feel
                straightforward. Our platform brings properties, experienced
                professionals, and useful information together in one place.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">
                Why Elite Estates
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-[#0F4C5C] md:text-4xl">
                Professional service with a personal approach.
              </h2>

              <p className="mt-6 leading-8 text-gray-600">
                We focus on understanding what clients are looking for rather
                than simply showing them a list of properties. Our team helps
                clients explore opportunities, understand their options, and
                move forward with greater confidence.
              </p>

              <p className="mt-5 leading-8 text-gray-600">
                From residential homes to commercial opportunities, Elite
                Estates is designed to make the property journey easier and
                more transparent.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="mt-20 bg-gray-50 py-16 md:mt-24 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">
              Our Values
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-[#0F4C5C] md:text-4xl">
              What guides us
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Trust",
                text: "Clear communication and honest guidance throughout the property journey.",
              },
              {
                title: "Expertise",
                text: "Experienced professionals who understand local property markets and client needs.",
              },
              {
                title: "Service",
                text: "A client-first experience designed around individual goals and requirements.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8"
              >
                <h3 className="text-xl font-semibold text-[#0F4C5C]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="mt-20 md:mt-24">
        <Container>
          <div className="rounded-3xl bg-[#0F4C5C] px-5 py-10 text-center text-white sm:px-8 md:px-16 md:py-14">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Ready to find your next property?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-white/75">
              Explore our latest properties or speak with one of our
              professionals.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/properties"
                className="rounded-xl bg-[#C89B3C] px-6 py-3 font-medium text-white transition hover:opacity-90"
              >
                Explore Properties
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-white/30 px-6 py-3 font-medium text-white transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}