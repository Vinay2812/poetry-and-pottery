// Product Images (using Unsplash for placeholder pottery images)
export const PRODUCT_IMAGES = {
  mossBowl:
    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop",
  terraVase:
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop",
  dailyMug:
    "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
  stonePlate:
    "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop",
  budVase:
    "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop",
  speckledMug:
    "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=400&h=400&fit=crop",
  servingBowl:
    "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=400&h=400&fit=crop",
  hangingPlanter:
    "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
  rusticPitcher:
    "https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?w=400&h=400&fit=crop",
  dinnerSet:
    "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=400&h=400&fit=crop",
  sunriseMug:
    "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400&h=400&fit=crop",
  mossyBowl:
    "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=400&h=400&fit=crop",
  succulentPlanter:
    "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop",
  coasterSet:
    "https://images.unsplash.com/photo-1732983461382-91e57809be1c?w=400&h=400&fit=crop",
  dinnerPlate:
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop",
  rusticPlate:
    "https://images.unsplash.com/photo-1594568284297-7c64464062b1?w=400&h=400&fit=crop",
};

// Hero Images
export const HERO_IMAGES = {
  springRituals:
    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=600&fit=crop",
  shopBanner:
    "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=1200&h=400&fit=crop",
  ourStory:
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
};

// Event Images
export const EVENT_IMAGES = {
  wheelThrowing:
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
  glazingClass:
    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop",
  rakuFiring:
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=300&fit=crop",
};

// Categories
export const CATEGORIES = [
  { id: "vases", name: "Vases", icon: "Flower2" },
  { id: "plates", name: "Plates", icon: "Circle" },
  { id: "mugs", name: "Mugs", icon: "Coffee" },
  { id: "planters", name: "Planters", icon: "Leaf" },
  { id: "bowls", name: "Bowls", icon: "Circle" },
  { id: "sets", name: "Sets", icon: "Package" },
];

// Product Type
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  vendor: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  material?: string;
  glazeOptions?: { name: string; color: string }[];
}

// Products Data
export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Moss Bowl",
    description:
      "Hand-thrown stoneware bowl with a unique crackle glaze. Perfect for tea ceremonies or daily rituals.",
    price: 45,
    image: PRODUCT_IMAGES.mossBowl,
    images: [
      PRODUCT_IMAGES.mossBowl,
      PRODUCT_IMAGES.mossyBowl,
      PRODUCT_IMAGES.servingBowl,
    ],
    category: "bowls",
    vendor: "Stoneware",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    stockCount: 3,
    material: "Stoneware",
    glazeOptions: [
      { name: "Moss Green", color: "#4F6F52" },
      { name: "Earth Brown", color: "#8B7355" },
      { name: "Sand", color: "#D4C4B0" },
    ],
  },
  {
    id: "2",
    name: "Terra Vase",
    description:
      "Elegant terracotta vase with organic curves. The warm earth tones complement any space.",
    price: 80,
    image: PRODUCT_IMAGES.terraVase,
    images: [PRODUCT_IMAGES.terraVase, PRODUCT_IMAGES.budVase],
    category: "vases",
    vendor: "Earthenware",
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    stockCount: 12,
    material: "Terracotta",
    glazeOptions: [
      { name: "Natural Terra", color: "#C4785A" },
      { name: "Burnt Sienna", color: "#A0522D" },
    ],
  },
  {
    id: "3",
    name: "Daily Mug",
    description:
      "Your everyday companion. Comfortable handle and perfect weight for morning coffee.",
    price: 32,
    image: PRODUCT_IMAGES.dailyMug,
    images: [PRODUCT_IMAGES.dailyMug, PRODUCT_IMAGES.speckledMug],
    category: "mugs",
    vendor: "Speckled Clay",
    rating: 4.7,
    reviewCount: 256,
    inStock: true,
    stockCount: 24,
    material: "Stoneware",
    glazeOptions: [
      { name: "Speckled White", color: "#F5F5F0" },
      { name: "Ocean Blue", color: "#5B7C99" },
      { name: "Moss Green", color: "#4F6F52" },
    ],
  },
  {
    id: "4",
    name: "Stone Plate",
    description:
      "Minimalist dinner plate with a smooth matte finish. Food looks beautiful on this canvas.",
    price: 40,
    image: PRODUCT_IMAGES.stonePlate,
    category: "plates",
    vendor: "Matte Finish",
    rating: 4.6,
    reviewCount: 78,
    inStock: true,
    stockCount: 18,
    material: "Stoneware",
  },
  {
    id: "5",
    name: "Terracotta Bud Vase",
    description: "Small vase perfect for single stems. Handcrafted with love.",
    price: 45,
    image: PRODUCT_IMAGES.budVase,
    category: "vases",
    vendor: "Clay & Co.",
    rating: 4.8,
    reviewCount: 92,
    inStock: true,
    stockCount: 8,
    material: "Terracotta",
  },
  {
    id: "6",
    name: "Speckled Clay Mug",
    description:
      "Artisan mug with unique speckled pattern. Each piece is one of a kind.",
    price: 28,
    image: PRODUCT_IMAGES.speckledMug,
    category: "mugs",
    vendor: "Artisan Studio",
    rating: 4.5,
    reviewCount: 167,
    inStock: true,
    stockCount: 15,
    material: "Stoneware",
  },
  {
    id: "7",
    name: "Olive Serving Bowl",
    description:
      "Large serving bowl with a beautiful olive green glaze. Perfect for family gatherings.",
    price: 55,
    image: PRODUCT_IMAGES.servingBowl,
    category: "bowls",
    vendor: "Forest Ceramics",
    rating: 4.9,
    reviewCount: 43,
    inStock: true,
    stockCount: 6,
    material: "Stoneware",
  },
  {
    id: "8",
    name: "Hanging Planter",
    description:
      "Modern macrame-ready planter with drainage hole. Bring nature indoors.",
    price: 32,
    image: PRODUCT_IMAGES.hangingPlanter,
    category: "planters",
    vendor: "Green Thumb Co.",
    rating: 4.7,
    reviewCount: 134,
    inStock: true,
    stockCount: 20,
    material: "Terracotta",
  },
  {
    id: "9",
    name: "Rustic Pitcher",
    description:
      "Vintage-inspired pitcher for water, flowers, or display. Timeless design.",
    price: 65,
    image: PRODUCT_IMAGES.rusticPitcher,
    category: "vases",
    vendor: "Heritage Clay",
    rating: 4.8,
    reviewCount: 56,
    inStock: true,
    stockCount: 4,
    material: "Earthenware",
  },
  {
    id: "10",
    name: "Dinner Set (4pc)",
    description:
      "Complete set of 4 dinner plates. Uniform yet unique with handmade character.",
    price: 80,
    image: PRODUCT_IMAGES.dinnerSet,
    category: "sets",
    vendor: "Table & Home",
    rating: 4.9,
    reviewCount: 87,
    inStock: true,
    stockCount: 10,
    material: "Stoneware",
  },
  {
    id: "11",
    name: "Sunrise Coffee Mug",
    description:
      "Gradient glaze from warm orange to cream. Start your day with warmth.",
    price: 28,
    image: PRODUCT_IMAGES.sunriseMug,
    category: "mugs",
    vendor: "Earth & Fire Studio",
    rating: 4.6,
    reviewCount: 198,
    inStock: true,
    stockCount: 22,
    material: "Porcelain",
  },
  {
    id: "12",
    name: "Mossy Green Bowl",
    description:
      "Deep bowl with rich moss green interior. Perfect for ramen or salads.",
    price: 42,
    image: PRODUCT_IMAGES.mossyBowl,
    category: "bowls",
    vendor: "Forest Ceramics",
    rating: 4.7,
    reviewCount: 65,
    inStock: false,
    stockCount: 0,
    material: "Stoneware",
  },
  {
    id: "13",
    name: "Succulent Planter",
    description:
      "Compact planter with textured exterior. Ideal for small succulents.",
    price: 18,
    image: PRODUCT_IMAGES.succulentPlanter,
    category: "planters",
    vendor: "Green Thumb Co.",
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    stockCount: 30,
    material: "Terracotta",
  },
  {
    id: "14",
    name: "Coaster Set",
    description:
      "Set of 4 handmade ceramic coasters. Protect your surfaces in style.",
    price: 24,
    image: PRODUCT_IMAGES.coasterSet,
    category: "sets",
    vendor: "Table & Home",
    rating: 4.5,
    reviewCount: 112,
    inStock: true,
    stockCount: 16,
    material: "Stoneware",
  },
  {
    id: "15",
    name: "Rustic Plate",
    description:
      "Speckled white dinner plate with organic edges. Rustic elegance.",
    price: 12,
    image: PRODUCT_IMAGES.rusticPlate,
    category: "plates",
    vendor: "Artisan Studio",
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    stockCount: 25,
    material: "Stoneware",
  },
];

// Event Type
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  price: number;
  image: string;
  spotsLeft?: number;
  level?: "Beginner" | "Intermediate" | "Advanced";
  duration?: string;
  location?: string;
  instructor?: string;
  includes?: string[];
}

// Events Data
export const EVENTS: Event[] = [
  {
    id: "1",
    title: "Intro to Wheel Throwing",
    description:
      "Learn the basics of centering clay and throwing your first bowl on the pottery wheel. This hands-on workshop is perfect for beginners who want to experience the joy of working with clay on a pottery wheel. You'll learn proper posture, hand positioning, and the fundamentals of centering clay - the most crucial skill in wheel throwing.",
    date: "Sat, Oct 12",
    time: "2:00 PM",
    price: 45,
    image: EVENT_IMAGES.wheelThrowing,
    spotsLeft: 3,
    duration: "2 hours",
    location: "Poetry & Pottery Studio, Downtown",
    instructor: "Maya Thompson",
    includes: [
      "All materials and clay",
      "Use of pottery wheel",
      "Take home your creation",
      "Complimentary tea and snacks",
    ],
  },
  {
    id: "2",
    title: "Glazing Masterclass",
    description:
      "Master the art of glazing in our comprehensive workshop. Learn techniques from dipping to brushwork. Discover how different glazes react during firing and create stunning effects. You'll experiment with layering techniques and learn to predict how colors will transform in the kiln.",
    date: "Sun, Oct 13",
    time: "10:00 AM",
    price: 55,
    image: EVENT_IMAGES.glazingClass,
    level: "Beginner",
    duration: "3 hours",
    location: "Poetry & Pottery Studio, Downtown",
    instructor: "James Chen",
    includes: [
      "Bisque-fired piece to glaze",
      "Access to 12+ glaze colors",
      "Firing included",
      "Reference guide to take home",
    ],
  },
  {
    id: "3",
    title: "Raku Firing Night",
    description:
      "Experience the magic of raku firing. Watch your pieces transform in the flames. This ancient Japanese technique creates unique, unpredictable results with metallic lusters and crackle effects. Each piece emerges from the fire as a one-of-a-kind treasure.",
    date: "Fri, Oct 18",
    time: "6:00 PM",
    price: 60,
    image: EVENT_IMAGES.rakuFiring,
    level: "Advanced",
    duration: "4 hours",
    location: "Poetry & Pottery Outdoor Kiln Area",
    instructor: "Sarah Mitchell",
    includes: [
      "Pre-made bisque piece for raku",
      "Safety equipment provided",
      "Light dinner and drinks",
      "Certificate of completion",
    ],
  },
];

// Registered Event Type
export interface RegisteredEvent {
  id: string;
  eventId: string;
  registrationDate: string;
  status: "confirmed" | "pending" | "completed";
  ticketNumber: string;
}

// Demo Registered Events Data
export const REGISTERED_EVENTS: RegisteredEvent[] = [
  {
    id: "reg-1",
    eventId: "1",
    registrationDate: "Oct 5, 2024",
    status: "confirmed",
    ticketNumber: "PPW-2024-1012",
  },
  {
    id: "reg-2",
    eventId: "3",
    registrationDate: "Oct 8, 2024",
    status: "confirmed",
    ticketNumber: "PPW-2024-1018",
  },
];

// Reviews
export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
}

export const REVIEWS: Review[] = [
  {
    id: "1",
    author: "Sarah Jenkins",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    content:
      "Absolutely stunning piece. The texture is amazing to hold, and it keeps my matcha warm for longer than my previous bowls.",
    date: "2 weeks ago",
  },
  {
    id: "2",
    author: "Michael Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    content:
      "Great quality and beautiful color. I love the unique glaze pattern on mine!",
    date: "1 month ago",
  },
  {
    id: "3",
    author: "Emily Watson",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 4,
    content:
      "Beautiful craftsmanship. Slightly smaller than I expected but perfect for my morning tea ritual.",
    date: "1 month ago",
  },
];

// Navigation Links
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
];

// Mobile Navigation
export const MOBILE_NAV_ITEMS = [
  { href: "/", label: "Home", icon: "Home" },
  { href: "/products", label: "Shop", icon: "Store" },
  { href: "/wishlist", label: "Wishlist", icon: "Heart" },
  { href: "/events", label: "Events", icon: "Calendar" },
  { href: "/profile", label: "Profile", icon: "User" },
];
