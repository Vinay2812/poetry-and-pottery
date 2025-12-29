"use client";

import { isGraphQL } from "@/consts/env";

import {
  ProductOrderBy,
  useBestSellersQuery as useBestSellersGraphQL,
  useFeaturedProductsQuery as useFeaturedProductsGraphQL,
  useProductByIdQuery as useProductByIdGraphQL,
  useProductBySlugQuery as useProductBySlugGraphQL,
  useProductsQuery as useProductsGraphQL,
  useRecommendedProductsQuery as useRecommendedProductsGraphQL,
  useRelatedProductsQuery as useRelatedProductsGraphQL,
} from "@/graphql/generated/graphql";

import type {
  ProductBase,
  ProductDetail,
  ProductsFilterParams,
  ProductsMeta,
} from "../types";

function mapOrderBy(orderBy?: string): ProductOrderBy | undefined {
  switch (orderBy) {
    case "new":
      return ProductOrderBy.New;
    case "price_low_to_high":
      return ProductOrderBy.PriceLowToHigh;
    case "price_high_to_low":
      return ProductOrderBy.PriceHighToLow;
    case "featured":
    default:
      return ProductOrderBy.Featured;
  }
}

interface UseProductsResult {
  products: ProductBase[];
  totalProducts: number;
  totalPages: number;
  page: number;
  limit: number;
  meta: ProductsMeta;
  loading: boolean;
  error: Error | undefined;
  fetchMore: (variables: { filter: ProductsFilterParams }) => Promise<void>;
}

export function useProducts(params: ProductsFilterParams): UseProductsResult {
  const skip = !isGraphQL;

  const { data, loading, error, fetchMore } = useProductsGraphQL({
    variables: {
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
    },
    skip,
  });

  const handleFetchMore = async (variables: {
    filter: ProductsFilterParams;
  }) => {
    await fetchMore({
      variables: {
        filter: {
          ...variables.filter,
          order_by: mapOrderBy(variables.filter.order_by),
        },
      },
    });
  };

  if (!isGraphQL || skip) {
    return {
      products: [],
      totalProducts: 0,
      totalPages: 0,
      page: 1,
      limit: params.limit ?? 12,
      meta: {
        categories: [],
        materials: [],
        price_range: { min: 0, max: 0 },
        price_histogram: [],
      },
      loading: false,
      error: undefined,
      fetchMore: handleFetchMore,
    };
  }

  return {
    products: data?.products.products ?? [],
    totalProducts: data?.products.total_products ?? 0,
    totalPages: data?.products.total_pages ?? 0,
    page: data?.products.filter.page ?? 1,
    limit: data?.products.filter.limit ?? 12,
    meta: data?.products.meta ?? {
      categories: [],
      materials: [],
      price_range: { min: 0, max: 0 },
      price_histogram: [],
    },
    loading,
    error: error as Error | undefined,
    fetchMore: handleFetchMore,
  };
}

interface UseProductBySlugResult {
  product: ProductDetail | null;
  loading: boolean;
  error: Error | undefined;
}

export function useProductBySlug(slug: string): UseProductBySlugResult {
  const skip = !isGraphQL;

  const { data, loading, error } = useProductBySlugGraphQL({
    variables: { slug },
    skip,
  });

  if (!isGraphQL || skip) {
    return {
      product: null,
      loading: false,
      error: undefined,
    };
  }

  return {
    product: data?.productBySlug ?? null,
    loading,
    error: error as Error | undefined,
  };
}

interface UseProductByIdResult {
  product: ProductDetail | null;
  loading: boolean;
  error: Error | undefined;
}

export function useProductById(id: number): UseProductByIdResult {
  const skip = !isGraphQL;

  const { data, loading, error } = useProductByIdGraphQL({
    variables: { id },
    skip,
  });

  if (!isGraphQL || skip) {
    return {
      product: null,
      loading: false,
      error: undefined,
    };
  }

  return {
    product: data?.productById ?? null,
    loading,
    error: error as Error | undefined,
  };
}

interface UseRelatedProductsResult {
  products: ProductBase[];
  loading: boolean;
  error: Error | undefined;
}

export function useRelatedProducts(
  productId: number,
  limit: number = 8,
): UseRelatedProductsResult {
  const skip = !isGraphQL;

  const { data, loading, error } = useRelatedProductsGraphQL({
    variables: { productId, limit },
    skip,
  });

  if (!isGraphQL || skip) {
    return {
      products: [],
      loading: false,
      error: undefined,
    };
  }

  return {
    products: data?.relatedProducts ?? [],
    loading,
    error: error as Error | undefined,
  };
}

interface UseFeaturedProductsResult {
  products: ProductBase[];
  loading: boolean;
  error: Error | undefined;
}

export function useFeaturedProducts(
  limit: number = 8,
): UseFeaturedProductsResult {
  const skip = !isGraphQL;

  const { data, loading, error } = useFeaturedProductsGraphQL({
    variables: { limit },
    skip,
  });

  if (!isGraphQL || skip) {
    return {
      products: [],
      loading: false,
      error: undefined,
    };
  }

  return {
    products: data?.featuredProducts ?? [],
    loading,
    error: error as Error | undefined,
  };
}

interface UseBestSellersResult {
  products: ProductBase[];
  loading: boolean;
  error: Error | undefined;
}

export function useBestSellers(limit: number = 8): UseBestSellersResult {
  const skip = !isGraphQL;

  const { data, loading, error } = useBestSellersGraphQL({
    variables: { limit },
    skip,
  });

  if (!isGraphQL || skip) {
    return {
      products: [],
      loading: false,
      error: undefined,
    };
  }

  return {
    products: data?.bestSellers ?? [],
    loading,
    error: error as Error | undefined,
  };
}

interface UseRecommendedProductsResult {
  products: ProductBase[];
  loading: boolean;
  error: Error | undefined;
}

export function useRecommendedProducts(
  limit: number = 10,
): UseRecommendedProductsResult {
  const skip = !isGraphQL;

  const { data, loading, error } = useRecommendedProductsGraphQL({
    variables: { limit },
    skip,
  });

  if (!isGraphQL || skip) {
    return {
      products: [],
      loading: false,
      error: undefined,
    };
  }

  return {
    products: data?.recommendedProducts ?? [],
    loading,
    error: error as Error | undefined,
  };
}
