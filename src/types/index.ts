// Local types for internal state management
// These types are used for mapping GraphQL data to local state

// Re-export GraphQL enums for convenience
export {
  EventLevel,
  EventRegistrationStatus,
  EventStatus,
  OrderStatus,
} from "@/graphql/generated/types";

// Customization option snapshot for cart items
export interface CustomizationOptionLocal {
  type: string;
  optionId: number;
  name: string;
  value: string;
  priceModifier: number;
}

// Product customization data for cart items
export interface ProductCustomizationDataLocal {
  options: CustomizationOptionLocal[];
  totalModifier: number;
}

// Product category type for local state
export interface ProductCategoryLocal {
  product_id: number;
  category: string;
}

// Collection type for cart items
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

// Product with categories for local state management
export interface ProductWithCategories {
  id: number;
  slug: string;
  name: string;
  price: number;
  image_urls: string[];
  material: string;
  available_quantity: number;
  total_quantity: number;
  color_code: string;
  color_name: string;
  description: string | null;
  instructions: string[];
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  product_categories: ProductCategoryLocal[];
  collection?: CartProductCollection | null;
}

// Cart item with product for local state management
export interface CartWithProduct {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
  product: ProductWithCategories;
  custom_data?: ProductCustomizationDataLocal | null;
  custom_data_hash: string;
}
