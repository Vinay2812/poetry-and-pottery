"use client";

import { useMemo } from "react";

import { AllEvents } from "../components/all-events";
import { useAllEventsQuery } from "../hooks/use-all-events-query";
import type { AllEventsContainerProps, AllEventsViewModel } from "../types";

export function AllEventsContainer({
  initialUpcomingEvents,
  initialUpcomingPagination,
  initialPastEvents,
  initialPastPagination,
}: AllEventsContainerProps) {
  const { upcomingEvents, pastEvents, hasMore, isLoading, loadMoreRef } =
    useAllEventsQuery({
      initialUpcomingEvents,
      initialUpcomingPagination,
      initialPastEvents,
      initialPastPagination,
    });

  // Build the view model
  const viewModel: AllEventsViewModel = useMemo(() => {
    const hasUpcoming = upcomingEvents.length > 0;
    const hasPast = pastEvents.length > 0;

    return {
      upcomingEvents,
      pastEvents,
      hasUpcoming,
      hasPast,
      hasNoEvents: !hasUpcoming && !hasPast,
      hasMore,
      isLoading,
    };
  }, [upcomingEvents, pastEvents, hasMore, isLoading]);

  return <AllEvents viewModel={viewModel} loadMoreRef={loadMoreRef} />;
}
