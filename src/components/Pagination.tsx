import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pokemon list pages"
      className="mt-8 flex items-center justify-center gap-4"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={16} aria-hidden="true" />
        Previous
      </button>

      <span className="text-sm font-medium text-stone-600">
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </nav>
  );
}
