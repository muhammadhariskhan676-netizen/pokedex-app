import { ALL_TYPES } from "@/lib/type-colors";

interface TypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const ALL_TYPES_OPTION = "All";

export default function TypeFilter({ value, onChange }: TypeFilterProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Filter Pokemon by type"
      className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:w-44"
    >
      <option value={ALL_TYPES_OPTION}>All types</option>
      {ALL_TYPES.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
}

export { ALL_TYPES_OPTION };
