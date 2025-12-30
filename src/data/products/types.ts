export type {
  ProductBase,
  ProductDetail,
  ProductReview,
  ReviewUser,
  ReviewLike,
  ProductsResponse,
  ProductsMeta,
  PriceRange,
  PriceHistogramBucket,
  ProductsFilter,
  ProductsFilterInput,
  ProductOrderBy,
} from "@/graphql/generated/types";

// Filter params - uses plain types for easier usage in components
export interface ProductsFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string[];
  materials?: string[];
  min_price?: number;
  max_price?: number;
  order_by?: "featured" | "new" | "price_low_to_high" | "price_high_to_low";
}
