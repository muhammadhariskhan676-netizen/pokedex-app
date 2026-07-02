import TypeBadge from "./TypeBadge";
import type { Attack } from "@/lib/types";

interface AttackListProps {
  title: string;
  attacks: Attack[];
}

export default function AttackList({ title, attacks }: AttackListProps) {
  if (attacks.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-stone-500">{title}</h3>
      <ul className="mt-2 space-y-2">
        {attacks.map((attack) => (
          <li
            key={attack.name}
            className="flex items-center justify-between rounded-lg border border-stone-200 bg-white px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <TypeBadge type={attack.type} />
              <span className="text-sm font-medium text-stone-700">
                {attack.name}
              </span>
            </div>
            <span className="text-sm text-stone-400">
              {attack.damage} dmg
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
