import Container from "./Container";
import {
  FaBuilding,
  FaHandshake,
  FaMapMarkedAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaBuilding size={32} />,
    title: "Premium Properties",
    description:
      "Handpicked luxury homes and commercial investments.",
  },
  {
    icon: <FaHandshake size={32} />,
    title: "Trusted Agents",
    description:
      "Experienced professionals guiding every step.",
  },
  {
    icon: <FaMapMarkedAlt size={32} />,
    title: "Prime Locations",
    description:
      "Properties in the most desirable areas.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24">
      <Container>
        <div className="text-center mb-14">
          <span className="text-[#C89B3C] font-semibold">
            Why Choose Us
          </span>

          <h2 className="text-4xl font-bold mt-3">
            Real Estate Excellence
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="
                bg-white
                p-8
                rounded-2xl
                shadow-sm
              "
            >
              <div className="text-[#0F4C5C] mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}