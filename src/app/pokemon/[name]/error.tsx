"use client";

import { TriangleAlert } from "lucide-react";
import BackButton from "@/components/BackButton";

interface PokemonErrorProps {
  error: Error;
  reset: () => void;
}

export default function PokemonError({ error, reset }: PokemonErrorProps) {
  return (
    <main className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center">
      <TriangleAlert size={40} className="text-red-500" aria-hidden="true" />
      <h1 className="mt-4 text-xl font-semibold text-stone-800">
        Couldn&apos;t load this Pokemon
      </h1>
      <p className="mt-2 max-w-md text-stone-500">
        {error.message || "Something went wrong talking to the Pokemon API."}
      </p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Try again
        </button>
        <BackButton />
      </div>
    </main>
  );
}
