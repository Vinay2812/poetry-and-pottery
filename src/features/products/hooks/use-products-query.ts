"use client";

import { isGraphQL } from "@/consts/env";
import { getProducts } from "@/data/products/gateway/server";
import type { ProductBase, ProductsFilterParams } from "@/data/products/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import {
  ProductOrderBy,
  useProductsLazyQuery,
} from "@/graphql/generated/graphql";

function mapOrderBy(orderBy?: string): ProductOrderBy {
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

const PRODUCTS_PER_PAGE = 12;

interface UseProductsQueryOptions {
  filterParams: ProductsFilterParams;
  initialProducts: ProductBase[];
  totalProducts: number;
}

export function useProductsQuery({
  filterParams,
  initialProducts,
  totalProducts,
}: UseProductsQueryOptions) {
  const [fetchGraphQL, { loading: isGraphQLLoading }] = useProductsLazyQuery({
    fetchPolicy: "network-only",
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["products", filterParams, isGraphQL],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        if (isGraphQL) {
          const { data: gqlData, error: gqlError } = await fetchGraphQL({
            variables: {
              filter: {
                page: pageParam,
                limit: filterParams.limit ?? PRODUCTS_PER_PAGE,
                search: filterParams.search,
                categories: filterParams.categories,
                materials: filterParams.materials,
                min_price: filterParams.min_price,
                max_price: filterParams.max_price,
                order_by: mapOrderBy(filterParams.order_by),
              },
            },
          });

          if (gqlError) {
            throw new Error(gqlError.message);
          }

          const products = gqlData?.products;
          return {
            data: (products?.products ?? []) as ProductBase[],
            total: products?.total_products ?? 0,
            page: products?.filter.page ?? pageParam,
            totalPages: products?.total_pages ?? 0,
          };
        } else {
          const result = await getProducts({
            ...filterParams,
            page: pageParam,
          });
          return {
            data: result.products,
            total: result.total_products,
            page: result.filter.page ?? pageParam,
            totalPages: result.total_pages,
          };
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        throw err;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialData: {
      pages: [
        {
          data: initialProducts,
          total: totalProducts,
          page: 1,
          totalPages: Math.ceil(totalProducts / PRODUCTS_PER_PAGE),
        },
      ],
      pageParams: [1],
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (
      inView &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isLoading &&
      !isGraphQLLoading
    ) {
      fetchNextPage();
    }
  }, [
    inView,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    isGraphQLLoading,
  ]);

  const products = useMemo(() => {
    const allProducts = data?.pages.flatMap((page) => page.data) ?? [];
    const seen = new Set<number>();
    return allProducts.filter((product) => {
      if (seen.has(product.id)) {
        return false;
      }
      seen.add(product.id);
      return true;
    });
  }, [data]);

  const currentTotal = data?.pages[0]?.total ?? totalProducts;

  return {
    products,
    totalProducts: currentTotal,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage: isFetchingNextPage ?? isGraphQLLoading,
    loadMoreRef,
    error,
  };
}
