import { formatEventTime, formatOrderDate } from "@/lib/date";

import type { EventBase, Order, ProductBase } from "@/graphql/generated/types";

export type SearchTab = "products" | "events" | "orders";

export interface ProductSearchItem {
  id: number;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  isOutOfStock: boolean;
}

export interface EventSearchItem {
  id: string;
  title: string;
  slug: string;
  startsAt: string;
  startsAtTime: string;
  location: string;
  level: string | null;
  imageUrl: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
}

export interface OrderSearchItem {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: string;
  total: number;
  productCount: number;
  firstProductName: string;
  firstProductImage: string;
}

export interface GlobalSearchViewModel {
  isOpen: boolean;
  isLoading: boolean;
  searchQuery: string;
  activeTab: SearchTab;
  products: ProductSearchItem[];
  events: EventSearchItem[];
  orders: OrderSearchItem[];
  counts: {
    products: number;
    events: number;
    orders: number;
  };
  hasResults: boolean;
  isAuthenticated: boolean;
}

export interface GlobalSearchProps {
  viewModel: GlobalSearchViewModel;
  onQueryChange: (query: string) => void;
  onTabChange: (tab: SearchTab) => void;
  onClose: () => void;
  onProductClick: (id: number) => void;
  onEventClick: (eventId: string) => void;
  onOrderClick: (orderId: string) => void;
  onViewAllProducts: () => void;
  onViewAllEvents: () => void;
  onViewAllOrders: () => void;
}

export function buildProductSearchItem(
  product: ProductBase,
): ProductSearchItem {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    imageUrl: product.image_urls[0] || "/placeholder-product.jpg",
    isOutOfStock: product.available_quantity === 0,
  };
}

export function buildEventSearchItem(event: EventBase): EventSearchItem {
  return {
    id: event.id,
    title: event.title,
    slug: event.slug,
    startsAt: formatOrderDate(event.starts_at),
    startsAtTime: formatEventTime(event.starts_at),
    location: event.location,
    level: event.level ?? null,
    imageUrl: event.image || "/placeholder-event.jpg",
    price: event.price,
    availableSeats: event.available_seats,
    totalSeats: event.total_seats,
  };
}

export function buildOrderSearchItem(order: Order): OrderSearchItem {
  const firstProduct = order.ordered_products[0]?.product;
  return {
    id: order.id,
    orderNumber: order.id.slice(-8).toUpperCase(),
    createdAt: formatOrderDate(order.created_at),
    status: order.status,
    total: order.total,
    productCount: order.ordered_products.length,
    firstProductName: firstProduct?.name || "Unknown Product",
    firstProductImage:
      firstProduct?.image_urls[0] || "/placeholder-product.jpg",
  };
}

export function getOrderStatusColor(status: string): string {
  switch (status) {
    case "DELIVERED":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "SHIPPED":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "PROCESSING":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "CANCELLED":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400";
  }
}

export interface SearchTabButtonProps {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

export interface SearchResultListProps {
  children: React.ReactNode;
  isEmpty: boolean;
  emptyIcon: React.ReactNode;
  emptyMessage: string;
  totalCount: number;
  visibleCount: number;
  onViewAll?: () => void;
  viewAllLabel: string;
}

export interface SearchProductResultItemProps {
  imageUrl: string;
  name: string;
  price: number;
  isOutOfStock: boolean;
  onClick: () => void;
}

export interface SearchEventResultItemProps {
  title: string;
  startsAt: string;
  startsAtTime: string;
  location: string;
  price: number;
  onClick: () => void;
}

export interface SearchOrderResultItemProps {
  orderNumber: string;
  createdAt: string;
  status: string;
  productCount: number;
  firstProductName: string;
  firstProductImage: string;
  onClick: () => void;
}
