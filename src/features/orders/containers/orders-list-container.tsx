"use client";

import { useMemo } from "react";

import { OrdersList } from "../components/orders-list";
import { useOrdersQuery } from "../hooks/use-orders-query";
import type { OrdersListContainerProps, OrdersListViewModel } from "../types";
import { buildOrderCardViewModel } from "../types";

export function OrdersListContainer({
  initialOrders,
  initialPagination,
}: OrdersListContainerProps) {
  const { orders, hasNextPage, isFetchingNextPage, loadMoreRef } =
    useOrdersQuery({
      initialOrders,
      initialPagination,
    });

  // Build the view model
  const viewModel: OrdersListViewModel = useMemo(() => {
    return {
      orders: orders.map(buildOrderCardViewModel),
      hasOrders: orders.length > 0,
      hasMore: hasNextPage,
      isLoading: isFetchingNextPage,
    };
  }, [orders, hasNextPage, isFetchingNextPage]);

  return <OrdersList viewModel={viewModel} loadMoreRef={loadMoreRef} />;
}
