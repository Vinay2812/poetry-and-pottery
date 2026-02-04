"use server";

import { getPublicClient } from "@/lib/apollo";

import type {
  CategoriesQuery,
  ProductByIdQuery,
  ProductByIdQueryVariables,
  ProductDetail,
  ProductOrderBy,
  ProductsQuery,
  ProductsQueryVariables,
  ProductsResponse,
} from "@/graphql/generated/types";
import {
  CATEGORIES_QUERY,
  PRODUCTS_QUERY,
  PRODUCT_BY_ID_QUERY,
} from "@/graphql/products.query";

export async function getProducts(params: {
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
}): Promise<ProductsResponse> {
  const client = getPublicClient();

  const variables: ProductsQueryVariables = {
    filter: params,
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

export async function getProductById(
  id: number,
): Promise<ProductDetail | null> {
  const client = getPublicClient();

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

export async function getCategories(): Promise<string[]> {
  const client = getPublicClient();

  const result = await client.query<CategoriesQuery>({
    query: CATEGORIES_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.categories ?? [];
}

export interface FilterMetadata {
  categories: string[];
  materials: string[];
  priceRange: { min: number; max: number };
  priceHistogram: { min: number; max: number; count: number }[];
}

export async function getFilterMetadata(): Promise<FilterMetadata> {
  // Use getProducts with minimal params to get meta
  const result = await getProducts({ page: 1, limit: 1 });

  return {
    categories: result.meta.categories,
    materials: result.meta.materials,
    priceRange: {
      min: result.meta.price_range.min ?? 0,
      max: result.meta.price_range.max ?? 1000,
    },
    priceHistogram: result.meta.price_histogram.map((bucket) => ({
      min: bucket.min,
      max: bucket.max,
      count: bucket.count,
    })),
  };
}
