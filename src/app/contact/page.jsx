import Container from "@/components/Container";
import InquiryForm from "@/components/InquiryForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24">

      {/* Header */}
      <section>
        <Container>
          <div className="max-w-3xl">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">
              Contact Elite Estates
            </p>

            <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-[#0F4C5C]">
              Let's Talk About
              <span className="text-[#C89B3C]"> Property.</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Whether you're looking to buy, sell, invest, or simply have a
              question, our team is ready to help.
            </p>

          </div>
        </Container>
      </section>

      {/* Contact */}
      <section className="mt-16">
        <Container>

          <div className="grid lg:grid-cols-2 gap-12">

            {/* Information */}
            <div>

              <div className="rounded-3xl bg-[#0F4C5C] p-8 md:p-10 text-white">

                <p className="text-sm uppercase tracking-[0.2em] text-[#D9C7A7]">
                  Get In Touch
                </p>

                <h2 className="mt-4 text-3xl font-semibold">
                  We're here to help.
                </h2>

                <p className="mt-5 text-white/75 leading-7">
                  Tell us what you're looking for and a member of our team
                  will get back to you.
                </p>

                <div className="mt-10 space-y-6">

                  <div>
                    <p className="text-sm text-white/50">
                      Email
                    </p>

                    <a
                      href="mailto:ishaqafridi7119@gmail.com"
                      className="mt-1 block hover:text-[#D9C7A7] transition"
                    >
                      ishaqafridi7119@gmail.com
                    </a>
                  </div>

                  <div>
                    <p className="text-sm text-white/50">
                      Phone
                    </p>

                    <a
                      href="tel:+923040944242"
                      className="mt-1 block hover:text-[#D9C7A7] transition"
                    >
                      +92 304 0944242
                    </a>
                  </div>

                  <div>
                    <p className="text-sm text-white/50">
                      Office
                    </p>

                    <p className="mt-1">
                      Islamabad, Pakistan
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-white/50">
                      Office Hours
                    </p>

                    <p className="mt-1">
                      Monday – Saturday
                    </p>

                    <p className="text-white/70">
                      9:00 AM – 6:00 PM
                    </p>
                  </div>

                </div>
              </div>

            </div>

            {/* Form */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-[#0F4C5C]">
                  Send us a message
                </h2>

                <p className="mt-2 text-gray-600">
                  Tell us what you need and we'll be in touch.
                </p>
              </div>

              <div className="rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm">
                <InquiryForm />
              </div>
            </div>

          </div>

        </Container>
      </section>

    </main>
  );
}