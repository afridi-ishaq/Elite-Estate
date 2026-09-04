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

  // Check first before accessing property.city
  if (!property) {
    notFound();
  }

  const relatedProperties =
    await getRelatedProperties(
      property.city,
      property.id
    );

  // Build image list
  const propertyImages =
    property.images?.length > 0
      ? property.images
      : property.image
        ? [property.image]
        : [];

  return (
    <main className="pt-32 pb-24">
      <Container>

        {/* PROPERTY IMAGE GALLERY */}
        <div className="grid lg:grid-cols-2 gap-12">

          <div>
            {propertyImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">

                {propertyImages.slice(0, 4).map(
                  (image, index) => (
                    <div
                      key={index}
                      className={
                        index === 0
                          ? "col-span-2"
                          : ""
                      }
                    >
                      <img
                        src={image}
                        alt={`${property.title} - Image ${
                          index + 1
                        }`}
                        className={
                          index === 0
                            ? "w-full h-[400px] object-cover rounded-3xl"
                            : "w-full h-[190px] object-cover rounded-2xl"
                        }
                      />
                    </div>
                  )
                )}

              </div>
            ) : (
              <div className="w-full h-[400px] rounded-3xl bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">
                  No image available
                </p>
              </div>
            )}
          </div>

          {/* PROPERTY INFORMATION */}
          <div>

            {property.featured && (
              <span className="inline-block bg-[#C89B3C] text-black px-4 py-2 rounded-full font-medium">
                Featured Property
              </span>
            )}

            <h1 className="text-5xl font-bold mt-6">
              {property.title}
            </h1>

            <p className="text-gray-500 mt-3">
              {property.city}
            </p>

            {/* Property Type */}
            {property.propertyType && (
              <p className="mt-3 text-sm font-semibold text-[#0F4C5C]">
                {property.propertyType}
              </p>
            )}

            <h2 className="text-3xl font-bold mt-6 text-[#0F4C5C]">
              PKR {property.price.toLocaleString()}
            </h2>

            {/* PROPERTY SPECS */}
            <div className="flex gap-8 mt-8">

              <div>
                <h4 className="font-semibold">
                  Bedrooms
                </h4>

                <p>{property.bedrooms}</p>
              </div>

              <div>
                <h4 className="font-semibold">
                  Bathrooms
                </h4>

                <p>{property.bathrooms}</p>
              </div>

              <div>
                <h4 className="font-semibold">
                  Type
                </h4>

                <p>{property.propertyType || "N/A"}</p>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="mt-10">

              <h3 className="text-2xl font-bold">
                Description
              </h3>

              <p className="mt-4 text-gray-600 leading-8">
                {property.description}
              </p>

            </div>

            {/* INQUIRY FORM */}
            <div className="mt-12">
              <InquiryForm />
            </div>

          </div>
        </div>

        {/* RELATED PROPERTIES */}
        {relatedProperties.length > 0 && (
          <div className="mt-24">

            <h2 className="text-4xl font-bold mb-10">
              Related Properties
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {relatedProperties.map(
                (relatedProperty) => (
                  <PropertyCard
                    key={relatedProperty.id}
                    property={relatedProperty}
                  />
                )
              )}

            </div>

          </div>
        )}

      </Container>
    </main>
  );
}