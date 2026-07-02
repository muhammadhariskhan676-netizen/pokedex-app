import PokemonExplorer from "@/components/PokemonExplorer";
import { getAllPokemon } from "@/lib/queries";

// force-dynamic means Next.js fetches fresh data on every request
// instead of trying to call the API at build time.
// For a real Vercel deployment you'd remove this line (or swap it for
// `export const revalidate = 86400`) and let Next.js cache the result.
export const dynamic = "force-dynamic";

// This page is a Server Component. It fetches the 151 Pokemon on the
// server and passes the finished array as a prop to PokemonExplorer.
// That means the browser never has to make its own API call - it just
// receives the pre-fetched HTML.
export default async function HomePage() {
  const pokemon = await getAllPokemon();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-stone-800">Pokedex</h1>
      <p className="mt-1 text-stone-500">
        Browse, search, and filter the original 151 Pokemon.
      </p>

      <div className="mt-6">
        {/* PokemonExplorer is the only Client Component on this page.
            It owns the search, filter, and pagination state. */}
        <PokemonExplorer pokemon={pokemon} />
      </div>
    </main>
  );
}
