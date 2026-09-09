export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import { getAdminProperties } from "@/lib/admin-property-service";
import DeletePropertyButton from "@/components/DeletePropertyButton";
import { deleteProperty } from "@/actions/delete-property";
import { Plus, Building2, MapPin, Tag, AlertCircle, ImageIcon } from "lucide-react";

export default async function AdminPropertiesPage() {
  const properties = await getAdminProperties();

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-24 px-4 sm:px-6">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Properties Management
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage your real estate listings, edit property details, or delete old entries.
            </p>
          </div>

          <Link
            href="/admin/properties/new"
            className="inline-flex items-center justify-center gap-2 bg-[#0F4C5C] hover:bg-[#0c3d4a] active:bg-[#092e38] text-white px-5 py-3 rounded-xl text-sm font-medium shadow-md shadow-[#0F4C5C]/20 transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 text-white" />
            <span className="text-white">Add Property</span>
          </Link>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {properties && properties.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {properties.map((property) => {
                // Get Cloudinary URL from property object
                const imageUrl =
                  property.imageUrl ||
                  property.image ||
                  (Array.isArray(property.images) ? property.images[0] : null);

                return (
                  <div
                    key={property.id}
                    className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                  >
                    {/* Left: Image & Details */}
                    <div className="flex items-start sm:items-center gap-4">
                      {/* Cloudinary Thumbnail */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center text-slate-400">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={property.title || "Property image"}
                            fill
                            sizes="(max-width: 640px) 80px, 96px"
                            className="object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-8 h-8 opacity-40" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                            <Tag className="w-3 h-3 mr-1 text-[#0F4C5C]" />
                            {property.propertyType || "Property"}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            ID: {property.id}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#0F4C5C] shrink-0" />
                          {property.title}
                        </h3>
                        <p className="text-sm text-slate-500 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          {property.city || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Right: Actions & Price */}
                    <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                      <div className="text-right">
                        <span className="block text-xs text-slate-400 font-medium">Listing Price</span>
                        <span className="text-base sm:text-lg font-bold text-slate-900">
                          PKR {property.price ? property.price.toLocaleString() : "0"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Link
                          href={`/admin/properties/${property.id}`}
                          className="inline-flex items-center justify-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20"
                        >
                          <span>Edit</span>
                        </Link>

                        <DeletePropertyButton
                          action={async () => {
                            "use server";
                            await deleteProperty(property.id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-slate-800 font-semibold text-base">No properties found</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
                Get started by creating your first property listing using the button above.
              </p>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}