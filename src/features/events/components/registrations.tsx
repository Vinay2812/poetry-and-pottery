"use client";

import { Calendar } from "lucide-react";

import {
  CompletedEventCard,
  EventCard,
  RegisteredEventCard,
} from "@/components/cards";
import { EventsListLayout } from "@/components/events";
import { EmptyState } from "@/components/sections";
import { InfiniteScrollTrigger } from "@/components/shared";

import type { RegistrationsProps } from "../types";

export function Registrations({ viewModel, loadMoreRef }: RegistrationsProps) {
  const {
    upcomingRegistrations,
    completedRegistrations,
    upcomingEvents,
    hasUpcomingRegistrations,
    hasCompletedRegistrations,
    hasAnyRegistrations,
    hasUpcomingEvents,
    hasMore,
    isLoading,
  } = viewModel;

  return (
    <EventsListLayout>
      {!hasAnyRegistrations ? (
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Empty State */}
          <div
            className={hasUpcomingEvents ? "lg:col-span-2" : "lg:col-span-5"}
          >
            <div className="border-border bg-muted/30 flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed p-6">
              <EmptyState
                icon={Calendar}
                title="No Registrations Yet"
                description="You haven't registered for any workshops yet. Browse our upcoming sessions to get started!"
                actionText="Browse All Workshops"
                actionHref="/events/upcoming"
              />
            </div>
          </div>

          {/* Upcoming Events */}
          {hasUpcomingEvents && (
            <div className="lg:col-span-3">
              <h3 className="mb-4 text-lg font-semibold">Upcoming Workshops</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {upcomingEvents.slice(0, 4).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8 lg:space-y-12">
          {/* Upcoming Registrations Section */}
          {hasUpcomingRegistrations ? (
            <section>
              <h2 className="font-display mb-4 text-lg font-semibold text-neutral-900 lg:mb-6 lg:text-xl dark:text-neutral-100">
                Upcoming Registrations
              </h2>
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
                {upcomingRegistrations.map((registration) => (
                  <RegisteredEventCard
                    key={registration.id}
                    registration={registration}
                  />
                ))}
              </div>
            </section>
          ) : (
            <div className="border-border bg-muted/30 flex min-h-[150px] items-center justify-center rounded-2xl border border-dashed p-6">
              <EmptyState
                icon={Calendar}
                title="No Active Registrations"
                description="You don't have any upcoming workshop registrations. Browse our workshops to find your next creative experience!"
                actionText="Browse Workshops"
                actionHref="/events/upcoming"
              />
            </div>
          )}

          {/* Completed Registrations Section */}
          {hasCompletedRegistrations && (
            <section>
              <h2 className="font-display mb-4 text-lg font-semibold text-neutral-500 lg:mb-6 lg:text-xl dark:text-neutral-400">
                Completed Events
              </h2>
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
                {completedRegistrations.map((registration) => (
                  <CompletedEventCard
                    key={registration.id}
                    registration={registration}
                  />
                ))}
              </div>
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
