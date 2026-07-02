import type { GraphQLResponse } from "./types";

// The PDF listed graphql-pokemon.vercel.app but that now returns 405.
// The maintained version of the same API lives at graphql-pokemon2.vercel.app
// — same schema, same queries, same fields, just a newer deployment.
const POKEMON_API_URL = "https://graphql-pokemon2.vercel.app/";

/**
 * Sends a GraphQL query to the Pokemon API and returns the typed data.
 *
 * I went with a simple hand-written fetch wrapper instead of Apollo or
 * urql. For a small read-only app like this we only need a handful of
 * queries and no caching/mutations features those libraries are built
 * for, so a small function keeps the project easy to follow.
 *
 * `revalidateSeconds` is passed straight to Next.js's fetch cache so we
 * can control the data-fetching strategy per query (see the README for
 * why each page uses the value it uses).
 */
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidateSeconds?: number
): Promise<T> {
  const response = await fetch(POKEMON_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    // Next.js specific caching option. If a number is given, the result
    // is cached and re-fetched in the background after that many seconds
    // (this is "ISR" - Incremental Static Regeneration).
    next:
      revalidateSeconds !== undefined
        ? { revalidate: revalidateSeconds }
        : undefined,
  });

  if (!response.ok) {
    throw new Error(
      `Pokemon API request failed with status ${response.status}`
    );
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }

  if (!result.data) {
    throw new Error("Pokemon API did not return any data");
  }

  return result.data;
}
