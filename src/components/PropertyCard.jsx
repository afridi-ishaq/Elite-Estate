"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Bed, Bath, Square, MapPin, ArrowUpRight } from "lucide-react";

export default function PropertyCard({ property }) {
  const images = property?.images?.length
    ? property.images
    : property?.image
    ? [property.image]
    : ["/placeholder.jpg"];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const formatPrice = (price) => {
    if (!price) return "Price on Request";
    if (price >= 10000000) return `PKR ${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `PKR ${(price / 100000).toFixed(2)} Lakh`;
    return `PKR ${price.toLocaleString()}`;
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* 1. Image Container (Fixed Height) */}
      <div className="relative w-full h-52 bg-gray-100 overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={property?.title || "Property"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dynamic Badge */}
        <div className="absolute top-3 left-3 z-10">
          {property?.featured ? (
            <span className="bg-[#0F4C5C] text-amber-300 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md uppercase shadow-md">
              FEATURED
            </span>
          ) : (
            <span className="bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md capitalize">
              {property?.propertyType || "House"}
            </span>
          )}
        </div>

        {/* Image Arrows */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handlePrev}
              className="w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Price Tag Overlay on Image */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-white font-bold text-sm">
          {formatPrice(property?.price)}
        </div>
      </div>

      {/* 2. Content Details Section */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-bold text-gray-900 text-base line-clamp-1 group-hover:text-[#0F4C5C] transition-colors">
            {property?.title || "Untitled Property"}
          </h3>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="truncate">{property?.city || "Location N/A"}</span>
          </p>
        </div>

        {/* Key Specs */}
        <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-gray-100 text-xs text-gray-600 font-medium">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-[#0F4C5C]" />
            <span>{property?.bedrooms || 0} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-[#0F4C5C]" />
            <span>{property?.bathrooms || 0} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="w-4 h-4 text-[#0F4C5C]" />
            <span>{property?.area || "—"} Sq Yd</span>
          </div>
        </div>

        {/* View Action Button */}
        <Link
          href={`/properties/${property?.id || "#"}`}
          className="w-full bg-gray-50 hover:bg-[#0F4C5C] text-gray-800 hover:text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all duration-200"
          style={{ hover: { backgroundColor: "#0F4C5C", color: "#fff" } }}
        >
          <span>View Details</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}