"use client";

import { getProducts } from "@/actions";
import type { ProductFilterParams, ProductWithCategories } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import type { Category, PriceHistogram } from "../types";

const PRODUCTS_PER_PAGE = 12;

interface UseProductsQueryOptions {
  filterParams: ProductFilterParams;
  initialProducts: ProductWithCategories[];
  totalProducts: number;
  categories: Category[];
  materials: string[];
  priceRange?: { min: number; max: number };
  priceHistogram?: PriceHistogram[];
}

export function useProductsQuery({
  filterParams,
  initialProducts,
  totalProducts,
  categories,
  materials,
  priceRange,
  priceHistogram,
}: UseProductsQueryOptions) {
  // Infinite query for products
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products", filterParams],
      queryFn: async ({ pageParam = 1 }) => {
        return getProducts({ ...filterParams, page: pageParam });
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
            categories: categories.map((c) => c.id),
            materials,
            priceRange: priceRange || { min: 0, max: 1000 },
            priceHistogram: priceHistogram || [],
          },
        ],
        pageParams: [1],
      },
    });

  // Intersection observer for auto-loading
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  // Auto-fetch next page when scrolling near bottom
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all pages into single products array and deduplicate by id
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
    isFetchingNextPage,
    loadMoreRef,
  };
}
