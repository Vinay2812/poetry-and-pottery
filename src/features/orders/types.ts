import { formatOrderDate } from "@/lib/date";

import type { Order, OrderItem, OrderStatus } from "@/graphql/generated/types";

// Type for shipping address JSON field.
export interface ShippingAddress {
  name: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  zip: string;
  contact_number?: string;
}

// View model for a single order item.
export interface OrderItemViewModel {
  id: number;
  productId: number;
  productName: string;
  productSlug: string;
  productImage: string;
  colorName: string | null;
  quantity: number;
  price: number;
  discount: number;
  finalPrice: number;
  hasReviewed: boolean;
}

// View model for payment summary.
export interface PaymentSummaryViewModel {
  subtotal: number;
  totalDiscount: number;
  shippingFee: number;
  total: number;
}

// View model for the OrderDetail component.
export interface OrderDetailViewModel {
  orderId: string;
  status: OrderStatus;
  statusLabel: string;
  createdAt: Date | string;
  shippedAt: Date | string | null;
  deliveredAt: Date | string | null;
  requestAt: Date | string | null;
  approvedAt: Date | string | null;
  paidAt: Date | string | null;
  cancelledAt: Date | string | null;
  items: OrderItemViewModel[];
  shippingAddress: ShippingAddress | null;
  paymentSummary: PaymentSummaryViewModel;
  canReview: boolean;
  showWhatsAppButton: boolean;
}

// Props for the presentational OrderDetail component.
export interface OrderDetailProps {
  viewModel: OrderDetailViewModel | null;
  onReviewSubmit: (
    productId: number,
    rating: number,
    review?: string,
    imageUrls?: string[],
  ) => Promise<{ success: boolean; error?: string }>;
  onWhatsAppContact: () => void;
}

// Props for the OrderDetailContainer.
export interface OrderDetailContainerProps {
  order: Order | null;
}

// Re-export date utilities for convenience
export { formatOrderDate } from "@/lib/date";

// Re-export OrderStatus enum from generated types
export { OrderStatus } from "@/graphql/generated/types";

// Helper function to get status label.
export function getStatusLabel(status: OrderStatus | null): string {
  return status?.toString() || "Processing";
}

// Helper function to build order item view model.
export function buildOrderItemViewModel(item: OrderItem): OrderItemViewModel {
  const product = item.product;
  return {
    id: item.id,
    productId: item.product_id,
    productName: product?.name || "Product",
    productSlug: product?.slug || String(item.product_id),
    productImage: product?.image_urls?.[0] || "/placeholder.jpg",
    colorName: product?.color_name || null,
    quantity: item.quantity,
    price: item.price,
    discount: item.discount,
    finalPrice: Math.max(0, item.price * item.quantity - item.discount),
    hasReviewed: item.has_reviewed,
  };
}

// Pagination data for lists.
export interface OrdersListPaginationData {
  total: number;
  totalPages: number;
}

// View model for a single order card in the list.
export interface OrderCardViewModel {
  id: string;
  status: OrderStatus;
  statusLabel: string;
  formattedDate: string;
  total: number;
  firstProductName: string;
  otherItemsCount: number;
  totalItemsCount: number;
  productImages: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
}

// Filter option for order status.
export type OrderStatusFilter =
  | "all"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

// View model for the OrdersList component.
export interface OrdersListViewModel {
  orders: OrderCardViewModel[];
  hasOrders: boolean;
  hasMore: boolean;
  isLoading: boolean;
  searchQuery: string;
  statusFilter: OrderStatusFilter;
}

// Props for the presentational OrdersList component.
export interface OrdersListProps {
  viewModel: OrdersListViewModel;
  loadMoreRef: (node?: Element | null) => void;
  onSearchChange: (query: string) => void;
  onStatusFilterChange: (status: OrderStatusFilter) => void;
}

// Props for the OrdersListContainer.
export interface OrdersListContainerProps {
  initialOrders: Order[];
  initialPagination: OrdersListPaginationData;
}

// Helper function to build order card view model.
export function buildOrderCardViewModel(order: Order): OrderCardViewModel {
  const items = order.ordered_products;
  const firstProductName = items[0]?.product?.name || "Product";

  return {
    id: order.id,
    status: order.status,
    statusLabel: getStatusLabel(order.status),
    formattedDate: formatOrderDate(order.created_at),
    total: order.total,
    firstProductName,
    otherItemsCount: items.length - 1,
    totalItemsCount: items.length,
    productImages: items.slice(0, 3).map((item) => ({
      id: item.id,
      src: item.product?.image_urls?.[0] || "/placeholder.jpg",
      alt: item.product?.name || "Product",
    })),
  };
}
