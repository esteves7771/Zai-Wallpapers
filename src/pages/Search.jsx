import { Search as SearchIcon, X } from "lucide-react";
import { useMemo, useState } from "react";
import WallpaperCard from "../components/WallpaperCard.jsx";

const chips = ["Cyberpunk", "Anime", "Dark", "Minimal", "Nature", "Cars", "4K", "Neon"];

export default function Search({ wallpapers, favorites, toggleFavorite, openPreview }) {
  const [query, setQuery] = useState("cyberpunk");

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return wallpapers;
    return wallpapers.filter((wallpaper) => {
      const target = [wallpaper.title, wallpaper.category, ...wallpaper.tags].join(" ").toLowerCase();
      return target.includes(term);
    });
  }, [query, wallpapers]);

  return (
    <section className="screen-scroll">
      <div className="flex items-center gap-3 px-4 pb-5 pt-[calc(env(safe-area-inset-top)+18px)]">
        <label className="flex h-11 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-panel px-3 text-white shadow-inner">
          <SearchIcon className="h-5 w-5 text-white/75" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search wallpapers"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/45"
          />
          {query && (
            <button aria-label="Clear search" onClick={() => setQuery("")}>
              <X className="h-4 w-4 text-white/70" />
            </button>
          )}
        </label>
        <button className="text-sm font-medium text-purple-300" onClick={() => setQuery("")}>
          Cancel
        </button>
      </div>

      <div className="space-y-6 px-4 pb-28">
        <section>
          <h2 className="mb-3 text-[15px] font-bold">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <button
                key={chip}
                className="rounded-full border border-white/10 bg-panelSoft px-4 py-2 text-xs text-white/92 transition hover:border-purple-400/40"
                onClick={() => setQuery(chip.toLowerCase())}
              >
                {chip}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-[15px] font-bold">
            Results {query ? `for "${query}"` : ""}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {results.map((wallpaper) => (
              <WallpaperCard
                key={wallpaper.id}
                wallpaper={wallpaper}
                isFavorite={favorites.has(wallpaper.id)}
                onOpen={() => openPreview(wallpaper)}
                onFavorite={() => toggleFavorite(wallpaper.id)}
                tall
              />
            ))}
          </div>
          {!results.length && (
            <div className="mt-8 rounded-[22px] border border-white/10 bg-panel p-6 text-center text-sm text-white/62">
              No wallpapers found.
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
