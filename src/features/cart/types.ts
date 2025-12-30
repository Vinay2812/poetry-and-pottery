import type { ProductBase } from "@/data/products/types";
import type { UserAddress } from "@/prisma/generated/client";

import type { CartItem } from "@/graphql/generated/types";

/**
 * View model for a single cart item.
 */
export interface CartItemViewModel {
  productId: number;
  product: ProductBase;
  quantity: number;
  isLoading: boolean;
}

/**
 * Order summary calculated values.
 */
export interface OrderSummaryViewModel {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  freeShippingThreshold: number;
}

/**
 * View model for the Cart component.
 */
export interface CartViewModel {
  cartItems: CartItemViewModel[];
  orderSummary: OrderSummaryViewModel;
  selectedAddress: UserAddress | null;
  addresses: UserAddress[];
  recommendedProducts: ProductBase[];
  isOrdering: boolean;
  canCheckout: boolean;
  checkoutButtonText: string;
}

/**
 * Props for the presentational Cart component.
 */
export interface CartProps {
  viewModel: CartViewModel;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onSelectAddress: (address: UserAddress | null) => void;
  onCheckout: () => void;
}

/**
 * Props for the CartContainer component.
 */
export interface CartContainerProps {
  initialCartItems: CartItem[];
  recommendedProducts: ProductBase[];
  initialAddresses: UserAddress[];
}
