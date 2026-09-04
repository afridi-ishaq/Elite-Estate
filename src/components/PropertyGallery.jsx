"use client";

import { useState } from "react";

export default function PropertyGallery({
  images,
}) {
  const [selected, setSelected] =
    useState(images?.[0]);

  return (
    <div>
      <img
        src={selected}
        alt=""
        className="
          w-full
          h-[500px]
          object-cover
          rounded-3xl
        "
      />

      <div className="grid grid-cols-4 gap-3 mt-4">
        {images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            onClick={() =>
              setSelected(image)
            }
            className="
              h-24
              w-full
              object-cover
              rounded-xl
              cursor-pointer
              border
            "
          />
        ))}
      </div>
    </div>
  );
}