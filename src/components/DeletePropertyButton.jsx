"use client";

import { useTransition } from "react";

export default function DeletePropertyButton({
  action,
}) {
  const [pending, startTransition] =
    useTransition();

  return (
    <button
      onClick={() => {
        if (
          confirm(
            "Are you sure you want to delete this property?"
          )
        ) {
          startTransition(() => {
            action();
          });
        }
      }}
      className="
        bg-red-600
        text-white
        px-3
        py-2
        rounded-lg
      "
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}