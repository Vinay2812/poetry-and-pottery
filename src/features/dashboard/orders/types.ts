import type { UserOrder } from "@/actions/admin";

import type { KanbanColumn } from "@/components/dashboard/kanban-board";

/**
 * Edited state for a single order item.
 */
export interface EditedItem {
  quantity: number;
  discount: number;
}

/**
 * View model for a single order item in the dialog.
 */
export interface OrderItemViewModel {
  id: number;
  productName: string;
  productImage: string | null;
  unitPrice: number;
  quantity: number;
  discount: number;
  itemTotal: number;
  itemFinal: number;
}

/**
 * View model for the order detail dialog.
 * Contains pre-computed display values for the UI.
 */
export interface OrderViewModel {
  id: string;
  formattedCreatedAt: string;
  items: OrderItemViewModel[];
  subtotal: number;
  shippingFee: number;
  totalDiscount: number;
  calculatedTotal: number;
  isPending: boolean;
}

/**
 * Props for the presentational OrderDetailDialog component.
 * Uses on* naming convention for all callbacks.
 */
export interface OrderDetailDialogProps {
  open: boolean;
  viewModel: OrderViewModel | null;
  onOpenChange: (open: boolean) => void;
  onItemQuantityChange: (itemId: number, quantity: number) => void;
  onItemDiscountChange: (itemId: number, discount: number) => void;
  onTotalDiscountChange: (totalDiscount: number) => void;
  onSave: () => void;
  onCancel: () => void;
}

/**
 * Props for the container component.
 * Receives raw data from parent and manages state internally.
 */
export interface OrderDetailDialogContainerProps {
  order: OrderData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Raw order data from the server.
 */
export interface OrderData {
  id: string;
  status: string;
  total: number;
  subtotal: number;
  discount: number;
  shipping_fee: number;
  created_at: Date;
  request_at: Date | null;
  approved_at: Date | null;
  paid_at: Date | null;
  shipped_at: Date | null;
  delivered_at: Date | null;
  cancelled_at: Date | null;
  returned_at: Date | null;
  refunded_at: Date | null;
  ordered_products: {
    id: number;
    quantity: number;
    price: number;
    discount: number;
    product: {
      id: number;
      name: string;
      slug: string;
      image_urls: string[];
    };
  }[];
}

/**
 * View model for a single order card in the board.
 */
export interface OrderCardViewModel {
  id: string;
  totalItems: number;
  calculatedTotal: number;
  totalDiscount: number;
  createdAt: Date;
  productImages: {
    id: number;
    imageUrl: string | null;
    name: string;
    quantity: number;
  }[];
}

/**
 * Props for the OrderCard presentational component.
 */
export interface OrderCardProps {
  viewModel: OrderCardViewModel;
  isDragging?: boolean;
  onClick: () => void;
}

/**
 * Props for the OrdersBoard presentational component.
 */
export interface OrdersBoardProps {
  columns: KanbanColumn<UserOrder>[];
  isLoading: boolean;
  selectedOrder: UserOrder | null;
  dialogOpen: boolean;
  onMove: (
    itemId: string,
    fromColumn: string,
    toColumn: string,
  ) => Promise<void>;
  onCardClick: (order: UserOrder) => void;
  onDialogOpenChange: (open: boolean) => void;
}

/**
 * Props for the OrdersBoardContainer.
 */
export interface OrdersBoardContainerProps {
  orders: UserOrder[];
}

/**
 * Build order card view model from raw order data.
 */
export function buildOrderCardViewModel(order: UserOrder): OrderCardViewModel {
  const totalItems = order.ordered_products.reduce(
    (sum, p) => sum + p.quantity,
    0,
  );
  const subtotal = order.ordered_products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );
  const totalDiscount = order.ordered_products.reduce(
    (sum, p) => sum + p.discount,
    0,
  );
  const calculatedTotal = subtotal + order.shipping_fee - totalDiscount;

  return {
    id: order.id,
    totalItems,
    calculatedTotal: Math.max(0, calculatedTotal),
    totalDiscount,
    createdAt: order.created_at,
    productImages: order.ordered_products.map((op) => ({
      id: op.id,
      imageUrl: op.product.image_urls[0] || null,
      name: op.product.name,
      quantity: op.quantity,
    })),
  };
}
