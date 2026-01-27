"use server";

import { getClient } from "@/lib/apollo";

import type {
  BestSellersQuery,
  BestSellersQueryVariables,
  BestSellersResponse,
  CategoriesQuery,
  CategoriesWithImagesQuery,
  CategoryWithImage,
  MaterialsQuery,
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
  RecommendedProductsResponse,
} from "@/graphql/generated/types";
import {
  BEST_SELLERS_QUERY,
  CATEGORIES_QUERY,
  CATEGORIES_WITH_IMAGES_QUERY,
  MATERIALS_QUERY,
  PRODUCTS_QUERY,
  PRODUCT_BY_ID_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  RECOMMENDED_PRODUCTS_QUERY,
} from "@/graphql/products.query";

export async function getProducts(params: {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string[];
  materials?: string[];
  min_price?: number;
  max_price?: number;
  order_by?: ProductOrderBy;
}): Promise<ProductsResponse> {
  const client = getClient();

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

export async function getBestSellers(params: {
  limit?: number;
  page?: number;
}): Promise<BestSellersResponse> {
  const client = getClient();

  const result = await client.query<
    BestSellersQuery,
    BestSellersQueryVariables
  >({
    query: BEST_SELLERS_QUERY,
    variables: { limit: params.limit ?? 8, page: params.page ?? 1 },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.bestSellers ?? {
      products: [],
      total: 0,
      page: 1,
      total_pages: 0,
    }
  );
}

export async function getRecommendedProducts(params: {
  limit?: number;
  page?: number;
  productId?: number;
}): Promise<RecommendedProductsResponse> {
  const client = getClient();

  const result = await client.query<
    RecommendedProductsQuery,
    RecommendedProductsQueryVariables
  >({
    query: RECOMMENDED_PRODUCTS_QUERY,
    variables: {
      limit: params.limit ?? 10,
      page: params.page ?? 1,
      productId: params.productId,
    },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.recommendedProducts ?? {
      products: [],
      total: 0,
      page: 1,
      total_pages: 0,
    }
  );
}

export async function getCategories(): Promise<string[]> {
  const client = getClient();

  const result = await client.query<CategoriesQuery>({
    query: CATEGORIES_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.categories ?? [];
}

export async function getCategoriesWithImages(): Promise<CategoryWithImage[]> {
  const client = getClient();

  const result = await client.query<CategoriesWithImagesQuery>({
    query: CATEGORIES_WITH_IMAGES_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.categoriesWithImages ?? [];
}

export async function getMaterials(): Promise<string[]> {
  const client = getClient();

  const result = await client.query<MaterialsQuery>({
    query: MATERIALS_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.materials ?? [];
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
