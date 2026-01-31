"use client";

import { useMemo } from "react";

import { Registrations } from "../components/registrations";
import { useEventFilters } from "../hooks/use-event-filters";
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
  const { filters, setSearch, getQueryString } = useEventFilters();
  const { search: searchQuery } = filters;

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
    };
  }, [
    upcomingRegistrations,
    completedRegistrations,
    upcomingEvents,
    hasMore,
    isLoading,
  ]);

  return (
    <Registrations
      viewModel={viewModel}
      loadMoreRef={loadMoreRef}
      searchQuery={searchQuery}
      onSearchChange={setSearch}
      queryString={getQueryString()}
    />
  );
}
