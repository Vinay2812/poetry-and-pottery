"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback, useMemo } from "react";

import { Registrations } from "../components/registrations";
import { useRegistrationsQuery } from "../hooks/use-registrations-query";
import type {
  RegistrationsContainerProps,
  RegistrationsViewModel,
} from "../types";

export function RegistrationsContainer({
  initialUpcomingRegistrations,
  initialUpcomingPagination,
  initialCompletedRegistrations,
  initialCompletedPagination,
  upcomingEvents = [],
}: RegistrationsContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const {
    upcomingRegistrations,
    completedRegistrations,
    hasMore,
    isLoading,
    loadMoreRef,
  } = useRegistrationsQuery({
    initialUpcomingRegistrations,
    initialUpcomingPagination,
    initialCompletedRegistrations,
    initialCompletedPagination,
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
        router.push(`/events?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  // Build the view model
  const viewModel: RegistrationsViewModel = useMemo(() => {
    const hasUpcomingRegistrations = upcomingRegistrations.length > 0;
    const hasCompletedRegistrations = completedRegistrations.length > 0;

    return {
      upcomingRegistrations,
      completedRegistrations,
      upcomingEvents,
      hasUpcomingRegistrations,
      hasCompletedRegistrations,
      hasAnyRegistrations:
        hasUpcomingRegistrations || hasCompletedRegistrations,
      hasUpcomingEvents: upcomingEvents.length > 0,
      hasMore,
      isLoading,
      searchQuery: searchQuery || "",
    };
  }, [
    upcomingRegistrations,
    completedRegistrations,
    upcomingEvents,
    hasMore,
    isLoading,
    searchQuery,
  ]);

  return (
    <Registrations
      viewModel={viewModel}
      loadMoreRef={loadMoreRef}
      onSearchChange={handleSearchChange}
    />
  );
}
