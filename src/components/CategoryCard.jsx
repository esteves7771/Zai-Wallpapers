import { useEffect, useState } from "react";

export default function CategoryCard({ category, onClick }) {
  const [source, setSource] = useState(category.image);

  useEffect(() => {
    setSource(category.image);
  }, [category.image]);

  return (
    <button
      className="group relative aspect-[1.12] overflow-hidden rounded-[18px] border border-white/10 bg-panel text-left shadow-card"
      onClick={onClick}
    >
      <img
        src={source}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
        onError={() => {
          if (category.fallbackImage && source !== category.fallbackImage) {
            setSource(category.fallbackImage);
          }
        }}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <span className="absolute bottom-4 left-4 right-4">
        <span className="block text-[15px] font-bold">{category.name}</span>
        <span className="mt-1 block text-xs text-white/78">{category.count.toLocaleString()}</span>
      </span>
    </button>
  );
}
