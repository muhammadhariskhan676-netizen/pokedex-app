interface PokeballIconProps {
  size?: number;
  className?: string;
}

// A hand-drawn pokeball icon. lucide-react doesn't have a pokeball, so
// this is a small inline SVG instead of using an emoji.
export default function PokeballIcon({
  size = 24,
  className = "",
}: PokeballIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M2 12h6.5" stroke="currentColor" strokeWidth="2" />
      <path d="M15.5 12H22" stroke="currentColor" strokeWidth="2" />
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
