export interface SushiItem {
  id: string;
  name: string;
  japaneseName: string;
  description: string;
  price: number;
  category: "nigiri" | "maki" | "sashimi" | "special";
  emoji: string;
  pieces: number;
}

export const sushiMenu: SushiItem[] = [
  {
    id: "1",
    name: "Salmon Nigiri",
    japaneseName: "サーモン",
    description: "Fresh Atlantic salmon over pressed rice",
    price: 6.5,
    category: "nigiri",
    emoji: "🍣",
    pieces: 2,
  },
  {
    id: "2",
    name: "Tuna Nigiri",
    japaneseName: "マグロ",
    description: "Premium bluefin tuna over pressed rice",
    price: 8.0,
    category: "nigiri",
    emoji: "🍣",
    pieces: 2,
  },
  {
    id: "3",
    name: "Shrimp Nigiri",
    japaneseName: "エビ",
    description: "Tender cooked shrimp over pressed rice",
    price: 5.5,
    category: "nigiri",
    emoji: "🍤",
    pieces: 2,
  },
  {
    id: "4",
    name: "California Roll",
    japaneseName: "カリフォルニアロール",
    description: "Crab, avocado, and cucumber wrapped in seaweed",
    price: 9.0,
    category: "maki",
    emoji: "🥢",
    pieces: 8,
  },
  {
    id: "5",
    name: "Dragon Roll",
    japaneseName: "ドラゴンロール",
    description: "Shrimp tempura topped with avocado and eel sauce",
    price: 14.0,
    category: "special",
    emoji: "🐉",
    pieces: 8,
  },
  {
    id: "6",
    name: "Spicy Tuna Roll",
    japaneseName: "スパイシーツナ",
    description: "Spicy tuna with cucumber and sesame",
    price: 10.0,
    category: "maki",
    emoji: "🌶️",
    pieces: 6,
  },
  {
    id: "7",
    name: "Salmon Sashimi",
    japaneseName: "サーモン刺身",
    description: "Thinly sliced fresh salmon, no rice",
    price: 12.0,
    category: "sashimi",
    emoji: "🐟",
    pieces: 5,
  },
  {
    id: "8",
    name: "Rainbow Roll",
    japaneseName: "レインボーロール",
    description: "California roll topped with assorted fish",
    price: 16.0,
    category: "special",
    emoji: "🌈",
    pieces: 8,
  },
  {
    id: "9",
    name: "Eel Nigiri",
    japaneseName: "うなぎ",
    description: "Grilled freshwater eel with sweet sauce",
    price: 7.5,
    category: "nigiri",
    emoji: "🍣",
    pieces: 2,
  },
  {
    id: "10",
    name: "Yellowtail Sashimi",
    japaneseName: "ハマチ刺身",
    description: "Buttery yellowtail slices",
    price: 14.0,
    category: "sashimi",
    emoji: "🐟",
    pieces: 5,
  },
  {
    id: "11",
    name: "Cucumber Roll",
    japaneseName: "かっぱ巻き",
    description: "Simple and refreshing cucumber roll",
    price: 5.0,
    category: "maki",
    emoji: "🥒",
    pieces: 6,
  },
  {
    id: "12",
    name: "Chef's Omakase",
    japaneseName: "おまかせ",
    description: "Chef's selection of premium pieces",
    price: 45.0,
    category: "special",
    emoji: "👨‍🍳",
    pieces: 12,
  },
];

export const categories = [
  { key: "all", label: "All" },
  { key: "nigiri", label: "Nigiri" },
  { key: "maki", label: "Maki" },
  { key: "sashimi", label: "Sashimi" },
  { key: "special", label: "Special" },
] as const;
