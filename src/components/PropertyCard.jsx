"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  BedDouble,
  Bath,
  Ruler,
  MapPin,
  ArrowUpRight,
  Star,
} from "lucide-react";

const FALLBACK_IMAGE = "/images/realestate.jpg";

function formatPrice(value) {
  const price = Number(value);
  if (!Number.isFinite(price) || price <= 0) return "Price on request";

  const trim = (n) => n.toFixed(2).replace(/\.?0+$/, "");

  if (price >= 1e7) return `PKR ${trim(price / 1e7)} Crore`;
  if (price >= 1e5) return `PKR ${trim(price / 1e5)} Lakh`;
  return `PKR ${price.toLocaleString("en-PK")}`;
}

function getGallery(property) {
  const fromArray = Array.isArray(property?.images)
    ? property.images.filter((src) => typeof src === "string" && src.trim())
    : [];

  if (fromArray.length) return fromArray;
  if (typeof property?.image === "string" && property.image.trim()) {
    return [property.image];
  }
  return [FALLBACK_IMAGE];
}

export default function PropertyCard({ property }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState({});

  if (!property) return null;

  const gallery = getGallery(property);
  const total = gallery.length;
  const safeIndex = index < total ? index : 0; // guards against gallery shrinking
  const src = failed[safeIndex] ? FALLBACK_IMAGE : gallery[safeIndex];
  const href = `/properties/${property.id}`;

  const step = (direction) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIndex((current) => (current + direction + total) % total);
  };

  const hasBeds = property.bedrooms != null && property.bedrooms !== "";
  const hasBaths = property.bathrooms != null && property.bathrooms !== "";
  const hasArea = property.area != null && property.area !== "";
  const hasSpecs = hasBeds || hasBaths || hasArea;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8E5DD] bg-white shadow-sm transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(15,76,92,0.14)] motion-reduce:transition-none">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F1F0EC]">
        <Image
          src={src}
          alt={property.title || "Property photo"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
          onError={() => setFailed((prev) => ({ ...prev, [safeIndex]: true }))}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071E24]/70 via-transparent to-transparent" />

        {/* Badge */}
        <div className="pointer-events-none absolute left-3 top-3">
          {property.featured ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#0F4C5C] px-2.5 py-1 text-xs font-semibold text-[#F0D590] shadow">
              <Star size={12} fill="currentColor" />
              Featured
            </span>
          ) : (
            <span className="rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium capitalize text-white backdrop-blur-sm">
              {property.propertyType || "Property"}
            </span>
          )}
        </div>

        {/* Gallery controls (sit above the card link) */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={step(-1)}
              aria-label="Previous photo"
              className="absolute left-2.5 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0F4C5C] shadow transition hover:bg-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C5C] sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={step(1)}
              aria-label="Next photo"
              className="absolute right-2.5 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0F4C5C] shadow transition hover:bg-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C5C] sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
            >
              <ChevronRight size={18} />
            </button>
            <span
              className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/45 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm"
              aria-live="polite"
            >
              {safeIndex + 1}/{total}
            </span>
          </>
        )}

        {/* Price */}
        <p className="pointer-events-none absolute bottom-3 left-4 right-4 text-xl font-bold tracking-tight text-white drop-shadow sm:text-2xl">
          {formatPrice(property.price)}
        </p>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-[#172F34]">
          {/* Stretched link: the whole card is clickable, but there is only one link for screen readers */}
          <Link
            href={href}
            className="outline-none after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-[#0F4C5C]"
          >
            {property.title || "Untitled property"}
          </Link>
        </h3>

        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin size={14} className="shrink-0 text-[#C89B3C]" />
          <span className="truncate">
            {property.city || "Location on request"}
          </span>
        </p>

        {hasSpecs && (
          <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#EEECE6] pt-4 text-sm text-slate-600">
            {hasBeds && (
              <li className="flex items-center gap-1.5">
                <BedDouble size={16} className="text-[#0F4C5C]" />
                {property.bedrooms} {Number(property.bedrooms) === 1 ? "bed" : "beds"}
              </li>
            )}
            {hasBaths && (
              <li className="flex items-center gap-1.5">
                <Bath size={16} className="text-[#0F4C5C]" />
                {property.bathrooms} {Number(property.bathrooms) === 1 ? "bath" : "baths"}
              </li>
            )}
            {hasArea && (
              <li className="flex items-center gap-1.5">
                <Ruler size={16} className="text-[#0F4C5C]" />
                {property.area} {property.areaUnit || "sq yd"}
              </li>
            )}
          </ul>
        )}

        {/* Visual button only; the title link handles the click */}
        <span
          aria-hidden="true"
          className="mt-auto flex items-center justify-center gap-1.5 rounded-xl bg-[#F7F6F2] px-4 py-2.5 text-sm font-semibold text-[#0F4C5C] transition-colors duration-200 group-hover:bg-[#0F4C5C] group-hover:text-white motion-reduce:transition-none"
          style={{ marginTop: hasSpecs ? "1rem" : "auto" }}
        >
          View details
          <ArrowUpRight size={16} />
        </span>
      </div>
    </article>
  );
}
