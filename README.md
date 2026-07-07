# Pokedex App

A Pokedex web application built with Next.js (App Router) and TypeScript,
consuming the public GraphQL Pokemon API.

## Live URL

https://haris-pokedex-app.vercel.app

## How to install and run locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open http://localhost:3000 in your browser
```

Node.js 18+ is required (the project was built and tested on Node 22).

---

## Data-fetching strategy

### List page (`/`)

The list page is a **Server Component** marked `export const dynamic = "force-dynamic"`.
This means Next.js fetches all 151 Pokemon from the GraphQL API on the server
**at request time**, sends the finished HTML to the browser, and the browser
never has to make its own API call. The data is passed as a plain prop to
`PokemonExplorer` (the one Client Component on the page) which handles search,
filter, and pagination entirely in-memory — no extra network requests needed
when the user types.

For a production Vercel deployment I would remove `force-dynamic` and set
`export const revalidate = 86400` (re-fetch once a day) because the original
151 Pokemon essentially never change. I used `force-dynamic` here so the build
step can succeed without reaching the API (useful for CI/CD environments where
the API might be blocked).

### Detail page (`/pokemon/[name]`)

The detail page is also a **Server Component**, rendered **on demand** per
request. The first visitor for a given Pokemon triggers a server-side GraphQL
fetch; Next.js caches the result for 24 hours (`revalidate: 86400` inside
`fetchGraphQL`). Subsequent visitors within that window get the cached page
instantly. I chose this over build-time SSG (`generateStaticParams`) because
it keeps the build fast — there is no need to pre-render 151 pages at deploy
time when on-demand ISR gives the same performance after the first hit.

### Why a plain fetch wrapper instead of Apollo / urql?

The app only has two read-only queries and no mutations, subscriptions, or
reactive updates. Apollo Client and urql are powerful but add ~50 KB of
bundle and a lot of configuration that we don't need here. A typed `fetchGraphQL`
wrapper in `src/lib/graphql.ts` does everything we need in ~30 lines and is
easy to follow in a code walkthrough.

---

## Project structure

```
src/
  app/
    layout.tsx              # Root layout with header + footer
    page.tsx                # Home page (Server Component)
    loading.tsx             # Skeleton shown while home page loads
    error.tsx               # Error boundary for home page
    not-found.tsx           # Generic 404
    pokemon/[name]/
      page.tsx              # Detail page (Server Component)
      loading.tsx           # Skeleton shown while detail loads
      error.tsx             # Error boundary for detail page
      not-found.tsx         # Shown when Pokemon name is invalid

  components/
    AttackList.tsx          # Fast / special attack tables
    BackButton.tsx          # "Back" button (uses useRouter — Client Component)
    EmptyState.tsx          # "No results" message
    EvolutionList.tsx       # Grid of evolution cards
    Pagination.tsx          # Previous / next page controls
    PokeballIcon.tsx        # Inline SVG pokeball icon
    PokemonCard.tsx         # Card shown in the list grid
    PokemonExplorer.tsx     # Search + filter + pagination (Client Component)
    PokemonGrid.tsx         # Responsive card grid layout
    SearchInput.tsx         # Controlled search text input
    StatBar.tsx             # Horizontal bar for Max CP / Max HP
    TypeBadge.tsx           # Coloured pill showing one type
    TypeFilter.tsx          # Type dropdown filter

  lib/
    graphql.ts              # Typed fetch wrapper for the GraphQL API
    queries.ts              # getAllPokemon() and getPokemonByName()
    type-colors.ts          # Tailwind colours + Lucide icons per type
    types.ts                # TypeScript interfaces for all API responses
```

---

## Trade-offs and known issues

- **No `generateStaticParams`** — Detail pages are rendered on demand (ISR)
  instead of at build time. For a real deployment this is fine — the first
  visitor pays the cold-start cost and everyone after gets a cached page.
  Adding `generateStaticParams` back is a one-function change.

- **Sandbox network restriction** — The build environment used to build this
  zip blocks outbound connections to `graphql-pokemon.vercel.app`, which is
  why `force-dynamic` is set on the home page. On Vercel this restriction
  does not exist and both pages would work with ISR caching.

- **Images** — The image URL pattern is derived from the API's resolver
  (`https://img.pokemondb.net/artwork/<name>.jpg`). A small number of Pokemon
  with special characters in their names (e.g. `Mr. Mime`, `Farfetch'd`) may
  return a 404 from that image host; next/image will show a broken image in
  those cases. A real fix would be to use the official Pokemon sprite CDN.

- **Favorites** — Not implemented (optional bonus item). Would use
  `localStorage` with a simple `useState` + `useEffect` pattern.

- **Tests** — Not included due to time constraints (optional bonus item).

---

## Bonus items attempted

- **Type-colored UI** — Cards and badges are colored by Pokemon type with
  matching Lucide icons (Fire = orange flame, Water = blue droplet, etc.).
- **Accessibility** — `aria-label` on inputs, `aria-hidden` on decorative
  icons, semantic `<dl>`, `<nav>`, `<section>` elements, keyboard-accessible
  focus rings on all interactive elements.
