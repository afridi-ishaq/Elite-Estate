
"use client";

import { useState } from "react";
import { Map, LayoutGrid, X } from "lucide-react";
import PropertyMap from "@/components/PropertyMap";

export default function PropertyMapToggle({ properties = [] }) {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3 pr-20">
      <button
        type="button"
        onClick={() => setShowMap((current) => !current)}
        aria-expanded={showMap}
        className="inline-flex items-center gap-2 rounded-xl border border-[#0F4C5C]/20 bg-white px-8 py-3 text-sm font-semibold text-[#0F4C5C] shadow-lg transition hover:bg-[#0F4C5C]/5"
      >
        {showMap ? (
          <>
            <X className="h-4 w-4" />
            Hide Map
          </>
        ) : (
          <>
            <Map className="h-4 w-4" />
            Map View
          </>
        )}
      </button>

      {showMap && (
        <div className="basis-full">
          <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="mb-3 flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-[#0F4C5C]" />
              <h2 className="text-lg font-bold text-slate-900">
                Explore Properties on the Map
              </h2>
            </div>

            <p className="mb-4 text-sm text-slate-500">
              Select a marker to view a property. Some markers may show
              approximate city locations if exact coordinates are unavailable.
            </p>

            <PropertyMap properties={properties} height="380px" />
          </div>
        </div>
      )}
    </div>
  );
}
