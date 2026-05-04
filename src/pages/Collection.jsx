import { ArrowLeft } from "lucide-react";
import WallpaperCard from "../components/WallpaperCard.jsx";

export default function Collection({ title, wallpapers, favorites, toggleFavorite, openPreview, onBack }) {
  return (
    <section className="screen-scroll">
      <header className="flex items-center gap-3 px-4 pb-4 pt-[calc(env(safe-area-inset-top)+18px)]">
        <button className="tap-button" aria-label="Back" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-[22px] font-bold tracking-tight">{title}</h1>
          <p className="mt-0.5 text-xs text-white/55">{wallpapers.length} wallpapers</p>
        </div>
      </header>
      <div className="grid grid-cols-3 gap-3 px-4 pb-28">
        {wallpapers.map((wallpaper) => (
          <WallpaperCard
            key={wallpaper.id}
            wallpaper={wallpaper}
            isFavorite={favorites.has(wallpaper.id)}
            onOpen={() => openPreview(wallpaper, "collection")}
            onFavorite={() => toggleFavorite(wallpaper.id)}
            tall
          />
        ))}
      </div>
    </section>
  );
}
