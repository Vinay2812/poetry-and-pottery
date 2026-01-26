"use client";

import { Calendar, History, Sparkles } from "lucide-react";

import { EventCard, PastWorkshopCard } from "@/components/cards";
import { EventsListLayout } from "@/components/events";
import { EmptyState } from "@/components/sections";
import {
  InfiniteScrollTrigger,
  SectionHeader,
  StaggeredGrid,
} from "@/components/shared";

import type { AllEventsProps } from "../types";

export function AllEvents({
  viewModel,
  loadMoreRef,
  onSearchChange,
  pastEventsLoading,
  pastEventsSkeleton,
}: AllEventsProps) {
  const {
    upcomingEvents,
    pastEvents,
    hasUpcoming,
    hasPast,
    hasNoEvents,
    hasMore,
    isLoading,
    searchQuery,
  } = viewModel;

  return (
    <EventsListLayout
      onSearchChange={onSearchChange}
      searchQuery={searchQuery}
      searchPlaceholder="Search events..."
    >
      {hasNoEvents ? (
        <EmptyState
          icon={Calendar}
          title="No events available"
          description="Check back soon for new workshops and events."
        />
      ) : (
        <div className="space-y-8 lg:space-y-16">
          {/* Upcoming Events Section */}
          <section>
            <SectionHeader
              icon={Sparkles}
              iconClassName="text-primary"
              title="Upcoming Events"
            />
            {hasUpcoming ? (
              <>
                <p className="text-muted-foreground mb-4 text-sm lg:mb-8 lg:text-base">
                  Reserve your spot in one of our upcoming pottery sessions.
                </p>
                <StaggeredGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </StaggeredGrid>
              </>
            ) : (
              <div className="bg-muted/50 rounded-xl border border-dashed p-8 text-center">
                <Sparkles className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                <p className="text-muted-foreground text-sm">
                  No upcoming events at the moment. Check back soon!
                </p>
              </div>
            )}
          </section>

          {/* Past Events Section */}
          {pastEventsLoading && pastEventsSkeleton}
          {!pastEventsLoading && hasPast && (
            <section>
              <SectionHeader
                icon={History}
                iconClassName="text-neutral-400"
                title="Past Events"
                titleClassName="text-neutral-400"
              />
              <p className="mb-4 text-sm text-neutral-400 lg:mb-8 lg:text-base">
                Explore our previous workshops and the amazing pieces created by
                our community.
              </p>
              <StaggeredGrid className="grid grid-cols-1 gap-4 opacity-75 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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
