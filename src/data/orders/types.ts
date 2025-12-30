// Re-export GraphQL types for orders
// All types come from codegen - no custom types
export type {
  CreateOrderInput,
  Order,
  OrderItem,
  OrderMutationResponse,
  OrdersFilterInput,
  OrdersResponse,
  OrderStatus,
  ShippingAddressInput,
} from "@/graphql/generated/types";

// Local interface for shipping address (used in forms)
export interface ShippingAddress {
  name: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  zip: string;
  contactNumber?: string | null;
}
