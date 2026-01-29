import { ProductOrderBy } from "@/graphql/generated/types";

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
} from "@/graphql/generated/types";

export type { ProductOrderBy };

// Filter params - uses plain types for easier usage in components
export interface ProductsFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string[];
  materials?: string[];
  collection_ids?: number[];
  min_price?: number;
  max_price?: number;
  order_by?: ProductOrderBy;
  archive?: boolean;
}

export const getProductsOrderBy = (
  order_by?: string | null,
): ProductOrderBy => {
  const orderByMap = {
    [ProductOrderBy.New.toLocaleLowerCase()]: ProductOrderBy.New,
    [ProductOrderBy.PriceLowToHigh.toLocaleLowerCase()]:
      ProductOrderBy.PriceLowToHigh,
    [ProductOrderBy.PriceHighToLow.toLocaleLowerCase()]:
      ProductOrderBy.PriceHighToLow,
    [ProductOrderBy.BestSellers.toLocaleLowerCase()]:
      ProductOrderBy.BestSellers,
    [ProductOrderBy.Featured.toLocaleLowerCase()]: ProductOrderBy.Featured,
  };

  const strToSearch =
    order_by?.toLocaleLowerCase() ??
    ProductOrderBy.Featured.toLocaleLowerCase();

  return orderByMap[strToSearch] ?? ProductOrderBy.Featured;
};
