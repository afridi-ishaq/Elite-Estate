import Link from "next/link";
import Container from "@/components/Container";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24">

      {/* Hero */}
      <section>
        <Container>
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">
              About Elite Estates
            </p>

            <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-[#0F4C5C]">
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

      {/* Story */}
      <section className="mt-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div className="rounded-3xl bg-[#0F4C5C] p-10 md:p-14 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-[#D9C7A7]">
                Our Approach
              </p>

              <h2 className="mt-5 text-3xl md:text-4xl font-semibold">
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

              <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-[#0F4C5C]">
                Professional service with a personal approach.
              </h2>

              <p className="mt-6 text-gray-600 leading-8">
                We focus on understanding what clients are looking for rather
                than simply showing them a list of properties. Our team helps
                clients explore opportunities, understand their options, and
                move forward with greater confidence.
              </p>

              <p className="mt-5 text-gray-600 leading-8">
                From residential homes to commercial opportunities, Elite
                Estates is designed to make the property journey easier and
                more transparent.
              </p>
            </div>

          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="mt-24 bg-gray-50 py-20">
        <Container>

          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">
              Our Values
            </p>

            <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-[#0F4C5C]">
              What guides us
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">

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
                className="bg-white rounded-2xl border border-gray-100 p-8"
              >
                <h3 className="text-xl font-semibold text-[#0F4C5C]">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {item.text}
                </p>
              </div>
            ))}

          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="mt-24">
        <Container>
          <div className="rounded-3xl bg-[#0F4C5C] px-8 py-14 md:px-16 text-center text-white">

            <h2 className="text-3xl md:text-4xl font-semibold">
              Ready to find your next property?
            </h2>

            <p className="mt-4 text-white/75 max-w-xl mx-auto">
              Explore our latest properties or speak with one of our
              professionals.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <Link
                href="/properties"
                className="rounded-xl bg-[#C89B3C] px-6 py-3 font-medium text-white hover:opacity-90 transition"
              >
                Explore Properties
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-white/30 px-6 py-3 font-medium hover:bg-white/10 transition"
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