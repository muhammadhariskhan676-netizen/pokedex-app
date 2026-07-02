interface StatBarProps {
  label: string;
  value: number;
  // The value that should make the bar 100% full. Max CP and Max HP
  // use different scales, so this is passed in per stat.
  maxScale: number;
  barColorClass?: string;
}

export default function StatBar({
  label,
  value,
  maxScale,
  barColorClass = "bg-red-500",
}: StatBarProps) {
  // Clamp between 0 and 100 so a stat that is somehow bigger than our
  // chosen scale doesn't break the layout.
  const percentage = Math.min(100, Math.max(0, (value / maxScale) * 100));

  return (
    <div>
      <div className="flex justify-between text-sm text-stone-600">
        <span>{label}</span>
        <span className="font-semibold text-stone-800">{value}</span>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-stone-200">
        <div
          className={`h-full rounded-full ${barColorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
