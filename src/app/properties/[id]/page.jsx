import PropertyCard from "@/components/PropertyCard";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import InquiryForm from "@/components/InquiryForm";
import {
  getPropertyById,
  getRelatedProperties,
} from "@/lib/property-service";
export default async function PropertyDetailsPage({
  params,
}) {
  const { id } = await params;

  const property = await getPropertyById(id);

  const relatedProperties =
    await getRelatedProperties(
      property.city,
      property.id
    );

  if (!property) {
    notFound();
  }

  return (
    <main className="pt-32 pb-24">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-125 object-cover rounded-3xl"
            />
          </div>

          <div>
            {property.featured && (
              <span className="bg-[#C89B3C] text-black px-4 py-2 rounded-full font-medium">
                Featured Property
              </span>
            )}

            <h1 className="text-5xl font-bold mt-6">
              {property.title}
            </h1>

            <p className="text-gray-500 mt-3">
              {property.city}
            </p>

            <h2 className="text-3xl font-bold mt-6 text-[#0F4C5C]">
              PKR {property.price.toLocaleString()}
            </h2>

            <div className="flex gap-8 mt-8">
              <div>
                <h4 className="font-semibold">Bedrooms</h4>
                <p>{property.bedrooms}</p>
              </div>

              <div>
                <h4 className="font-semibold">Bathrooms</h4>
                <p>{property.bathrooms}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-bold">
                Description
              </h3>

              <p className="mt-4 text-gray-600 leading-8">
                {property.description}
              </p>
            </div>

            <div className="mt-12">
              <InquiryForm />
            </div>
          </div>
        </div>
        {relatedProperties.length > 0 && (
          <div className="mt-24">
            <h2 className="text-4xl font-bold mb-10">
              Related Properties
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}