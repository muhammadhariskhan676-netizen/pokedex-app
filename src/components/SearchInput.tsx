import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

// This component does not need its own "use client" directive.
// It only gets used inside PokemonExplorer, which is already a
// Client Component, so this one is automatically part of that
// client boundary too.
export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative w-full sm:w-64">
      <Search
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search Pokemon by name..."
        aria-label="Search Pokemon by name"
        className="w-full rounded-lg border border-stone-300 bg-white py-2 pl-9 pr-3 text-sm text-stone-800 placeholder:text-stone-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
      />
    </div>
  );
}
