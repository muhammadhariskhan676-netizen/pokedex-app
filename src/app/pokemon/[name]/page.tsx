import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import TypeBadge from "@/components/TypeBadge";
import StatBar from "@/components/StatBar";
import AttackList from "@/components/AttackList";
import EvolutionList from "@/components/EvolutionList";
import BackButton from "@/components/BackButton";
import { getPokemonByName } from "@/lib/queries";

// Rough "feels full" ceilings for the stat bars.
const MAX_CP_SCALE = 4000;
const MAX_HP_SCALE = 3000;

// dynamicParams = true (which is the Next.js default) means: if someone
// visits a URL we didn't pre-render, generate it on the fly and cache it.
// We don't use generateStaticParams here because the sandbox cannot
// reach the API at build time. On a real Vercel deployment you could
// add generateStaticParams back to pre-render all 151 pages.
export const dynamicParams = true;

interface PokemonPageProps {
  params: Promise<{ name: string }>;
}

// Sets the <title> and <meta description> for each Pokemon's page.
// The brief specifically asks the title to include the Pokemon's name.
export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  const { name } = await params;
  const pokemon = await getPokemonByName(name);

  if (!pokemon) {
    return { title: "Pokemon not found" };
  }

  return {
    title: pokemon.name,
    description: `${pokemon.name} is a ${pokemon.classification}. View its types, stats, weaknesses, attacks, and evolutions.`,
  };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { name } = await params;
  const pokemon = await getPokemonByName(name);

  // If the name in the URL doesn't match any Pokemon, show the
  // not-found page instead of crashing.
  if (!pokemon) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <BackButton />

      <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left column: image and identity */}
        <div className="flex flex-col items-center rounded-xl border border-stone-200 bg-white p-6">
          <span className="text-sm font-semibold text-stone-400">
            #{pokemon.number}
          </span>
          <div className="relative mt-2 h-48 w-48">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              fill
              sizes="192px"
              priority
              className="object-contain"
            />
          </div>
          <h1 className="mt-2 text-2xl font-bold text-stone-800">
            {pokemon.name}
          </h1>
          <p className="text-stone-500">{pokemon.classification}</p>

          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} size="md" />
            ))}
          </div>

          <dl className="mt-6 grid w-full grid-cols-2 gap-4 text-center text-sm">
            <div>
              <dt className="text-stone-400">Height</dt>
              <dd className="font-medium text-stone-700">
                {pokemon.height.minimum} – {pokemon.height.maximum}
              </dd>
            </div>
            <div>
              <dt className="text-stone-400">Weight</dt>
              <dd className="font-medium text-stone-700">
                {pokemon.weight.minimum} – {pokemon.weight.maximum}
              </dd>
            </div>
          </dl>
        </div>

        {/* Right column: combat stats, weaknesses, resistances */}
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <h2 className="font-semibold text-stone-800">Combat stats</h2>
            <div className="mt-4 flex flex-col gap-4">
              {pokemon.maxCP !== null && (
                <StatBar
                  label="Max CP"
                  value={pokemon.maxCP}
                  maxScale={MAX_CP_SCALE}
                />
              )}
              {pokemon.maxHP !== null && (
                <StatBar
                  label="Max HP"
                  value={pokemon.maxHP}
                  maxScale={MAX_HP_SCALE}
                  barColorClass="bg-green-500"
                />
              )}
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <h2 className="font-semibold text-stone-800">Weaknesses</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {pokemon.weaknesses.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>

            <h2 className="mt-5 font-semibold text-stone-800">Resistant to</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {pokemon.resistant.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Attacks */}
      <section className="mt-8 rounded-xl border border-stone-200 bg-white p-6">
        <h2 className="font-semibold text-stone-800">Attacks</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <AttackList title="Fast attacks" attacks={pokemon.attacks.fast} />
          <AttackList
            title="Special attacks"
            attacks={pokemon.attacks.special}
          />
        </div>
      </section>

      {/* Evolutions */}
      <section className="mt-8">
        <h2 className="font-semibold text-stone-800">Evolutions</h2>
        {pokemon.evolutionRequirements && (
          <p className="mt-1 text-sm text-stone-500">
            Needs {pokemon.evolutionRequirements.amount}{" "}
            {pokemon.evolutionRequirements.name} to evolve.
          </p>
        )}
        <div className="mt-3">
          <EvolutionList evolutions={pokemon.evolutions} />
        </div>
      </section>
    </main>
  );
}
