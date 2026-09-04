import { getPropertyById } from "@/lib/property-service";
import { updateProperty } from "@/actions/property-actions";
import { redirect } from "next/navigation";
export default async function EditPropertyPage({
  params,
}) {
  const { id } = await params;

  const property = await getPropertyById(id);

  async function update(formData) {
    "use server";

    await updateProperty(id, formData);


    // redirect("/admin/properties");
    redirect("/admin/properties");
  }

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-md">
        <h1 className="text-4xl font-bold mb-8">
          Edit Property
        </h1>

        <form action={update} className="space-y-4">
          <input
            name="title"
            defaultValue={property.title}
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            name="description"
            defaultValue={property.description}
            rows="4"
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="city"
            defaultValue={property.city}
            className="w-full border p-3 rounded-xl"
          />

          <select
            name="propertyType"
            defaultValue={property.propertyType || "House"}
            className="w-full border p-3 rounded-xl"
          >
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="Commercial">Commercial</option>
            <option value="Plot">Plot</option>
          </select>

          <input
            name="price"
            type="number"
            defaultValue={property.price}
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="bedrooms"
            type="number"
            defaultValue={property.bedrooms}
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="bathrooms"
            type="number"
            defaultValue={property.bathrooms}
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="image"
            defaultValue={property.images?.[0] || ""}
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