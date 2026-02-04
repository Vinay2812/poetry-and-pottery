"use client";

import { Calendar, Sparkles } from "lucide-react";

import { EventCard, PastWorkshopCard } from "@/components/cards";
import { type EventSortOption, EventsListLayout } from "@/components/events";
import { EmptyState } from "@/components/sections";
import { InfiniteScrollTrigger, StaggeredGrid } from "@/components/shared";

import type { AllEventsProps } from "../types";

export function AllEvents({
  viewModel,
  loadMoreRef,
  sortBy,
  onSortChange,
  eventTypeFilter,
  onEventTypeFilterChange,
  searchQuery,
  onSearchChange,
  queryString,
  pastEventsLoading,
  pastEventsSkeleton,
  registeredEventIds,
  showQuickReserve,
  onQuickReserve,
  isQuickReserveLoading,
}: AllEventsProps) {
  const {
    upcomingEvents,
    pastEvents,
    hasUpcoming,
    hasPast,
    hasNoEvents,
    hasMore,
    isLoading,
    totalEvents,
  } = viewModel;

  return (
    <EventsListLayout
      totalEvents={totalEvents}
      sortBy={sortBy}
      onSortChange={onSortChange}
      eventTypeFilter={eventTypeFilter}
      onEventTypeFilterChange={onEventTypeFilterChange}
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      queryString={queryString}
    >
      {hasNoEvents ? (
        <EmptyState
          icon={Calendar}
          title="No events available"
          description="Check back soon for new workshops and events."
        />
      ) : (
        <div className="space-y-8 lg:space-y-12">
          {/* Upcoming Events Section */}
          {hasUpcoming ? (
            <section>
              <h2 className="font-display mb-4 text-lg font-semibold text-neutral-900 lg:mb-6 lg:text-xl dark:text-neutral-100">
                Upcoming Events
              </h2>
              <StaggeredGrid className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isRegistered={registeredEventIds?.has(event.id)}
                    showQuickReserve={showQuickReserve}
                    onQuickReserve={onQuickReserve}
                    isQuickReserveLoading={isQuickReserveLoading?.(event.id)}
                  />
                ))}
              </StaggeredGrid>
            </section>
          ) : (
            <div className="bg-muted/50 rounded-xl border border-dashed p-8 text-center">
              <Sparkles className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
              <p className="text-muted-foreground text-sm">
                No upcoming events at the moment. Check back soon!
              </p>
            </div>
          )}

          {/* Past Events Section */}
          {pastEventsLoading && pastEventsSkeleton}
          {!pastEventsLoading && hasPast && (
            <section>
              <h2 className="font-display mb-4 text-lg font-semibold text-neutral-500 lg:mb-6 lg:text-xl dark:text-neutral-400">
                Past Events
              </h2>
              <StaggeredGrid className="grid grid-cols-1 gap-4 opacity-75 xl:grid-cols-2 xl:gap-6">
                {pastEvents.map((event) => (
                  <PastWorkshopCard key={event.id} event={event} />
                ))}
              </StaggeredGrid>
            </section>
          )}

          {/* Load more trigger */}
          <InfiniteScrollTrigger
            hasMore={hasMore}
            isLoading={isLoading}
            loadMoreRef={loadMoreRef}
          />
        </div>
      )}
    </EventsListLayout>
  );
}
