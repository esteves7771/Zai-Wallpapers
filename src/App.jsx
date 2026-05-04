import { useEffect, useMemo, useState } from "react";
import BottomNav from "./components/BottomNav.jsx";
import Toast from "./components/Toast.jsx";
import Home from "./pages/Home.jsx";
import Categories from "./pages/Categories.jsx";
import Search from "./pages/Search.jsx";
import Preview from "./pages/Preview.jsx";
import Favorites from "./pages/Favorites.jsx";
import Collection from "./pages/Collection.jsx";
import { wallpapers } from "./data/wallpapers.js";

const FAVORITES_KEY = "zai-wallpaper-favorites";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [returnScreen, setReturnScreen] = useState("home");
  const [collection, setCollection] = useState({ title: "", wallpapers: [], backTo: "home", tab: "home" });
  const [selectedId, setSelectedId] = useState(wallpapers[0].id);
  const [toast, setToast] = useState("");
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);
  const selectedWallpaper = wallpapers.find((wallpaper) => wallpaper.id === selectedId) || wallpapers[0];

  const openPreview = (wallpaper, from = screen) => {
    setSelectedId(wallpaper.id);
    setReturnScreen(from);
    setScreen("preview");
  };

  const openCollection = ({ title, items, backTo = screen, tab = screen }) => {
    setCollection({ title, wallpapers: items, backTo, tab });
    setScreen("collection");
  };

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const sharedProps = {
    wallpapers,
    favorites: favoriteSet,
    toggleFavorite,
    openPreview,
    openCollection,
    setScreen,
    setToast
  };

  return (
    <main className="min-h-screen bg-oled text-white selection:bg-accent selection:text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl justify-center bg-[radial-gradient(circle_at_50%_-10%,rgba(139,92,246,0.18),transparent_34%),#05050A] sm:px-6 sm:py-8">
        <div className="app-shell relative min-h-screen w-full overflow-hidden bg-oled shadow-card sm:min-h-[860px] sm:max-w-[390px] sm:rounded-[34px] sm:border sm:border-white/15">
          {screen === "home" && <Home {...sharedProps} />}
          {screen === "categories" && <Categories {...sharedProps} />}
          {screen === "search" && <Search {...sharedProps} />}
          {screen === "collection" && (
            <Collection
              title={collection.title}
              wallpapers={collection.wallpapers}
              favorites={favoriteSet}
              toggleFavorite={toggleFavorite}
              openPreview={openPreview}
              onBack={() => setScreen(collection.backTo)}
            />
          )}
          {screen === "preview" && (
            <Preview
              wallpaper={selectedWallpaper}
              isFavorite={favoriteSet.has(selectedWallpaper.id)}
              onBack={() => setScreen(returnScreen)}
              onToggleFavorite={() => toggleFavorite(selectedWallpaper.id)}
              setToast={setToast}
            />
          )}
          {screen === "favorites" && <Favorites {...sharedProps} />}
          {screen !== "preview" && (
            <BottomNav active={screen === "collection" ? collection.tab : screen} onChange={setScreen} />
          )}
          <Toast message={toast} />
        </div>
      </div>
    </main>
  );
}
