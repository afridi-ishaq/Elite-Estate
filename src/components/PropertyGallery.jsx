"use client";

import { useState } from "react";

export default function PropertyGallery({ images = [] }) {
  const [selected, setSelected] = useState(images?.[0]);
  const activeImage = selected || images?.[0];

  if (!images.length) return null;

  return (
    <div className="w-full">
      {/* Main Preview Image */}
      <div className="w-full aspect-[4/3] relative overflow-hidden rounded-2xl">
        <img
          src={activeImage}
          alt="Property"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 mt-3 w-full">
          {images.slice(0, 4).map((image, index) => {
            const isSelected = activeImage === image;

            return (
              <button
                type="button"
                key={index}
                onClick={() => setSelected(image)}
                className={`
                  relative aspect-square w-full rounded-xl overflow-hidden border-2 transition-all
                  ${
                    isSelected
                      ? "border-[#0F4C5C] ring-2 ring-[#0F4C5C]/20"
                      : "border-transparent opacity-75 hover:opacity-100"
                  }
                `}
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}