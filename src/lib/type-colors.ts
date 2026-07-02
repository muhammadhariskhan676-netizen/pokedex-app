import {
  Bug,
  Brain,
  CircleDot,
  Droplets,
  Flame,
  FlaskConical,
  Ghost,
  Gem,
  Leaf,
  Moon,
  Mountain,
  Shield,
  Snowflake,
  Sparkles,
  Swords,
  WandSparkles,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface TypeStyle {
  // tailwind background color class
  bg: string;
  // tailwind text color class (some light backgrounds need dark text)
  text: string;
  icon: LucideIcon;
}

// I picked colors that match what each type "feels like" in real life
// (fire = orange, water = blue, grass = green, electric = yellow, etc.)
// instead of random colors, so the grid reads naturally at a glance.
export const TYPE_STYLES: Record<string, TypeStyle> = {
  Normal: { bg: "bg-stone-400", text: "text-white", icon: CircleDot },
  Fire: { bg: "bg-orange-500", text: "text-white", icon: Flame },
  Water: { bg: "bg-blue-500", text: "text-white", icon: Droplets },
  Electric: { bg: "bg-yellow-400", text: "text-stone-900", icon: Zap },
  Grass: { bg: "bg-green-500", text: "text-white", icon: Leaf },
  Ice: { bg: "bg-cyan-300", text: "text-stone-900", icon: Snowflake },
  Fighting: { bg: "bg-red-700", text: "text-white", icon: Swords },
  Poison: { bg: "bg-purple-500", text: "text-white", icon: FlaskConical },
  Ground: { bg: "bg-amber-600", text: "text-white", icon: Mountain },
  Flying: { bg: "bg-indigo-300", text: "text-stone-900", icon: Wind },
  Psychic: { bg: "bg-pink-500", text: "text-white", icon: Brain },
  Bug: { bg: "bg-lime-500", text: "text-stone-900", icon: Bug },
  Rock: { bg: "bg-yellow-700", text: "text-white", icon: Gem },
  Ghost: { bg: "bg-violet-700", text: "text-white", icon: Ghost },
  Dragon: { bg: "bg-indigo-600", text: "text-white", icon: Sparkles },
  Dark: { bg: "bg-neutral-700", text: "text-white", icon: Moon },
  Steel: { bg: "bg-slate-400", text: "text-stone-900", icon: Shield },
  Fairy: { bg: "bg-pink-300", text: "text-stone-900", icon: WandSparkles },
};

// Fallback style for any type name the API returns that isn't in the
// list above, so the UI never crashes on an unexpected value.
const DEFAULT_TYPE_STYLE: TypeStyle = {
  bg: "bg-gray-400",
  text: "text-white",
  icon: CircleDot,
};

export function getTypeStyle(type: string): TypeStyle {
  return TYPE_STYLES[type] ?? DEFAULT_TYPE_STYLE;
}

// All known type names, used to build the type filter dropdown.
export const ALL_TYPES = Object.keys(TYPE_STYLES);
