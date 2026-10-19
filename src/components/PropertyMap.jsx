
"use client";

import dynamic from "next/dynamic";

const PropertyMapInner = dynamic(
  () => import("./PropertyMapInner"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center rounded-xl bg-gray-100 text-gray-600"
        style={{ height: "400px" }}>
        Loading property map...
      </div>
    ),
  }
);

export default function PropertyMap({ properties = [], height = "500px" }) {
  return (
    <div style={{ height, width: "100%" }}>
      <PropertyMapInner properties={properties} />
    </div>
  );
}
