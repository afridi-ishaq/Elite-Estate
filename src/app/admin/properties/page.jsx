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
    <main className="min-h-screen bg-slate-50 pt-20 pb-24 md:pt-28">
      <Container>
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center md:mb-8">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Properties Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your listings, edit details, or delete old entries.
            </p>
          </div>

          <Link
            href="/admin/properties/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F4C5C] px-5 py-3 text-sm font-medium text-white shadow-md shadow-[#0F4C5C]/20 transition hover:bg-[#0c3d4a] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>Add Property</span>
          </Link>
        </div>

        {/* List */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
          {properties && properties.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {properties.map((property) => {
                const imageUrl =
                  property.imageUrl ||
                  property.image ||
                  (Array.isArray(property.images) ? property.images[0] : null);

                return (
                  <div
                    key={property.id}
                    className="flex flex-col justify-between gap-4 p-4 transition-colors hover:bg-slate-50/60 sm:p-6 md:flex-row md:items-center"
                  >
                    {/* Left: image and details */}
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100 text-slate-400 sm:h-24 sm:w-24">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={property.title || "Property image"}
                            fill
                            sizes="(max-width: 640px) 80px, 96px"
                            className="object-cover"
                          />
                        ) : (
                          <ImageIcon className="h-8 w-8 opacity-40" />
                        )}
                      </div>

                      <div className="min-w-0 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                            <Tag className="mr-1 h-3 w-3 text-[#0F4C5C]" />
                            {property.propertyType || "Property"}
                          </span>
                          <span className="hidden font-mono text-xs text-slate-400 lg:inline">
                            ID: {String(property.id).slice(0, 8)}
                          </span>
                        </div>

                        <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900 sm:text-lg">
                          <Building2 className="h-4 w-4 shrink-0 text-[#0F4C5C]" />
                          <span className="truncate">{property.title}</span>
                        </h3>

                        <p className="flex items-center gap-1.5 text-sm text-slate-500">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                          <span className="truncate">{property.city || "N/A"}</span>
                        </p>
                      </div>
                    </div>

                    {/* Right: price and actions */}
                    <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3 md:justify-end md:gap-6 md:border-t-0 md:pt-0">
                      <div className="text-left md:text-right">
                        <span className="block text-xs font-medium text-slate-400">
                          Listing Price
                        </span>
                        <span className="text-base font-bold text-slate-900 sm:text-lg">
                          PKR {property.price ? property.price.toLocaleString() : "0"}
                        </span>
                      </div>

                      <div className="flex shrink-0 items-center gap-2.5">
                        <Link
                          href={`/admin/properties/${property.id}`}
                          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                        >
                          Edit
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
            <div className="px-4 py-16 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-800">
                No properties found
              </h3>
              <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                Get started by creating your first property listing using the
                button above.
              </p>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}