import PokemonCard from "./PokemonCard";
import type { PokemonSummary } from "@/lib/types";

interface EvolutionListProps {
  // The API returns null instead of [] for Pokemon that don't evolve,
  // so we accept null here and handle it safely below.
  evolutions: PokemonSummary[] | null;
}

export default function EvolutionList({ evolutions }: EvolutionListProps) {
  // null OR empty array both mean "no evolutions"
  if (!evolutions || evolutions.length === 0) {
    return (
      <p className="text-sm text-stone-400">This Pokemon does not evolve.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {evolutions.map((evolution) => (
        <PokemonCard key={evolution.id} pokemon={evolution} />
      ))}
    </div>
  );
}