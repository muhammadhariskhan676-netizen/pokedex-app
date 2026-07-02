"use client";

import { TriangleAlert } from "lucide-react";

interface HomeErrorProps {
  error: Error;
  reset: () => void;
}

// error.tsx files must be Client Components, because Next.js needs to
// attach event handlers (like the "Try again" button below) to them.
export default function HomeError({ error, reset }: HomeErrorProps) {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center">
      <TriangleAlert size={40} className="text-red-500" aria-hidden="true" />
      <h1 className="mt-4 text-xl font-semibold text-stone-800">
        Something went wrong loading the Pokedex
      </h1>
      <p className="mt-2 max-w-md text-stone-500">
        {error.message || "The Pokemon API could not be reached."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
      >
        Try again
      </button>
    </main>
  );
}
