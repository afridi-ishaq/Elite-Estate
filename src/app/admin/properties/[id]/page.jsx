import { getPropertyById } from "@/lib/property-service";
import { updateProperty } from "@/actions/property-actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2, Image as ImageIcon, MapPin, Tag } from "lucide-react";

export default async function EditPropertyPage({ params }) {
  const { id } = await params;
  const property = await getPropertyById(id);

  async function update(formData) {
    "use server";
    await updateProperty(id, formData);
    redirect("/admin/properties");
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Link & Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/admin/properties"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-[#0F4C5C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Link>
          <span className="text-xs font-semibold px-3 py-1 bg-slate-200 text-slate-700 rounded-full">
            ID: {id}
          </span>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#0F4C5C] to-[#136175] px-8 py-6 text-white">
            <h1 className="text-2xl font-bold tracking-tight">Edit Property</h1>
            <p className="text-slate-200 text-sm mt-1">
              Update the details and images for this listing.
            </p>
          </div>

          <form action={update} className="p-8 space-y-6">
            {/* General Information Section */}
            <div>
              <h2 className="text-base font-semibold text-slate-900 border-b pb-2 mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#0F4C5C]" />
                General Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Property Title
                  </label>
                  <input
                    name="title"
                    defaultValue={property.title}
                    required
                    className="w-full border border-slate-300 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none p-3 rounded-xl text-slate-800 text-sm transition-all"
                    placeholder="e.g. Modern Luxury Villa with Ocean View"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={property.description}
                    rows="4"
                    required
                    className="w-full border border-slate-300 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none p-3 rounded-xl text-slate-800 text-sm transition-all resize-y"
                    placeholder="Provide a comprehensive description..."
                  />
                </div>
              </div>
            </div>

            {/* Categorization & Financials */}
            <div>
              <h2 className="text-base font-semibold text-slate-900 border-b pb-2 mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#0F4C5C]" />
                Classification & Pricing
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    defaultValue={property.propertyType || "House"}
                    className="w-full border border-slate-300 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none p-3 rounded-xl text-slate-800 text-sm transition-all bg-white"
                  >
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Plot">Plot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    name="price"
                    type="number"
                    defaultValue={property.price}
                    required
                    className="w-full border border-slate-300 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none p-3 rounded-xl text-slate-800 text-sm transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Location & Specifications */}
            <div>
              <h2 className="text-base font-semibold text-slate-900 border-b pb-2 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0F4C5C]" />
                Location & Specs
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    City
                  </label>
                  <input
                    name="city"
                    defaultValue={property.city}
                    required
                    className="w-full border border-slate-300 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none p-3 rounded-xl text-slate-800 text-sm transition-all"
                    placeholder="City name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Bedrooms
                  </label>
                  <input
                    name="bedrooms"
                    type="number"
                    defaultValue={property.bedrooms}
                    className="w-full border border-slate-300 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none p-3 rounded-xl text-slate-800 text-sm transition-all"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Bathrooms
                  </label>
                  <input
                    name="bathrooms"
                    type="number"
                    defaultValue={property.bathrooms}
                    className="w-full border border-slate-300 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none p-3 rounded-xl text-slate-800 text-sm transition-all"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Image URLs Section */}
            <div>
              <h2 className="text-base font-semibold text-slate-900 border-b pb-2 mb-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#0F4C5C]" />
                Image URLs
              </h2>
              <div className="space-y-3">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index}>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Image URL {index + 1} {index === 0 && "(Primary)"}
                    </label>
                    <input
                      name={`image${index + 1}`}
                      defaultValue={property.images?.[index] || ""}
                      className="w-full border border-slate-300 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none p-2.5 rounded-xl text-slate-800 text-sm transition-all"
                      placeholder={`https://example.com/image-${index + 1}.jpg`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-4 flex items-center justify-end gap-4 border-t">
              <Link
                href="/admin/properties"
                className="px-6 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-[#0F4C5C] hover:bg-[#0c3d49] text-white px-8 py-3 rounded-xl text-sm font-medium shadow-lg shadow-[#0F4C5C]/20 transition-all active:scale-[0.98]"
              >
                Update Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}