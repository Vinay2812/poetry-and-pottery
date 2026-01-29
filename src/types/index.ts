import type {
  Cart,
  Event,
  EventRegistration,
  Prisma,
  Product,
  ProductCategory,
  ProductOrder,
  PurchasedProductItem,
  Review,
  ReviewLike,
  User,
  UserAddress,
  Wishlist,
} from "@/prisma/generated/client";

// Define enums locally to avoid importing Prisma runtime into client bundles
// Keep in sync with prisma/schema.prisma
export enum EventLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum EventStatus {
  UPCOMING = "UPCOMING",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  PAID = "PAID",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  RETURNED = "RETURNED",
  REFUNDED = "REFUNDED",
}

export enum EventRegistrationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PAID = "PAID",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}

// Re-export base Prisma types for convenience
export type {
  Product,
  ProductCategory,
  ProductOrder,
  PurchasedProductItem,
  Event,
  EventRegistration,
  User,
  UserAddress,
  Cart,
  Wishlist,
  Review,
  ReviewLike,
};

// Product with relations
export type ProductWithCategories = Prisma.ProductGetPayload<{
  include: {
    product_categories: true;
  };
}> & {
  _count?: { reviews: number };
  averageRating?: number | null;
};

export type ProductWithDetails = Prisma.ProductGetPayload<{
  include: {
    product_categories: true;
    reviews: { include: { user: true; likes: true } };
    _count: { select: { reviews: true; wishlists: true } };
  };
}>;

// Order with relations
export type OrderWithItems = Prisma.ProductOrderGetPayload<{
  include: {
    ordered_products: { include: { product: true } };
    user: true;
  };
}>;

export type OrderWithDetails = Prisma.ProductOrderGetPayload<{
  include: {
    ordered_products: {
      include: {
        product: { include: { product_categories: true } };
      };
    };
    user: true;
  };
}>;

// Event with relations
export type EventWithDetails = Prisma.EventGetPayload<{
  include: {
    reviews: { include: { user: true; likes: true } };
    event_registrations: true;
    _count: { select: { reviews: true; event_registrations: true } };
  };
}>;

export type EventWithRegistrationCount = Prisma.EventGetPayload<{
  include: {
    _count: { select: { event_registrations: true; reviews: true } };
  };
}> & {
  averageRating?: number | null;
};

// Registration with event
export type RegistrationWithEvent = Prisma.EventRegistrationGetPayload<{
  include: { event: true; user: true };
}>;

// Base cart with product from Prisma (without collection)
type CartWithProductBase = Prisma.CartGetPayload<{
  include: {
    product: {
      include: { product_categories: true };
    };
  };
}>;

// Collection type for cart items (matches GraphQL CollectionBase)
export interface CartProductCollection {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
  image_url?: string | null;
  starts_at?: Date | string | null;
  ends_at?: Date | string | null;
  created_at?: Date | string;
  updated_at?: Date | string;
  products_count?: number;
}

// Extended cart with product including collection
export type CartWithProduct = Omit<CartWithProductBase, "product"> & {
  product: CartWithProductBase["product"] & {
    collection?: CartProductCollection | null;
  };
};

// Wishlist with product (including categories for display)
export type WishlistWithProduct = Prisma.WishlistGetPayload<{
  include: {
    product: {
      include: { product_categories: true };
    };
  };
}>;

// Review with user and likes
export type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: { user: true; likes: true };
}>;

export type ReviewWithDetails = Prisma.ReviewGetPayload<{
  include: {
    user: true;
    likes: true;
    product: true;
    event: true;
  };
}>;

export interface EventFilterParams {
  status?: EventStatus;
  level?: EventLevel;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ProductsResponse extends PaginatedResponse<ProductWithCategories> {
  categories: string[];
  materials: string[];
  priceRange: { min: number; max: number };
  priceHistogram: { min: number; max: number; count: number }[];
}

export interface EventsResponse extends PaginatedResponse<EventWithRegistrationCount> {
  levels: EventLevel[];
}
