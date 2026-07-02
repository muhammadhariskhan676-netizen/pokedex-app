import PokeballIcon from "@/components/PokeballIcon";

export default function PokemonLoading() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 text-stone-500">
        <PokeballIcon size={22} className="animate-spin" />
        <span>Loading Pokemon...</span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="h-80 animate-pulse rounded-xl border border-stone-200 bg-white" />
        <div className="h-80 animate-pulse rounded-xl border border-stone-200 bg-white" />
      </div>
    </main>
  );
}
