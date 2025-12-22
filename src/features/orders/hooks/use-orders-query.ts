"use client";

import { getOrders } from "@/actions";
import type { OrderWithItems } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

interface PaginationData {
  total: number;
  totalPages: number;
}

interface UseOrdersQueryOptions {
  initialOrders: OrderWithItems[];
  initialPagination: PaginationData;
}

export function useOrdersQuery({
  initialOrders,
  initialPagination,
}: UseOrdersQueryOptions) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["orders"],
      queryFn: async ({ pageParam = 1 }) => {
        const result = await getOrders(pageParam);
        if (!result.success) {
          throw new Error(result.error);
        }
        return result.data;
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
            data: initialOrders,
            total: initialPagination.total,
            page: 1,
            totalPages: initialPagination.totalPages,
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
