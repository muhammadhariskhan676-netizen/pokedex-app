import Image from "next/image";
import Link from "next/link";
import TypeBadge from "./TypeBadge";
import type { PokemonSummary } from "@/lib/types";

interface PokemonCardProps {
  pokemon: PokemonSummary;
  // The first few cards are above the fold so we eager-load them to
  // avoid a Largest Contentful Paint warning from Next.js.
  priority?: boolean;
}

export default function PokemonCard({ pokemon, priority = false }: PokemonCardProps) {
  return (
    <Link
      href={`/pokemon/${pokemon.name.toLowerCase()}`}
      className="group flex flex-col items-center rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      <span className="self-start text-xs font-semibold text-stone-400">
        #{pokemon.number}
      </span>

      <div className="relative h-24 w-24 sm:h-28 sm:w-28">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          fill
          sizes="(max-width: 640px) 96px, 112px"
          priority={priority}
          className="object-contain transition group-hover:scale-110"
        />
      </div>

      <h2 className="mt-2 text-center font-semibold text-stone-800">
        {pokemon.name}
      </h2>

      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
    </Link>
  );
}