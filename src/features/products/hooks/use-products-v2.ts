import { DEFAULT_PAGE_SIZE, DEFAULT_ROOT_MARGIN } from "@/consts/performance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useDebouncedCallback } from "use-debounce";

import { useProductsLazyQuery } from "@/graphql/generated/graphql";
import {
  ProductsFilterInput,
  ProductsResponse,
} from "@/graphql/generated/types";

import { useProductsFilterV2 } from "./use-products-filter-v2";

export const useProductsV2 = (options: {
  productsWithFiltersAndMetadata: ProductsResponse;
}) => {
  const { productsWithFiltersAndMetadata } = options;

  const { filters, filters_meta, onFilterChange, onFilterClear } =
    useProductsFilterV2({
      productsWithFiltersAndMetadata,
    });

  const [fetchProducts] = useProductsLazyQuery({
    fetchPolicy: "network-only",
  });

  const getProducts = useCallback(
    async ({ pageParam }: { pageParam: number }) => {
      const filtersToVariables: ProductsFilterInput = {
        categories: filters.categories,
        materials: filters.materials,
        collection_ids:
          filters.collection_ids.length > 0 ? filters.collection_ids : null,
        order_by: filters.sort,
        search: filters.search,
        min_price: filters.min_price,
        max_price: filters.max_price,
        archive: filters.archive,
        page: pageParam,
        limit: DEFAULT_PAGE_SIZE,
      };

      const { data } = await fetchProducts({
        variables: {
          filter: filtersToVariables,
        },
      });

      if (!data) {
        return {
          page: pageParam,
          total_pages: 0,
          products: [],
          total: 0,
          filter_meta: {
            categories: [],
            materials: [],
            collections: [],
            price_range: { min: 0, max: 0 },
            price_histogram: [],
          },
        };
      }

      const products = data.products.products;
      const filter_meta = data.products.meta;
      const total_pages = data.products.total_pages;
      const total_products = data.products.total_products;

      return {
        page: pageParam,
        total_pages,
        products,
        total: total_products,
        filter_meta,
      };
    },
    [fetchProducts, filters],
  );

  const getNextPageParam = useCallback(
    (lastPage: { page: number; total_pages: number }) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    [],
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["products", ...Object.values(filters).toSorted()],
      queryFn: getProducts,
      initialPageParam: 1,
      getNextPageParam: getNextPageParam,
      initialData: {
        pages: [
          {
            products: productsWithFiltersAndMetadata.products,
            total_pages: productsWithFiltersAndMetadata.total_pages,
            page: 1,
            total: productsWithFiltersAndMetadata.total_products,
            filter_meta: productsWithFiltersAndMetadata.meta,
          },
        ],
        pageParams: [1],
      },
      staleTime: 0,
    });

  const debouncedFetchNextPage = useDebouncedCallback(fetchNextPage, 500);

  const { ref: fetchNextProductsPageRef, inView } = useInView({
    threshold: 0,
    rootMargin: DEFAULT_ROOT_MARGIN,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
      debouncedFetchNextPage();
    }
  }, [
    inView,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    debouncedFetchNextPage,
  ]);

  const products = useMemo(() => {
    const visitedProducts = new Set<string>();

    const allProducts = data.pages.flatMap((page) => [
      ...page.products.map((product) => ({
        ...product,
        page: page.page,
      })),
    ]);

    const products = allProducts.filter((product) => {
      if (visitedProducts.has(`${product.id}-${product.page}`)) {
        return false;
      }
      visitedProducts.add(`${product.id}-${product.page}`);
      return true;
    });

    return products;
  }, [data.pages]);

  return {
    products,
    hasNextProductsPage: hasNextPage ?? false,
    isFetchingProducts: isFetchingNextPage ?? isLoading,
    filterMetadata: {
      ...filters_meta,
      total_products: data.pages[0]?.total ?? 0,
      total_pages: data.pages[0]?.total_pages ?? 0,
      page: data.pages.length,
    },
    filters,
    onFilterChange,
    onFilterClear,
    fetchNextProductsPageRef,
  };
};
