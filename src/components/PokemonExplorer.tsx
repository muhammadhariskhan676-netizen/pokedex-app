"use client";

import { useMemo, useState } from "react";
import SearchInput from "./SearchInput";
import TypeFilter, { ALL_TYPES_OPTION } from "./TypeFilter";
import PokemonGrid from "./PokemonGrid";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";
import type { PokemonSummary } from "@/lib/types";

interface PokemonExplorerProps {
  pokemon: PokemonSummary[];
}

const PAGE_SIZE = 20;

/**
 * This is the only "use client" component on the home page.
 * The page itself (page.tsx) is a Server Component that fetches the
 * 151 Pokemon and passes them in as a prop. Everything below this point
 * is interactive (typing in a search box, picking a type, changing
 * pages) so it has to run on the client - but the actual data fetch
 * never has to happen in the browser.
 */
export default function PokemonExplorer({ pokemon }: PokemonExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(ALL_TYPES_OPTION);
  const [currentPage, setCurrentPage] = useState(1);

  // Re-run the filter whenever the list, search term, or type changes.
  // useMemo just avoids redoing this work on every unrelated re-render.
  const filteredPokemon = useMemo(() => {
    const lowerCaseSearch = searchTerm.trim().toLowerCase();

    return pokemon.filter((p) => {
      const matchesName = p.name.toLowerCase().includes(lowerCaseSearch);
      const matchesType =
        selectedType === ALL_TYPES_OPTION || p.types.includes(selectedType);
      return matchesName && matchesType;
    });
  }, [pokemon, searchTerm, selectedType]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPokemon.length / PAGE_SIZE)
  );

  // Keep currentPage in range in case a search/filter shrinks the
  // result list while the user is on, say, page 4.
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pageOfPokemon = filteredPokemon.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  function handleSearchChange(value: string) {
    setSearchTerm(value);
    setCurrentPage(1); // start back on page 1 for a new search
  }

  function handleTypeChange(value: string) {
    setSelectedType(value);
    setCurrentPage(1); // start back on page 1 for a new filter
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput value={searchTerm} onChange={handleSearchChange} />
        <TypeFilter value={selectedType} onChange={handleTypeChange} />
      </div>

      <p className="mt-4 text-sm text-stone-500">
        Showing {filteredPokemon.length} of {pokemon.length} Pokemon
      </p>

      <div className="mt-4">
        {pageOfPokemon.length > 0 ? (
          <PokemonGrid pokemon={pageOfPokemon} />
        ) : (
          <EmptyState />
        )}
      </div>

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
