"use client";

import Container from "./Container";

const properties = [
  {
    id: 1,
    title: "Luxury Villa Islamabad",
    price: "PKR 4.5 Crore",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },
  {
    id: 2,
    title: "Modern Apartment Lahore",
    price: "PKR 2.2 Crore",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  },
  {
    id: 3,
    title: "Commercial Plaza Karachi",
    price: "PKR 12 Crore",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
  },
];

export default function FeaturedProperties() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="mb-12">
          <span className="text-[#C89B3C] font-semibold">
            Featured Listings
          </span>

          <h2 className="text-4xl font-bold mt-2">
            Premium Properties
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="
                bg-white
                rounded-2xl
                overflow-hidden
                shadow-md
                hover:shadow-xl
                transition
              "
            >
              <img
                src={property.image}
                alt={property.title}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="font-semibold text-xl">
                  {property.title}
                </h3>

                <p className="text-[#0F4C5C] font-bold mt-2">
                  {property.price}
                </p>

                <button
                  className="
                    mt-5
                    w-full
                    bg-[#0F4C5C]
                    text-white
                    py-3
                    rounded-xl
                  "
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}