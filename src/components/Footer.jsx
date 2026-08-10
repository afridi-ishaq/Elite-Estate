import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-16">
      <Container>
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold text-[#C89B3C]">
              Elite Estates
            </h3>

            <p className="mt-4 text-gray-400">
              Luxury real estate solutions for buyers,
              investors, and businesses.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              Company
            </h4>

            <ul className="space-y-2 text-gray-400">
              <li>About</li>
              <li>Agents</li>
              <li>Properties</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              Services
            </h4>

            <ul className="space-y-2 text-gray-400">
              <li>Buy Property</li>
              <li>Sell Property</li>
              <li>Investments</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              Contact
            </h4>

            <ul className="space-y-2 text-gray-400">
              <li>Islamabad, Pakistan</li>
              <li>info@eliteestates.com</li>
              <li>+92 300 1234567</li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}