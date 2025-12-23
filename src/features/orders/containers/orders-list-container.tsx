"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback, useMemo } from "react";

import { OrdersList } from "../components/orders-list";
import { useOrdersQuery } from "../hooks/use-orders-query";
import type { OrdersListContainerProps, OrdersListViewModel } from "../types";
import { buildOrderCardViewModel } from "../types";

export function OrdersListContainer({
  initialOrders,
  initialPagination,
}: OrdersListContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const { orders, hasNextPage, isFetchingNextPage, loadMoreRef } =
    useOrdersQuery({
      initialOrders,
      initialPagination,
      searchQuery: searchQuery || undefined,
    });

  const handleSearchChange = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }
      startTransition(() => {
        router.push(`/orders?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  // Build the view model
  const viewModel: OrdersListViewModel = useMemo(() => {
    return {
      orders: orders.map(buildOrderCardViewModel),
      hasOrders: orders.length > 0,
      hasMore: hasNextPage,
      isLoading: isFetchingNextPage,
      searchQuery,
    };
  }, [orders, hasNextPage, isFetchingNextPage, searchQuery]);

  return (
    <OrdersList
      viewModel={viewModel}
      loadMoreRef={loadMoreRef}
      onSearchChange={handleSearchChange}
    />
  );
}
