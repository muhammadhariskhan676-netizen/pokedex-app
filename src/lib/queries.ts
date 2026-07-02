import { fetchGraphQL } from "./graphql";
import type { PokemonDetail, PokemonSummary } from "./types";

// How many Pokemon to load. The brief asks for the first 151
// (the original Kanto Pokedex).
export const TOTAL_POKEMON = 151;

// Re-used field selection for the small "summary" version of a Pokemon.
// Used on the list page cards and on the evolution chain.
const SUMMARY_FIELDS = `
  id
  number
  name
  image
  types
`;

const LIST_QUERY = `
  query GetPokemonList($first: Int!) {
    pokemons(first: $first) {
      ${SUMMARY_FIELDS}
    }
  }
`;

const DETAIL_QUERY = `
  query GetPokemonDetail($name: String) {
    pokemon(name: $name) {
      ${SUMMARY_FIELDS}
      classification
      resistant
      weaknesses
      height {
        minimum
        maximum
      }
      weight {
        minimum
        maximum
      }
      fleeRate
      maxCP
      maxHP
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutionRequirements {
        amount
        name
      }
      evolutions {
        ${SUMMARY_FIELDS}
      }
    }
  }
`;

/**
 * Fetches the first 151 Pokemon for the list page.
 * Only the fields the card grid needs are requested, to keep the
 * GraphQL request small.
 */
export async function getAllPokemon(): Promise<PokemonSummary[]> {
  const data = await fetchGraphQL<{ pokemons: PokemonSummary[] }>(
    LIST_QUERY,
    { first: TOTAL_POKEMON },
    // This data is basically static (it's the original 151 Pokemon), so
    // we cache it and only re-fetch once a day.
    60 * 60 * 24
  );

  return data.pokemons;
}

/**
 * Fetches one Pokemon (with all detail-page fields) by its name.
 * Returns null if no Pokemon with that name exists.
 */
export async function getPokemonByName(
  name: string
): Promise<PokemonDetail | null> {
  const data = await fetchGraphQL<{ pokemon: PokemonDetail | null }>(
    DETAIL_QUERY,
    { name },
    60 * 60 * 24
  );

  return data.pokemon;
}
