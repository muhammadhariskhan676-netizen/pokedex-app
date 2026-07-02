import PokemonCard from "./PokemonCard";
import type { PokemonSummary } from "@/lib/types";

interface PokemonGridProps {
  pokemon: PokemonSummary[];
}

export default function PokemonGrid({ pokemon }: PokemonGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {pokemon.map((p, index) => (
        // Mark the first 10 cards as priority so Next.js eagerly loads
        // their images. These are always above the fold on any screen size.
        <PokemonCard key={p.id} pokemon={p} priority={index < 10} />
      ))}
    </div>
  );
}