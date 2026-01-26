"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";

import { GlobalSearch } from "../components/global-search";
import { useGlobalSearch } from "../hooks/use-global-search";

export function GlobalSearchContainer() {
  const router = useRouter();
  const { startNavigation } = useRouteAnimation();
  const {
    viewModel,
    handleOpen,
    handleClose,
    handleQueryChange,
    handleTabChange,
  } = useGlobalSearch();

  const handleProductClick = useCallback(
    (id: number) => {
      handleClose();
      startNavigation(() => {
        router.push(`/products/${id}`);
      });
    },
    [handleClose, router, startNavigation],
  );

  const handleEventClick = useCallback(
    (eventId: string) => {
      handleClose();
      startNavigation(() => {
        router.push(`/events/${eventId}`);
      });
    },
    [handleClose, router, startNavigation],
  );

  const handleOrderClick = useCallback(
    (orderId: string) => {
      handleClose();
      startNavigation(() => {
        router.push(`/orders/${orderId}`);
      });
    },
    [handleClose, router, startNavigation],
  );

  const handleViewAllProducts = useCallback(() => {
    handleClose();
    startNavigation(() => {
      router.push(
        `/products?search=${encodeURIComponent(viewModel.searchQuery)}`,
      );
    });
  }, [handleClose, router, startNavigation, viewModel.searchQuery]);

  const handleViewAllEvents = useCallback(() => {
    handleClose();
    startNavigation(() => {
      router.push(
        `/events?search=${encodeURIComponent(viewModel.searchQuery)}`,
      );
    });
  }, [handleClose, router, startNavigation, viewModel.searchQuery]);

  const handleViewAllOrders = useCallback(() => {
    handleClose();
    startNavigation(() => {
      router.push(
        `/orders?search=${encodeURIComponent(viewModel.searchQuery)}`,
      );
    });
  }, [handleClose, router, startNavigation, viewModel.searchQuery]);

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
