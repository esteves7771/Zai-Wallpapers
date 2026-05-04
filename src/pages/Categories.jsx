import { categories, wallpapers } from "../data/wallpapers.js";
import CategoryCard from "../components/CategoryCard.jsx";
import Header from "../components/Header.jsx";

export default function Categories({ setScreen, openCollection }) {
  return (
    <section className="screen-scroll">
      <Header title="Categories" right="search" onRight={() => setScreen("search")} />
      <div className="grid grid-cols-2 gap-3 px-4 pb-28">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            category={category}
            onClick={() =>
              openCollection({
                title: category.name,
                items: wallpapers.filter((wallpaper) => wallpaper.category === category.name),
                backTo: "categories",
                tab: "categories"
              })
            }
          />
        ))}
      </div>
    </section>
  );
}
