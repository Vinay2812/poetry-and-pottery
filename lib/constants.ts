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

// Workshop Review Type
export interface WorkshopReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
}

// Past Workshop Type
export interface PastWorkshop {
  id: string;
  title: string;
  description: string;
  date: string;
  attendees: number;
  image: string;
  galleryImages?: string[];
  highlights?: string[];
  instructor?: string;
  duration?: string;
  location?: string;
  reviews?: WorkshopReview[];
}

// Past Workshop Images
export const PAST_WORKSHOP_IMAGES = {
  handBuilding:
    "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=600&h=400&fit=crop",
  summerCamp:
    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop",
  kidsClass:
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
  tribalPottery:
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=400&fit=crop",
  teaCeremony:
    "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=400&fit=crop",
  sculptureClass:
    "https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?w=600&h=400&fit=crop",
};

// Past Workshops Data
export const PAST_WORKSHOPS: PastWorkshop[] = [
  {
    id: "past-1",
    title: "Hand-Building Fundamentals",
    description:
      "This workshop introduced participants to the core hand-building techniques used in pottery. Students learned pinch pot methods, coil building, and slab construction while creating their own unique pieces to take home.",
    date: "Sep 28, 2024",
    attendees: 12,
    image: PAST_WORKSHOP_IMAGES.handBuilding,
    galleryImages: [
      PAST_WORKSHOP_IMAGES.handBuilding,
      PAST_WORKSHOP_IMAGES.summerCamp,
      PAST_WORKSHOP_IMAGES.kidsClass,
    ],
    highlights: [
      "Pinch pot techniques",
      "Coil building basics",
      "Slab construction",
    ],
    instructor: "Maya Thompson",
    duration: "3 hours",
    location: "Poetry & Pottery Studio, Downtown",
    reviews: [
      {
        id: "wr-1",
        author: "Jennifer Lee",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        rating: 5,
        content:
          "Amazing workshop! Maya was so patient and helpful. I never thought I could make something so beautiful on my first try.",
        date: "Oct 2, 2024",
      },
      {
        id: "wr-2",
        author: "Tom Wilson",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        rating: 5,
        content:
          "Perfect introduction to pottery. The studio atmosphere was wonderful and I left feeling inspired to continue learning.",
        date: "Sep 30, 2024",
      },
      {
        id: "wr-3",
        author: "Rachel Green",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        rating: 4,
        content:
          "Great experience overall. Would have loved a bit more time to finish my piece, but the techniques I learned were invaluable.",
        date: "Sep 29, 2024",
      },
    ],
  },
  {
    id: "past-2",
    title: "Summer Pottery Camp",
    description:
      "Our most popular annual event! This 5-day intensive program took participants on a journey through wheel throwing, hand-building, and glazing. Everyone left with multiple finished pieces and lasting memories.",
    date: "Aug 15-19, 2024",
    attendees: 24,
    image: PAST_WORKSHOP_IMAGES.summerCamp,
    galleryImages: [
      PAST_WORKSHOP_IMAGES.summerCamp,
      PAST_WORKSHOP_IMAGES.tribalPottery,
    ],
    highlights: [
      "5-day intensive program",
      "Wheel throwing & hand-building",
      "Glazing workshop",
    ],
    instructor: "James Chen",
    duration: "5 days (4 hours/day)",
    location: "Poetry & Pottery Studio, Downtown",
    reviews: [
      {
        id: "wr-4",
        author: "Mark Stevens",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        rating: 5,
        content:
          "Best week of my summer! The progression from day 1 to day 5 was incredible. James is a fantastic teacher.",
        date: "Aug 22, 2024",
      },
      {
        id: "wr-5",
        author: "Lisa Park",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
        rating: 5,
        content:
          "Worth every penny. I came in knowing nothing and left with skills I'll use forever. Already signed up for next year!",
        date: "Aug 20, 2024",
      },
    ],
  },
  {
    id: "past-3",
    title: "Kids Pottery Day",
    description:
      "A fun-filled day designed especially for young artists aged 6-12. Children explored their creativity by making animal sculptures and painting their own pottery pieces in a safe, encouraging environment.",
    date: "Jul 20, 2024",
    attendees: 16,
    image: PAST_WORKSHOP_IMAGES.kidsClass,
    highlights: ["Ages 6-12", "Animal sculptures", "Paint your own pottery"],
    instructor: "Sarah Mitchell",
    duration: "2.5 hours",
    location: "Poetry & Pottery Studio, Downtown",
    reviews: [
      {
        id: "wr-6",
        author: "Amanda Foster",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
        rating: 5,
        content:
          "My daughter had the best time! She hasn't stopped talking about her elephant sculpture. Sarah was wonderful with the kids.",
        date: "Jul 22, 2024",
      },
      {
        id: "wr-7",
        author: "David Kim",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        rating: 4,
        content:
          "Great activity for kids. My son loved it. Only wish it was a bit longer so they could do more.",
        date: "Jul 21, 2024",
      },
    ],
  },
  {
    id: "past-4",
    title: "Tribal Pottery Techniques",
    description:
      "An exploration of traditional pottery methods from around the world. Participants learned ancient techniques including natural clay preparation, hand-coiling without a wheel, and open-fire finishing methods.",
    date: "Jun 8, 2024",
    attendees: 8,
    image: PAST_WORKSHOP_IMAGES.tribalPottery,
    galleryImages: [
      PAST_WORKSHOP_IMAGES.tribalPottery,
      PAST_WORKSHOP_IMAGES.teaCeremony,
    ],
    highlights: [
      "Traditional methods",
      "Natural clay preparation",
      "Open-fire techniques",
    ],
    instructor: "Maya Thompson",
    duration: "4 hours",
    location: "Poetry & Pottery Outdoor Kiln Area",
    reviews: [
      {
        id: "wr-8",
        author: "Nina Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
        rating: 5,
        content:
          "Truly unique experience. Learning about the history behind these techniques made it so much more meaningful.",
        date: "Jun 12, 2024",
      },
    ],
  },
  {
    id: "past-5",
    title: "Japanese Tea Ceremony Bowls",
    description:
      "A meditative workshop focused on creating chawan (tea ceremony bowls) in the Japanese tradition. We explored wabi-sabi aesthetics and ended with a traditional tea ceremony demonstration.",
    date: "May 25, 2024",
    attendees: 10,
    image: PAST_WORKSHOP_IMAGES.teaCeremony,
    highlights: ["Chawan making", "Wabi-sabi aesthetics", "Tea ceremony demo"],
    instructor: "James Chen",
    duration: "3.5 hours",
    location: "Poetry & Pottery Studio, Downtown",
    reviews: [
      {
        id: "wr-9",
        author: "Emily Watson",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        rating: 5,
        content:
          "The most peaceful workshop I've ever attended. James explained the philosophy beautifully and the tea ceremony at the end was magical.",
        date: "May 28, 2024",
      },
      {
        id: "wr-10",
        author: "Michael Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        rating: 5,
        content:
          "As someone with Japanese heritage, this workshop meant a lot to me. Beautifully done with respect for the tradition.",
        date: "May 27, 2024",
      },
    ],
  },
  {
    id: "past-6",
    title: "Ceramic Sculpture Workshop",
    description:
      "This advanced workshop pushed creative boundaries as participants learned figure sculpting, abstract form creation, and various surface texturing techniques to create expressive ceramic sculptures.",
    date: "Apr 12, 2024",
    attendees: 14,
    image: PAST_WORKSHOP_IMAGES.sculptureClass,
    galleryImages: [
      PAST_WORKSHOP_IMAGES.sculptureClass,
      PAST_WORKSHOP_IMAGES.handBuilding,
    ],
    highlights: ["Figure sculpting", "Abstract forms", "Surface texturing"],
    instructor: "Sarah Mitchell",
    duration: "4 hours",
    location: "Poetry & Pottery Studio, Downtown",
    reviews: [
      {
        id: "wr-11",
        author: "Robert Kim",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        rating: 4,
        content:
          "Challenging but rewarding. Sarah helped me push past my comfort zone and I'm proud of what I created.",
        date: "Apr 15, 2024",
      },
      {
        id: "wr-12",
        author: "Sarah Jenkins",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        rating: 5,
        content:
          "Finally a workshop that challenges experienced potters! The sculpture techniques were completely new to me.",
        date: "Apr 14, 2024",
      },
    ],
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
  {
    id: "4",
    author: "David Park",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    content:
      "The attention to detail is incredible. You can really tell this was made by skilled artisans. The moss green glaze is even more beautiful in person!",
    date: "2 months ago",
  },
  {
    id: "5",
    author: "Lisa Thompson",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    rating: 4,
    content:
      "Lovely piece that adds warmth to my kitchen. The glaze has such depth and character. Would definitely buy from this shop again.",
    date: "2 months ago",
  },
  {
    id: "6",
    author: "James Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    rating: 5,
    content:
      "Bought this as a gift for my mother and she absolutely loved it. The packaging was also very thoughtful and eco-friendly.",
    date: "3 months ago",
  },
  {
    id: "7",
    author: "Amanda Foster",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    rating: 3,
    content:
      "Nice quality but the color was slightly different from what I expected based on the photos. Still a lovely piece overall.",
    date: "3 months ago",
  },
  {
    id: "8",
    author: "Robert Kim",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    content:
      "This is my third purchase from Poetry & Pottery and they never disappoint. The quality is consistently excellent.",
    date: "4 months ago",
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
