"use client";

import { useTransition } from "react";

export default function DeletePropertyButton({ action }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={pending}
      onClick={() => {
        if (
          confirm("Are you sure you want to delete this property?")
        ) {
          startTransition(() => {
            action();
          });
        }
      }}
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        bg-red-600
        hover:bg-red-700
        active:bg-red-800
        disabled:opacity-50
        disabled:cursor-not-allowed
        text-white
        text-sm
        font-medium
        px-3.5
        py-2
        rounded-lg
        transition-colors
        duration-150
        shadow-sm
      "
    >
      {pending ? (
        <>
          {/* Loading Spinner Icon */}
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Deleting...</span>
        </>
      ) : (
        <>
          {/* Trash Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
          <span>Delete</span>
        </>
      )}
    </button>
  );
}