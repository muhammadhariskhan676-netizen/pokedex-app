import Link from "next/link";
import { TriangleAlert } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center">
      <TriangleAlert size={40} className="text-stone-300" aria-hidden="true" />
      <h1 className="mt-4 text-xl font-semibold text-stone-800">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-stone-500">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
      >
        Back to Pokedex
      </Link>
    </main>
  );
}
