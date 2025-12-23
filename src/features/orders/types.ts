import type {
  OrderItemWithReviewStatus,
  OrderWithReviewStatus,
} from "@/actions";
import { OrderStatus } from "@/types";

import { formatOrderDate } from "@/lib/date";

/**
 * Type for shipping address JSON field.
 */
export interface ShippingAddress {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  contactNumber?: string;
}

/**
 * View model for a single order item.
 */
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

/**
 * View model for payment summary.
 */
export interface PaymentSummaryViewModel {
  subtotal: number;
  totalDiscount: number;
  shippingFee: number;
  total: number;
  isFreeShipping: boolean;
}

/**
 * View model for the OrderDetail component.
 */
export interface OrderDetailViewModel {
  orderId: string;
  status: OrderStatus;
  statusLabel: string;
  createdAt: Date;
  shippedAt: Date | null;
  deliveredAt: Date | null;
  requestAt: Date | null;
  approvedAt: Date | null;
  paidAt: Date | null;
  cancelledAt: Date | null;
  items: OrderItemViewModel[];
  shippingAddress: ShippingAddress | null;
  paymentSummary: PaymentSummaryViewModel;
  canReview: boolean;
  showWhatsAppButton: boolean;
  userName: string;
  userEmail: string;
}

/**
 * Props for the presentational OrderDetail component.
 */
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

/**
 * Props for the OrderDetailContainer.
 */
export interface OrderDetailContainerProps {
  order: OrderWithReviewStatus | null;
}

// Re-export date utilities for convenience
export { formatOrderDate } from "@/lib/date";

/**
 * Helper function to get status label.
 */
export function getStatusLabel(status: OrderStatus | null): string {
  return status?.toString() || "Processing";
}

/**
 * Helper function to build order item view model.
 */
export function buildOrderItemViewModel(
  item: OrderItemWithReviewStatus,
): OrderItemViewModel {
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
    hasReviewed: item.hasReviewed,
  };
}

/**
 * Pagination data for lists.
 */
export interface OrdersListPaginationData {
  total: number;
  totalPages: number;
}

/**
 * View model for a single order card in the list.
 */
export interface OrderCardViewModel {
  id: string;
  status: OrderStatus;
  statusLabel: string;
  formattedDate: string;
  total: number;
  firstProductName: string;
  otherItemsCount: number;
  productImages: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
}

/**
 * View model for the OrdersList component.
 */
export interface OrdersListViewModel {
  orders: OrderCardViewModel[];
  hasOrders: boolean;
  hasMore: boolean;
  isLoading: boolean;
  searchQuery: string;
}

/**
 * Props for the presentational OrdersList component.
 */
export interface OrdersListProps {
  viewModel: OrdersListViewModel;
  loadMoreRef: (node?: Element | null) => void;
  onSearchChange: (query: string) => void;
}

/**
 * Props for the OrdersListContainer.
 */
export interface OrdersListContainerProps {
  initialOrders: import("@/types").OrderWithItems[];
  initialPagination: OrdersListPaginationData;
}

/**
 * Helper function to build order card view model.
 */
export function buildOrderCardViewModel(
  order: import("@/types").OrderWithItems,
): OrderCardViewModel {
  const items = order.ordered_products;
  const firstProductName = items[0]?.product?.name || "Product";

  return {
    id: order.id,
    status: order.status as OrderStatus,
    statusLabel: getStatusLabel(order.status as OrderStatus),
    formattedDate: formatOrderDate(order.created_at),
    total: order.total,
    firstProductName,
    otherItemsCount: items.length - 1,
    productImages: items.slice(0, 3).map((item) => ({
      id: item.id,
      src: item.product?.image_urls?.[0] || "/placeholder.jpg",
      alt: item.product?.name || "Product",
    })),
  };
}
