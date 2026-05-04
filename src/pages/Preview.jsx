import { useEffect, useState } from "react";
import { ArrowLeft, Download, Heart, MoreHorizontal } from "lucide-react";

export default function Preview({ wallpaper, isFavorite, onBack, onToggleFavorite, setToast }) {
  const [source, setSource] = useState(wallpaper.full);

  useEffect(() => {
    setSource(wallpaper.full);
  }, [wallpaper.full]);

  return (
    <section className="relative h-screen min-h-[760px] overflow-hidden bg-black sm:h-[860px]">
      <img
        src={source}
        alt={wallpaper.title}
        className="absolute inset-0 h-full w-full object-cover"
        onError={() => {
          if (wallpaper.fallbackFull && source !== wallpaper.fallbackFull) {
            setSource(wallpaper.fallbackFull);
          }
        }}
      />
      <span className="absolute inset-0 bg-gradient-to-b from-black/42 via-transparent to-black/88" />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pt-[calc(env(safe-area-inset-top)+18px)]">
        <button className="preview-button" aria-label="Back" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-3">
          <button className="preview-button" aria-label="Favorite" onClick={onToggleFavorite}>
            <Heart className={`h-6 w-6 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
          </button>
          <button className="preview-button" aria-label="More">
            <MoreHorizontal className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="absolute inset-x-4 bottom-[calc(env(safe-area-inset-bottom)+22px)] z-10 rounded-[24px] border border-white/12 bg-panel/82 p-4 shadow-card backdrop-blur-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold">{wallpaper.title}</h1>
            <p className="mt-1 text-xs text-white/70">{wallpaper.resolution} · 4K</p>
          </div>
          <span className="rounded-full bg-accent/40 px-3 py-1 text-[11px] font-medium text-purple-100">
            {wallpaper.featured ? "Featured" : wallpaper.category}
          </span>
        </div>
        <p className="mt-3 text-xs text-white/58">{wallpaper.category} / {wallpaper.tags.slice(0, 2).join(", ")}</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <a
            href={source}
            download={`${wallpaper.id}.jpg`}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accentHot text-sm font-bold shadow-neon transition active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            Download
          </a>
          <button
            className="h-12 rounded-xl border border-white/12 bg-white/8 text-sm font-bold transition active:scale-[0.98]"
            onClick={() => setToast("Wallpaper saved. Set it from your gallery.")}
          >
            Set as Wallpaper
          </button>
        </div>
      </div>
    </section>
  );
}
