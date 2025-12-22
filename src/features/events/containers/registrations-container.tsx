"use client";

import { useMemo } from "react";

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

  return <Registrations viewModel={viewModel} loadMoreRef={loadMoreRef} />;
}
