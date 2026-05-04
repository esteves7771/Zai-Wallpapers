import Header from "../components/Header.jsx";
import WallpaperCard from "../components/WallpaperCard.jsx";
import { useEffect, useState } from "react";

export default function Home({ wallpapers, favorites, toggleFavorite, openPreview, openCollection }) {
  const daily = wallpapers.find((wallpaper) => wallpaper.daily) || wallpapers[0];
  const [dailyImage, setDailyImage] = useState(daily.thumb);

  useEffect(() => {
    setDailyImage(daily.thumb);
  }, [daily.thumb]);
  const trending = wallpapers.filter((wallpaper) => wallpaper.featured).slice(0, 6);
  const darkVibes = wallpapers
    .filter((wallpaper) => wallpaper.category.includes("Dark") || wallpaper.tags.includes("dark"))
    .concat(wallpapers.filter((wallpaper) => wallpaper.category === "Fantasy"))
    .slice(0, 6);

  return (
    <section className="screen-scroll">
      <Header title="Wallpapers" accentWord="Zai" />
      <div className="space-y-6 px-4 pb-28">
        <button
          className="relative h-[128px] w-full overflow-hidden rounded-[22px] border border-white/12 bg-panelSoft text-left shadow-neon"
          onClick={() => openPreview(daily)}
        >
          <img
            src={dailyImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => {
              if (daily.fallbackThumb && dailyImage !== daily.fallbackThumb) {
                setDailyImage(daily.fallbackThumb);
              }
            }}
          />
          <span className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/40 to-transparent" />
          <span className="relative z-10 flex h-full max-w-[60%] flex-col justify-center px-4">
            <span className="text-base font-bold">Daily Wallpaper</span>
            <span className="mt-1 text-xs text-white/75">New drop every day</span>
            <span className="mt-4 w-fit rounded-xl bg-gradient-to-r from-accent to-accentHot px-4 py-2 text-xs font-bold shadow-neon">
              View Today
            </span>
          </span>
        </button>

        <WallpaperSection
          title="Trending Now"
          flame
          wallpapers={trending}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          openPreview={openPreview}
          onSeeAll={() =>
            openCollection({
              title: "Trending Now",
              items: wallpapers.filter((wallpaper) => wallpaper.featured),
              backTo: "home",
              tab: "home"
            })
          }
        />

        <WallpaperSection
          title="Dark Vibes"
          wallpapers={darkVibes}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          openPreview={openPreview}
          onSeeAll={() =>
            openCollection({
              title: "Dark Vibes",
              items: wallpapers.filter(
                (wallpaper) =>
                  wallpaper.category.includes("Dark") ||
                  wallpaper.tags.includes("dark") ||
                  wallpaper.category === "Fantasy"
              ),
              backTo: "home",
              tab: "home"
            })
          }
        />
      </div>
    </section>
  );
}

function WallpaperSection({ title, flame, wallpapers, favorites, toggleFavorite, openPreview, onSeeAll }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[17px] font-bold">
          {title} {flame ? <span>🔥</span> : null}
        </h2>
        <button className="text-xs font-medium text-purple-300" onClick={onSeeAll}>
          See All
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {wallpapers.map((wallpaper) => (
          <WallpaperCard
            key={wallpaper.id}
            wallpaper={wallpaper}
            isFavorite={favorites.has(wallpaper.id)}
            onOpen={() => openPreview(wallpaper)}
            onFavorite={() => toggleFavorite(wallpaper.id)}
          />
        ))}
      </div>
    </section>
  );
}
