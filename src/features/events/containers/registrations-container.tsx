"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { Registrations } from "../components/registrations";
import { useEventFilters } from "../hooks/use-event-filters";
import { useRegistrationsQuery } from "../hooks/use-registrations-query";
import type {
  RegistrationsContainerProps,
  RegistrationsViewModel,
} from "../types";
import { filterDailyWorkshopRegistrations } from "../utils/filter-daily-workshop-registrations";

export function RegistrationsContainer({
  initialUpcomingRegistrations,
  initialUpcomingPagination,
  initialCompletedRegistrations,
  initialCompletedPagination,
  initialUpcomingDailyWorkshopRegistrations,
  initialCompletedDailyWorkshopRegistrations,
  upcomingEvents = [],
}: RegistrationsContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { filters, setSearch, getQueryString } = useEventFilters();
  const { search: searchQuery } = filters;
  const activeSubTab = useMemo(() => {
    const tab = searchParams.get("reg_tab");
    return tab === "completed" ? "completed" : "upcoming";
  }, [searchParams]);

  const handleSubTabChange = useCallback(
    (tab: "upcoming" | "completed") => {
      const params = new URLSearchParams(searchParams.toString());
      if (tab === "upcoming") {
        params.delete("reg_tab");
      } else {
        params.set("reg_tab", "completed");
      }

      const query = params.toString();
      const nextUrl = query ? `${pathname}?${query}` : pathname;
      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const {
    upcomingRegistrations: upcomingEventRegistrations,
    completedRegistrations: completedEventRegistrations,
    hasMoreUpcoming,
    hasMoreCompleted,
    isLoadingUpcoming,
    isLoadingCompleted,
    loadMoreRef,
  } = useRegistrationsQuery({
    initialUpcomingRegistrations,
    initialUpcomingPagination,
    initialCompletedRegistrations,
    initialCompletedPagination,
    searchQuery: searchQuery || undefined,
    activeTab: activeSubTab,
  });

  const filteredUpcomingDailyWorkshopRegistrations = useMemo(
    () =>
      filterDailyWorkshopRegistrations(
        initialUpcomingDailyWorkshopRegistrations,
        searchQuery,
      ),
    [initialUpcomingDailyWorkshopRegistrations, searchQuery],
  );

  const filteredCompletedDailyWorkshopRegistrations = useMemo(
    () =>
      filterDailyWorkshopRegistrations(
        initialCompletedDailyWorkshopRegistrations,
        searchQuery,
      ),
    [initialCompletedDailyWorkshopRegistrations, searchQuery],
  );

  // Build the view model
  const viewModel: RegistrationsViewModel = useMemo(() => {
    const hasUpcomingEventRegistrations = upcomingEventRegistrations.length > 0;
    const hasCompletedEventRegistrations =
      completedEventRegistrations.length > 0;
    const hasUpcomingDailyWorkshopRegistrations =
      filteredUpcomingDailyWorkshopRegistrations.length > 0;
    const hasCompletedDailyWorkshopRegistrations =
      filteredCompletedDailyWorkshopRegistrations.length > 0;

    return {
      upcomingEventRegistrations,
      completedEventRegistrations,
      upcomingDailyWorkshopRegistrations:
        filteredUpcomingDailyWorkshopRegistrations,
      completedDailyWorkshopRegistrations:
        filteredCompletedDailyWorkshopRegistrations,
      upcomingEvents,
      hasAnyUpcomingContent:
        hasUpcomingEventRegistrations || hasUpcomingDailyWorkshopRegistrations,
      hasAnyCompletedContent:
        hasCompletedEventRegistrations ||
        hasCompletedDailyWorkshopRegistrations,
      hasUpcomingEvents: upcomingEvents.length > 0,
      hasMore: activeSubTab === "upcoming" ? hasMoreUpcoming : hasMoreCompleted,
      isLoading:
        activeSubTab === "upcoming" ? isLoadingUpcoming : isLoadingCompleted,
    };
  }, [
    activeSubTab,
    upcomingEventRegistrations,
    completedEventRegistrations,
    filteredUpcomingDailyWorkshopRegistrations,
    filteredCompletedDailyWorkshopRegistrations,
    upcomingEvents,
    hasMoreUpcoming,
    hasMoreCompleted,
    isLoadingUpcoming,
    isLoadingCompleted,
  ]);

  return (
    <Registrations
      viewModel={viewModel}
      loadMoreRef={loadMoreRef}
      activeSubTab={activeSubTab}
      onSubTabChange={handleSubTabChange}
      searchQuery={searchQuery}
      onSearchChange={setSearch}
      queryString={getQueryString()}
    />
  );
}
