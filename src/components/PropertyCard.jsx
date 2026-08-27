import Link from "next/link";

export default function PropertyCard({ property }) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="h-64 w-full object-cover"
        />

        {property.featured && (
          <span
            className="
              absolute
              top-4
              left-4
              bg-[#C89B3C]
              text-black
              px-3
              py-1
              rounded-full
              text-sm
              font-semibold
            "
          >
            Featured
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold">
          {property.title}
        </h3>

        <p className="text-gray-500 mt-2">
          {property.city}
        </p>
        <p className="text-sm text-gray-500">
          {property.propertyType}
        </p>

        <div className="flex gap-4 mt-4 text-sm text-gray-600">
          <span>{property.bedrooms} Beds</span>
          <span>{property.bathrooms} Baths</span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="font-bold text-[#0F4C5C]">
            PKR {property.price.toLocaleString()}
          </p>

          <Link
            href={`/properties/${property.id}`}
            className="
              bg-[#0F4C5C]
              text-white
              px-4
              py-2
              rounded-lg
            "
            style={{ color: "white" }}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}