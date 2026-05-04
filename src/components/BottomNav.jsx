import { Grid2X2, Heart, Home, Search } from "lucide-react";

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "categories", label: "Categories", icon: Grid2X2 },
  { id: "search", label: "Search", icon: Search },
  { id: "favorites", label: "Favorites", icon: Heart }
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed-nav absolute inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#08080d]/90 px-3 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 backdrop-blur-xl">
      <div className="grid grid-cols-4 gap-1">
        {items.map(({ id, label, icon: Icon }) => {
          const selected = active === id;
          return (
            <button
              key={id}
              className={`flex h-[50px] flex-col items-center justify-center gap-1 rounded-2xl text-[10px] transition ${
                selected ? "text-accentHot" : "text-white/82 hover:text-white"
              }`}
              onClick={() => onChange(id)}
            >
              <Icon className={`h-[21px] w-[21px] ${selected && id === "favorites" ? "fill-accentHot" : ""}`} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
