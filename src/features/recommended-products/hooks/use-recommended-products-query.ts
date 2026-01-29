"use client";

import type { ProductBase } from "@/data/products/types";
import { useQuery } from "@tanstack/react-query";

import { useRecommendedProductsLazyQuery } from "@/graphql/generated/graphql";

interface UseRecommendedProductsQueryOptions {
  limit?: number;
  productId?: number;
}

export function useRecommendedProductsQuery({
  limit = 4,
  productId,
}: UseRecommendedProductsQueryOptions = {}) {
  const [fetchGraphQL] = useRecommendedProductsLazyQuery({
    fetchPolicy: "network-only",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["recommended-products", limit, productId],
    queryFn: async () => {
      const { data: gqlData, error: gqlError } = await fetchGraphQL({
        variables: { limit, productId },
      });
      if (gqlError) {
        throw new Error(gqlError.message);
      }
      return (gqlData?.recommendedProducts.products ?? []) as ProductBase[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    products: data ?? [],
    isLoading,
    error,
  };
}
