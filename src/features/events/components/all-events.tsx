"use client";

import { Calendar, Sparkles } from "lucide-react";

import { EventCard, PastWorkshopCard } from "@/components/cards";
import { EventsListLayout } from "@/components/events";
import { EventsSubTabs } from "@/components/events/events-sub-tabs";
import { EmptyState } from "@/components/sections";
import { InfiniteScrollTrigger, StaggeredGrid } from "@/components/shared";

import type { AllEventsProps, AllEventsSubTab } from "../types";

export function AllEvents({
  viewModel,
  loadMoreRef,
  activeSubTab,
  onSubTabChange,
  sortBy,
  onSortChange,
  eventTypeFilter,
  onEventTypeFilterChange,
  searchQuery,
  onSearchChange,
  queryString,
  pastEventsLoading,
  pastEventsSkeleton,
}: AllEventsProps) {
  const {
    upcomingEvents,
    pastEvents,
    activeSubTab: activeViewSubTab,
    hasNoEvents,
    hasMore,
    isLoading,
    totalEvents,
  } = viewModel;

  const isUpcomingTab = activeViewSubTab === "upcoming";
  const subTabOptions = [
    { value: "upcoming", label: "Upcoming", count: upcomingEvents.length },
    { value: "past", label: "Past", count: pastEvents.length },
  ];

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
      <EventsSubTabs
        activeTab={activeSubTab}
        options={subTabOptions}
        onTabChange={(value) => onSubTabChange(value as AllEventsSubTab)}
      />

      {hasNoEvents ? (
        <EmptyState
          icon={isUpcomingTab ? Calendar : Sparkles}
          title={
            isUpcomingTab
              ? "No upcoming events available"
              : "No past events yet"
          }
          description={
            isUpcomingTab
              ? "Check back soon for new workshops and events."
              : "Past events will appear here once sessions are completed."
          }
        />
      ) : (
        <div className="space-y-8 lg:space-y-12">
          {isUpcomingTab ? (
            <section>
              <h2 className="font-display mb-4 text-lg font-semibold text-neutral-900 lg:mb-6 lg:text-xl dark:text-neutral-100">
                Upcoming Events
              </h2>
              <StaggeredGrid className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </StaggeredGrid>
            </section>
          ) : (
            <>
              {pastEventsLoading && pastEventsSkeleton}
              {!pastEventsLoading && (
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
            </>
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
