import type { ProductBase } from "@/data/products/types";

import type { CartItem, UserAddress } from "@/graphql/generated/types";

/**
 * Product availability status for cart items.
 */
export type AvailabilityStatus =
  | "available"
  | "out_of_stock"
  | "insufficient_stock"
  | "archived"
  | "collection_ended";

/**
 * Availability info for a cart item.
 */
export interface AvailabilityInfo {
  status: AvailabilityStatus;
  isAvailable: boolean;
  message: string;
  maxQuantity: number;
}

/**
 * Determines the availability status of a product in the cart.
 */
export function getProductAvailability(
  product: ProductBase,
  requestedQuantity: number,
): AvailabilityInfo {
  const now = new Date();

  // Check if product is archived (inactive)
  if (!product.is_active) {
    return {
      status: "archived",
      isAvailable: false,
      message: "This product has been archived",
      maxQuantity: 0,
    };
  }

  // Check if collection has ended
  if (product.collection?.ends_at) {
    const endsAt = new Date(product.collection.ends_at);
    if (endsAt < now) {
      return {
        status: "collection_ended",
        isAvailable: false,
        message: `Collection "${product.collection.name}" has ended`,
        maxQuantity: 0,
      };
    }
  }

  // Check if out of stock
  if (product.available_quantity <= 0) {
    return {
      status: "out_of_stock",
      isAvailable: false,
      message: "Out of stock",
      maxQuantity: 0,
    };
  }

  // Check if requested quantity exceeds available
  if (requestedQuantity > product.available_quantity) {
    return {
      status: "insufficient_stock",
      isAvailable: false,
      message: `Only ${product.available_quantity} available`,
      maxQuantity: product.available_quantity,
    };
  }

  // Product is available
  return {
    status: "available",
    isAvailable: true,
    message: "",
    maxQuantity: product.available_quantity,
  };
}

/**
 * View model for a single cart item.
 */
export interface CartItemViewModel {
  productId: number;
  product: ProductBase;
  quantity: number;
  isLoading: boolean;
  availability: AvailabilityInfo;
}

/**
 * Order summary calculated values.
 */
export interface OrderSummaryViewModel {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

/**
 * View model for the Cart component.
 */
export interface CartViewModel {
  cartItems: CartItemViewModel[];
  unavailableItems: CartItemViewModel[];
  orderSummary: OrderSummaryViewModel;
  selectedAddress: UserAddress | null;
  isOrdering: boolean;
  canCheckout: boolean;
  checkoutButtonText: string;
  hasUnavailableItems: boolean;
  availableItemCount: number;
}

/**
 * Props for the presentational Cart component.
 */
export interface CartProps {
  viewModel: CartViewModel;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onMoveToWishlist: (productId: number) => void;
  onSelectAddress: (address: UserAddress | null) => void;
  onCheckout: () => void;
}

/**
 * Props for the CartContainer component.
 */
export interface CartContainerProps {
  initialCartItems: CartItem[];
}
