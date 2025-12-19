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

// Cart with product (including categories for display)
export type CartWithProduct = Prisma.CartGetPayload<{
  include: {
    product: {
      include: { product_categories: true };
    };
  };
}>;

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

// Filter/query params (not in Prisma)
export interface ProductFilterParams {
  category?: string;
  materials?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "featured" | "price-low" | "price-high" | "newest";
  page?: number;
  limit?: number;
  search?: string;
}

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
}

export interface EventsResponse extends PaginatedResponse<EventWithRegistrationCount> {
  levels: EventLevel[];
}
