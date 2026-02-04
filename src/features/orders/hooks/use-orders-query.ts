"use client";

import { DEFAULT_ROOT_MARGIN } from "@/consts/performance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { useOrdersLazyQuery } from "@/graphql/generated/graphql";
import type { Order } from "@/graphql/generated/types";

interface PaginationData {
  total: number;
  totalPages: number;
}

interface UseOrdersQueryOptions {
  initialOrders: Order[];
  initialPagination: PaginationData;
  searchQuery?: string;
}

const ORDERS_PER_PAGE = 10;

export function useOrdersQuery({
  initialOrders,
  initialPagination,
  searchQuery,
}: UseOrdersQueryOptions) {
  const [fetchGraphQL] = useOrdersLazyQuery({
    fetchPolicy: "network-only",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["orders", searchQuery],
      staleTime: 0,
      refetchOnMount: "always",
      queryFn: async ({ pageParam = 1 }) => {
        // GraphQL mode: use Apollo lazy query
        const { data: gqlData } = await fetchGraphQL({
          variables: {
            filter: {
              page: pageParam,
              limit: ORDERS_PER_PAGE,
              search: searchQuery,
            },
          },
        });

        const orders = gqlData?.orders;
        return {
          data: (orders?.data ?? []) as Order[],
          total: orders?.total ?? 0,
          page: orders?.page ?? pageParam,
          total_pages: orders?.total_pages ?? 0,
        };
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      initialData: {
        pages: [
          {
            data: initialOrders,
            total: initialPagination.total,
            page: 1,
            total_pages: initialPagination.totalPages,
          },
        ],
        pageParams: [1],
      },
    });

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: DEFAULT_ROOT_MARGIN,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten and dedupe orders
  const orders = useMemo(() => {
    const allOrders = data?.pages.flatMap((page) => page.data) ?? [];
    const seen = new Set<string>();
    return allOrders.filter((order) => {
      const orderId = String(order.id);
      if (seen.has(orderId)) return false;
      seen.add(orderId);
      return true;
    });
  }, [data]);

  return {
    orders,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    loadMoreRef,
  };
}
