import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function WallpaperCard({ wallpaper, isFavorite, onOpen, onFavorite, tall = false }) {
  const [source, setSource] = useState(wallpaper.thumb);

  useEffect(() => {
    setSource(wallpaper.thumb);
  }, [wallpaper.thumb]);

  return (
    <article
      className={`group relative overflow-hidden rounded-[18px] border border-white/10 bg-panelSoft shadow-card ${
        tall ? "aspect-[0.58]" : "aspect-[0.68]"
      }`}
    >
      <button className="absolute inset-0 z-0" aria-label={`Open ${wallpaper.title}`} onClick={onOpen}>
        <img
          src={source}
          alt={wallpaper.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => {
            if (wallpaper.fallbackThumb && source !== wallpaper.fallbackThumb) {
              setSource(wallpaper.fallbackThumb);
            }
          }}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
      </button>
      <button
        className="absolute right-2 top-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/28 text-white backdrop-blur-md transition active:scale-90"
        aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
        onClick={(event) => {
          event.stopPropagation();
          onFavorite();
        }}
      >
        <Heart className={`h-5 w-5 ${isFavorite ? "fill-rose-500 text-rose-500" : "text-white/70"}`} />
      </button>
    </article>
  );
}
