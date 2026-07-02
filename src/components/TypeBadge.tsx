import { getTypeStyle } from "@/lib/type-colors";

interface TypeBadgeProps {
  type: string;
  // "sm" is used on cards, "md" is used on the detail page
  size?: "sm" | "md";
}

export default function TypeBadge({ type, size = "sm" }: TypeBadgeProps) {
  const style = getTypeStyle(type);
  const Icon = style.icon;

  const sizeClasses =
    size === "sm" ? "text-xs px-2 py-0.5 gap-1" : "text-sm px-3 py-1 gap-1.5";
  const iconSize = size === "sm" ? 12 : 14;

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${style.bg} ${style.text} ${sizeClasses}`}
    >
      <Icon size={iconSize} aria-hidden="true" />
      {type}
    </span>
  );
}
