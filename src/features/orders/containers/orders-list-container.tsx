"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback, useMemo } from "react";

import { OrdersList } from "../components/orders-list";
import { useOrdersQuery } from "../hooks/use-orders-query";
import type {
  OrderStatusFilter,
  OrdersListContainerProps,
  OrdersListViewModel,
} from "../types";
import { OrderStatus, buildOrderCardViewModel } from "../types";

// Map filter values to API status values
const FILTER_TO_STATUS: Record<OrderStatusFilter, OrderStatus | null> = {
  all: null,
  processing: OrderStatus.Processing,
  shipped: OrderStatus.Shipped,
  delivered: OrderStatus.Delivered,
  cancelled: OrderStatus.Cancelled,
};

export function OrdersListContainer({
  initialOrders,
  initialPagination,
}: OrdersListContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const statusFilter =
    (searchParams.get("status") as OrderStatusFilter) || "all";

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

  const handleStatusFilterChange = useCallback(
    (status: OrderStatusFilter) => {
      const params = new URLSearchParams(searchParams.toString());
      if (status === "all") {
        params.delete("status");
      } else {
        params.set("status", status);
      }
      // Reset to first page when changing filter
      params.delete("page");
      startTransition(() => {
        router.push(`/orders?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  // Filter orders based on status (client-side filtering for immediate feedback)
  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders;
    const targetStatus = FILTER_TO_STATUS[statusFilter];
    if (!targetStatus) return orders;
    return orders.filter((order) => order.status === targetStatus);
  }, [orders, statusFilter]);

  // Build the view model
  const viewModel: OrdersListViewModel = useMemo(() => {
    return {
      orders: filteredOrders.map(buildOrderCardViewModel),
      hasOrders: filteredOrders.length > 0,
      hasMore: hasNextPage,
      isLoading: isFetchingNextPage,
      searchQuery,
      statusFilter,
    };
  }, [
    filteredOrders,
    hasNextPage,
    isFetchingNextPage,
    searchQuery,
    statusFilter,
  ]);

  return (
    <OrdersList
      viewModel={viewModel}
      loadMoreRef={loadMoreRef}
      onSearchChange={handleSearchChange}
      onStatusFilterChange={handleStatusFilterChange}
    />
  );
}
