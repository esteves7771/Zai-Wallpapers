import Header from "../components/Header.jsx";
import WallpaperCard from "../components/WallpaperCard.jsx";

export default function Favorites({ wallpapers, favorites, toggleFavorite, openPreview }) {
  const favoriteWallpapers = wallpapers.filter((wallpaper) => favorites.has(wallpaper.id));

  return (
    <section className="screen-scroll">
      <Header title="Favorites" right="edit" />
      <div className="px-4 pb-28">
        {favoriteWallpapers.length ? (
          <div className="grid grid-cols-3 gap-3">
            {favoriteWallpapers.map((wallpaper) => (
              <WallpaperCard
                key={wallpaper.id}
                wallpaper={wallpaper}
                isFavorite
                onOpen={() => openPreview(wallpaper)}
                onFavorite={() => toggleFavorite(wallpaper.id)}
                tall
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-[24px] border border-white/10 bg-panel p-8 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent/20 text-2xl">♡</div>
            <h2 className="mt-5 text-lg font-bold">No favorites yet</h2>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Tap a heart on any wallpaper to save it here after refresh.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
