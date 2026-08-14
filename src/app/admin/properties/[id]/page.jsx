import { getPropertyById } from "@/lib/property-service";

export default async function EditPropertyPage({
  params,
}) {
  const { id } = await params;

  const property = await getPropertyById(id);

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-md">
        <h1 className="text-4xl font-bold mb-8">
          Edit Property
        </h1>

        <form className="space-y-4">
          <input
            type="text"
            defaultValue={property.title}
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            defaultValue={property.description}
            className="w-full border p-3 rounded-xl"
            rows="4"
          />

          <input
            type="text"
            defaultValue={property.city}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="number"
            defaultValue={property.price}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="number"
            defaultValue={property.bedrooms}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="number"
            defaultValue={property.bathrooms}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            defaultValue={property.image}
            className="w-full border p-3 rounded-xl"
          />

          <button
            type="submit"
            className="
              bg-[#0F4C5C]
              text-white
              px-6
              py-3
              rounded-xl
            "
          >
            Update Property
          </button>
        </form>
      </div>
    </main>
  );
}