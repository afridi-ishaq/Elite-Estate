import Container from "@/components/Container";
import InquiryForm from "@/components/InquiryForm";

export default function SellPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24">

      {/* Hero */}
      <section>
        <Container>
          <div className="max-w-4xl mx-auto text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">
              Sell With Elite Estates
            </p>

            <h1 className="mt-4 text-4xl md:text-6xl font-bold text-[#0F4C5C]">
              Sell Your Property
              <span className="text-[#C89B3C]"> Faster & Smarter</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              Reach qualified buyers, maximize exposure, and get
              professional guidance throughout the selling process.
            </p>

          </div>
        </Container>
      </section>

      {/* Why Sell */}
      <section className="mt-24">
        <Container>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#0F4C5C]">
              Why Sell With Us?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-14">

            <div className="bg-white border rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#0F4C5C]">
                Maximum Exposure
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Your property reaches serious buyers through our
                platform and marketing channels.
              </p>
            </div>

            <div className="bg-white border rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#0F4C5C]">
                Expert Guidance
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Our agents assist you from listing to final deal
                completion.
              </p>
            </div>

            <div className="bg-white border rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#0F4C5C]">
                Better Value
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Professional presentation helps attract stronger
                offers and better outcomes.
              </p>
            </div>

          </div>

        </Container>
      </section>

      {/* Process */}
      <section className="mt-24 bg-slate-50 py-20">
        <Container>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#0F4C5C]">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mt-14">

            {[
              "Submit Details",
              "Property Review",
              "Marketing & Listing",
              "Close The Deal",
            ].map((step, index) => (
              <div
                key={step}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-[#0F4C5C] text-white flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>

                <h3 className="mt-5 font-bold text-[#0F4C5C]">
                  {step}
                </h3>
              </div>
            ))}

          </div>

        </Container>
      </section>

      {/* Contact Form */}
      <section className="mt-24">
        <Container>

          <div className="max-w-3xl mx-auto">

            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-[#0F4C5C]">
                Request a Free Property Consultation
              </h2>

              <p className="mt-4 text-gray-600">
                Tell us about your property and our team will contact you.
              </p>
            </div>

            <InquiryForm />

          </div>

        </Container>
      </section>

    </main>
  );
}