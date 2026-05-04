const photoUrl = (query, lock) =>
  `https://source.unsplash.com/900x1600/?${encodeURIComponent(query)}&sig=${lock}`;

const baseUrl = import.meta.env?.BASE_URL || "./";
const localAsset = (path) => `${baseUrl}${path}`;

const categorySets = [
  {
    category: "Anime",
    query: "anime,illustration,cosplay,neon",
    tags: ["anime", "portrait", "neon", "4K"],
    titles: [
      "Neon Ronin",
      "Violet Hero",
      "Tokyo Dreamer",
      "Moonlit Senpai",
      "Cyber Shrine",
      "Sakura Blade",
      "Rainy Arcade",
      "Starlight Mage",
      "Purple Kitsune",
      "Midnight Pilot",
      "Electric Schoolyard",
      "Lofi Samurai",
      "Crystal Guardian",
      "Neon Alley Girl",
      "Astral Swordsman"
    ]
  },
  {
    category: "Dark / OLED",
    query: "dark,black,neon,abstract",
    tags: ["dark", "oled", "black", "minimal"],
    titles: [
      "Pure Black Aura",
      "Violet Eclipse",
      "OLED Smoke",
      "Shadow Pulse",
      "Midnight Glass",
      "Black Marble",
      "Purple Void",
      "Silent Cosmos",
      "Obsidian Flow",
      "Dark Matter",
      "Velvet Night",
      "Black Neon Curve",
      "Low Light Halo",
      "Abyss Bloom",
      "Carbon Glow"
    ]
  },
  {
    category: "Cyberpunk",
    query: "cyberpunk,neon,city,rain,night",
    tags: ["cyberpunk", "neon", "city", "rain"],
    titles: [
      "Cyberpunk Night",
      "Neon Rain",
      "Chrome District",
      "Vapor Alley",
      "Electric Crosswalk",
      "Purple Megacity",
      "Hologram Street",
      "Tokyo Afterdark",
      "Synthwave Tower",
      "Night Runner",
      "Signal City",
      "Arcade Skyline",
      "Neon Overpass",
      "Future Market",
      "Rainlit Android"
    ]
  },
  {
    category: "Nature",
    query: "nature,mountain,forest,waterfall",
    tags: ["nature", "mountain", "forest", "4K"],
    titles: [
      "Frozen Summit",
      "Forest Falls",
      "Emerald Canyon",
      "Alpine Mirror",
      "Northern Pines",
      "Misty River",
      "Blue Glacier",
      "Hidden Valley",
      "Sunrise Ridge",
      "Moon Lake",
      "Rainforest Veil",
      "Wild Horizon",
      "Cloud Peak",
      "Cedar Path",
      "Aurora Range"
    ]
  },
  {
    category: "Cars & Bikes",
    query: "supercar,motorcycle,road,vehicle",
    tags: ["cars", "bikes", "road", "4K"],
    titles: [
      "Scarlet Drive",
      "Neon Rider",
      "Night Coupe",
      "Rain Roadster",
      "Carbon Bike",
      "Violet Garage",
      "Sunset Turbo",
      "Electric Chase",
      "Chrome Mustang",
      "Midnight Cruiser",
      "Track Phantom",
      "Desert Machine",
      "City Drifter",
      "Purple Headlights",
      "Apex Sprint"
    ]
  },
  {
    category: "Minimal",
    query: "minimal,architecture,abstract,clean",
    tags: ["minimal", "clean", "soft", "4K"],
    titles: [
      "Dark Valley",
      "Simple Moon",
      "Quiet Gradient",
      "Soft Horizon",
      "Single Light",
      "Paper Shadow",
      "Calm Geometry",
      "Minimal Peak",
      "Blurred Dawn",
      "Clean Orbit",
      "Muted Wave",
      "Zen Line",
      "Fog Frame",
      "Tiny Star",
      "Silent Shape"
    ]
  },
  {
    category: "Animals",
    query: "wildlife,animal,portrait,nature",
    tags: ["animals", "wildlife", "portrait", "dark"],
    titles: [
      "Royal Lion",
      "Shadow Panther",
      "Arctic Wolf",
      "Golden Eagle",
      "Silent Tiger",
      "Moon Fox",
      "Forest Deer",
      "Snow Leopard",
      "Ocean Turtle",
      "Amber Owl",
      "Wild Horse",
      "Black Raven",
      "Desert Falcon",
      "Neon Jellyfish",
      "Mountain Bear"
    ]
  },
  {
    category: "Fantasy",
    query: "fantasy,castle,magic,landscape",
    tags: ["fantasy", "magic", "castle", "purple"],
    titles: [
      "Purple Castle",
      "Cosmic Tree",
      "Dragon Gate",
      "Mystic Kingdom",
      "Crystal Tower",
      "Moonlit Ruins",
      "Enchanted Forest",
      "Astral Palace",
      "Fire Mage",
      "Floating Isles",
      "Dream Portal",
      "Royal Spell",
      "Ancient Mountain",
      "Star Citadel",
      "Violet Realm"
    ]
  }
];

export const wallpapers = categorySets.flatMap((set, categoryIndex) =>
  set.titles.map((title, itemIndex) => {
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const lock = 9100 + categoryIndex * 100 + itemIndex;
    return {
      id,
      title,
      category: set.category,
      tags: [...set.tags, title.split(" ")[0].toLowerCase()],
      resolution: itemIndex % 3 === 0 ? "2160 x 3840" : itemIndex % 3 === 1 ? "1440 x 3200" : "1080 x 2400",
      thumb: photoUrl(set.query, lock),
      full: photoUrl(set.query, lock),
      fallbackThumb: localAsset(`wallpapers/thumbs/${id}.svg`),
      fallbackFull: localAsset(`wallpapers/full/${id}.svg`),
      featured: itemIndex < 3,
      daily: set.category === "Fantasy" && itemIndex === 0,
      likes: 18000 + categoryIndex * 3200 + itemIndex * 1375
    };
  })
);

export const categories = categorySets.map((set) => {
  const items = wallpapers.filter((wallpaper) => wallpaper.category === set.category);
  return {
    name: set.category,
    count: items.length,
    image: items[0].thumb,
    fallbackImage: items[0].fallbackThumb
  };
});
