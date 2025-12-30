"use server";

import { getClient } from "@/lib/apollo";

import type {
  BestSellersQuery,
  BestSellersQueryVariables,
  FeaturedProductsQuery,
  FeaturedProductsQueryVariables,
  ProductBase,
  ProductByIdQuery,
  ProductByIdQueryVariables,
  ProductBySlugQuery,
  ProductBySlugQueryVariables,
  ProductDetail,
  ProductOrderBy,
  ProductsQuery,
  ProductsQueryVariables,
  ProductsResponse,
  RecommendedProductsQuery,
  RecommendedProductsQueryVariables,
  RelatedProductsQuery,
  RelatedProductsQueryVariables,
} from "@/graphql/generated/types";
import {
  BEST_SELLERS_QUERY,
  FEATURED_PRODUCTS_QUERY,
  PRODUCTS_QUERY,
  PRODUCT_BY_ID_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  RECOMMENDED_PRODUCTS_QUERY,
  RELATED_PRODUCTS_QUERY,
} from "@/graphql/products.query";

function mapOrderBy(
  orderBy?: "featured" | "new" | "price_low_to_high" | "price_high_to_low",
): ProductOrderBy | undefined {
  switch (orderBy) {
    case "new":
      return "NEW" as ProductOrderBy;
    case "price_low_to_high":
      return "PRICE_LOW_TO_HIGH" as ProductOrderBy;
    case "price_high_to_low":
      return "PRICE_HIGH_TO_LOW" as ProductOrderBy;
    case "featured":
    default:
      return "FEATURED" as ProductOrderBy;
  }
}

export async function getProducts(params: {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string[];
  materials?: string[];
  min_price?: number;
  max_price?: number;
  order_by?: "featured" | "new" | "price_low_to_high" | "price_high_to_low";
}): Promise<ProductsResponse> {
  const client = getClient();

  const variables: ProductsQueryVariables = {
    filter: {
      page: params.page ?? 1,
      limit: params.limit ?? 12,
      search: params.search,
      categories: params.categories,
      materials: params.materials,
      min_price: params.min_price,
      max_price: params.max_price,
      order_by: mapOrderBy(params.order_by),
    },
  };

  const result = await client.query<ProductsQuery, ProductsQueryVariables>({
    query: PRODUCTS_QUERY,
    variables,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  if (!result.data?.products) {
    throw new Error("No products data returned from GraphQL");
  }

  return result.data.products;
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetail | null> {
  const client = getClient();

  const result = await client.query<
    ProductBySlugQuery,
    ProductBySlugQueryVariables
  >({
    query: PRODUCT_BY_SLUG_QUERY,
    variables: { slug },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.productBySlug ?? null;
}

export async function getProductById(
  id: number,
): Promise<ProductDetail | null> {
  const client = getClient();

  const result = await client.query<
    ProductByIdQuery,
    ProductByIdQueryVariables
  >({
    query: PRODUCT_BY_ID_QUERY,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.productById ?? null;
}

export async function getRelatedProducts(
  productId: number,
  _category: string,
  limit: number = 8,
): Promise<ProductBase[]> {
  const client = getClient();

  const result = await client.query<
    RelatedProductsQuery,
    RelatedProductsQueryVariables
  >({
    query: RELATED_PRODUCTS_QUERY,
    variables: { productId, limit },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.relatedProducts ?? [];
}

export async function getFeaturedProducts(
  limit: number = 8,
): Promise<ProductBase[]> {
  const client = getClient();

  const result = await client.query<
    FeaturedProductsQuery,
    FeaturedProductsQueryVariables
  >({
    query: FEATURED_PRODUCTS_QUERY,
    variables: { limit },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.featuredProducts ?? [];
}

export async function getBestSellers(
  limit: number = 8,
): Promise<ProductBase[]> {
  const client = getClient();

  const result = await client.query<
    BestSellersQuery,
    BestSellersQueryVariables
  >({
    query: BEST_SELLERS_QUERY,
    variables: { limit },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.bestSellers ?? [];
}

export async function getRecommendedProducts(
  limit: number = 10,
): Promise<ProductBase[]> {
  const client = getClient();

  const result = await client.query<
    RecommendedProductsQuery,
    RecommendedProductsQueryVariables
  >({
    query: RECOMMENDED_PRODUCTS_QUERY,
    variables: { limit },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.recommendedProducts ?? [];
}
