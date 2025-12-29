"use client";

import { getProducts } from "@/data/products/gateway/server";
import type { ProductBase, ProductsFilterParams } from "@/data/products/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import type { Category } from "../types";

const PRODUCTS_PER_PAGE = 12;

interface UseProductsQueryOptions {
  filterParams: ProductsFilterParams;
  initialProducts: ProductBase[];
  totalProducts: number;
  categories: Category[];
  materials: string[];
  priceRange?: { min: number; max: number };
}

export function useProductsQuery({
  filterParams,
  initialProducts,
  totalProducts,
  categories,
  materials,
  priceRange,
}: UseProductsQueryOptions) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products", filterParams],
      queryFn: async ({ pageParam = 1 }) => {
        const result = await getProducts({ ...filterParams, page: pageParam });
        return {
          data: result.products,
          total: result.total_products,
          page: result.filter.page ?? pageParam,
          totalPages: result.total_pages,
          categories: result.meta.categories,
          materials: result.meta.materials,
          priceRange: result.meta.price_range,
        };
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
          },
        ],
        pageParams: [1],
      },
    });

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
