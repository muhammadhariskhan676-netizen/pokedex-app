"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// This needs "use client" because it uses the useRouter hook and an
// onClick handler - the rest of the detail page does not need this,
// so we keep it isolated to this one small component.
export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center gap-1 text-sm font-medium text-stone-500 transition hover:text-stone-800"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      Back to Pokedex
    </button>
  );
}
