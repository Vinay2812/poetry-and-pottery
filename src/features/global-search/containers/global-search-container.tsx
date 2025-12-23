"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { GlobalSearch } from "../components/global-search";
import { useGlobalSearch } from "../hooks/use-global-search";

export function GlobalSearchContainer() {
  const router = useRouter();
  const {
    viewModel,
    handleOpen,
    handleClose,
    handleQueryChange,
    handleTabChange,
  } = useGlobalSearch();

  const handleProductClick = useCallback(
    (slug: string) => {
      handleClose();
      router.push(`/products/${slug}`);
    },
    [handleClose, router],
  );

  const handleEventClick = useCallback(
    (eventId: string) => {
      handleClose();
      router.push(`/events/${eventId}`);
    },
    [handleClose, router],
  );

  const handleOrderClick = useCallback(
    (orderId: string) => {
      handleClose();
      router.push(`/orders/${orderId}`);
    },
    [handleClose, router],
  );

  const handleViewAllProducts = useCallback(() => {
    handleClose();
    router.push(
      `/products?search=${encodeURIComponent(viewModel.searchQuery)}`,
    );
  }, [handleClose, router, viewModel.searchQuery]);

  const handleViewAllEvents = useCallback(() => {
    handleClose();
    router.push(`/events?search=${encodeURIComponent(viewModel.searchQuery)}`);
  }, [handleClose, router, viewModel.searchQuery]);

  const handleViewAllOrders = useCallback(() => {
    handleClose();
    router.push(`/orders?search=${encodeURIComponent(viewModel.searchQuery)}`);
  }, [handleClose, router, viewModel.searchQuery]);

  return {
    viewModel,
    handleOpen,
    handleClose,
    handleQueryChange,
    handleTabChange,
    handleProductClick,
    handleEventClick,
    handleOrderClick,
    handleViewAllProducts,
    handleViewAllEvents,
    handleViewAllOrders,
    GlobalSearchComponent: (
      <GlobalSearch
        viewModel={viewModel}
        onQueryChange={handleQueryChange}
        onTabChange={handleTabChange}
        onClose={handleClose}
        onProductClick={handleProductClick}
        onEventClick={handleEventClick}
        onOrderClick={handleOrderClick}
        onViewAllProducts={handleViewAllProducts}
        onViewAllEvents={handleViewAllEvents}
        onViewAllOrders={handleViewAllOrders}
      />
    ),
  };
}
