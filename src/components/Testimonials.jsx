import Container from "./Container";

const testimonials = [
  {
    name: "Ahmed Khan",
    review:
      "Elite Estates helped me find my dream home quickly and professionally.",
  },
  {
    name: "Sarah Ali",
    review:
      "Excellent service and amazing property options.",
  },
  {
    name: "Bilal Shah",
    review:
      "The best real estate experience I have ever had.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="text-center mb-14">
          <span className="text-[#C89B3C] font-semibold">
            Testimonials
          </span>

          <h2 className="text-4xl font-bold mt-3">
            What Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="
                p-8
                rounded-2xl
                border
                border-gray-200
              "
            >
              <p className="text-gray-600">
                "{item.review}"
              </p>

              <h4 className="mt-6 font-semibold">
                {item.name}
              </h4>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}