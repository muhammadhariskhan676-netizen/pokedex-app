import { SearchX } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = "No Pokemon match your search.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-stone-300 bg-white py-16 text-center">
      <SearchX size={40} className="text-stone-300" aria-hidden="true" />
      <p className="text-stone-500">{message}</p>
      <p className="text-sm text-stone-400">
        Try a different name or change the type filter.
      </p>
    </div>
  );
}
