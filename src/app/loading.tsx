import PokeballIcon from "@/components/PokeballIcon";

// Next.js automatically shows this file while page.tsx (in the same
// folder) is fetching data on the server, so we don't need to manage
// any loading state ourselves.
export default function HomeLoading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center gap-3 text-stone-500">
        <PokeballIcon size={22} className="animate-spin" />
        <span>Loading Pokedex...</span>
      </div>

      {/* Skeleton cards so the page doesn't jump around once real data
          arrives - just plain gray placeholder boxes. */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-xl border border-stone-200 bg-white"
          />
        ))}
      </div>
    </main>
  );
}
