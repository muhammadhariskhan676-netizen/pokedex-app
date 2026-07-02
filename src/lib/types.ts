// These types describe the shape of the data that comes back from the
// public GraphQL Pokemon API: https://graphql-pokemon.vercel.app/
// I figured these out by reading the API's schema and trying queries.

// A min/max pair, used for both height and weight
export interface PokemonDimension {
  minimum: string;
  maximum: string;
}

// A single attack a Pokemon can use
export interface Attack {
  name: string;
  type: string;
  damage: number;
}

// Fast attacks and special attacks
export interface PokemonAttacks {
  fast: Attack[];
  special: Attack[];
}

// How much candy / what is needed for this Pokemon to evolve
export interface EvolutionRequirement {
  amount: number;
  name: string;
}

// The small amount of info we need for cards in the list page
// and for the "evolves into" list on the detail page.
export interface PokemonSummary {
  id: string;
  number: string;
  name: string;
  image: string;
  types: string[];
}

// The full info we need on the detail page. It includes everything
// from PokemonSummary plus the extra stats.
export interface PokemonDetail extends PokemonSummary {
  classification: string;
  resistant: string[];
  weaknesses: string[];
  weight: PokemonDimension;
  height: PokemonDimension;
  fleeRate: number | null;
  maxCP: number | null;
  maxHP: number | null;
  attacks: PokemonAttacks;
  evolutionRequirements: EvolutionRequirement | null;
  evolutions: PokemonSummary[] | null;
}

// Shape of every response that comes back from the GraphQL endpoint
export interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}