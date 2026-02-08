"use client";

import { Calendar } from "lucide-react";

import {
  CompletedEventCard,
  EventCard,
  RegisteredEventCard,
} from "@/components/cards";
import { EventsListLayout } from "@/components/events";
import { EventsSubTabs } from "@/components/events/events-sub-tabs";
import { EmptyState } from "@/components/sections";
import { InfiniteScrollTrigger } from "@/components/shared";

import type { RegistrationsProps, RegistrationsSubTab } from "../types";
import { DailyWorkshopRegistrationCard } from "./daily-workshop-registration-card";

export function Registrations({
  viewModel,
  loadMoreRef,
  activeSubTab,
  onSubTabChange,
  searchQuery,
  onSearchChange,
  queryString,
}: RegistrationsProps) {
  const {
    upcomingEventRegistrations,
    completedEventRegistrations,
    upcomingDailyWorkshopRegistrations,
    completedDailyWorkshopRegistrations,
    upcomingEvents,
    hasAnyUpcomingContent,
    hasAnyCompletedContent,
    hasUpcomingEvents,
    hasMore,
    isLoading,
  } = viewModel;
  const isUpcomingTab = activeSubTab === "upcoming";
  const subTabOptions = [
    {
      value: "upcoming",
      label: "Upcoming",
      count:
        upcomingDailyWorkshopRegistrations.length +
        upcomingEventRegistrations.length,
    },
    {
      value: "completed",
      label: "Completed",
      count:
        completedDailyWorkshopRegistrations.length +
        completedEventRegistrations.length,
    },
  ];

  return (
    <EventsListLayout
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      queryString={queryString}
    >
      <EventsSubTabs
        activeTab={activeSubTab}
        options={subTabOptions}
        onTabChange={(value) => onSubTabChange(value as RegistrationsSubTab)}
      />

      {isUpcomingTab && !hasAnyUpcomingContent ? (
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
                actionText="Browse Events"
                actionHref="/events"
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
          {isUpcomingTab ? (
            <>
              {upcomingDailyWorkshopRegistrations.length > 0 && (
                <section>
                  <h2 className="font-display mb-4 text-lg font-semibold text-neutral-900 lg:mb-6 lg:text-xl dark:text-neutral-100">
                    Daily Workshops
                  </h2>
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
                    {upcomingDailyWorkshopRegistrations.map((registration) => (
                      <DailyWorkshopRegistrationCard
                        key={registration.id}
                        registration={registration}
                        variant="upcoming"
                      />
                    ))}
                  </div>
                </section>
              )}

              {upcomingEventRegistrations.length > 0 && (
                <section>
                  <h2 className="font-display mb-4 text-lg font-semibold text-neutral-900 lg:mb-6 lg:text-xl dark:text-neutral-100">
                    Event Registrations
                  </h2>
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
                    {upcomingEventRegistrations.map((registration) => (
                      <RegisteredEventCard
                        key={registration.id}
                        registration={registration}
                      />
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <>
              {!hasAnyCompletedContent && (
                <div className="border-border bg-muted/30 flex min-h-[150px] items-center justify-center rounded-2xl border border-dashed p-6">
                  <EmptyState
                    icon={Calendar}
                    title="No Completed Registrations"
                    description="Completed workshops and events will appear here once your sessions are done."
                  />
                </div>
              )}

              {completedDailyWorkshopRegistrations.length > 0 && (
                <section>
                  <h2 className="font-display mb-4 text-lg font-semibold text-neutral-500 lg:mb-6 lg:text-xl dark:text-neutral-400">
                    Completed Daily Workshops
                  </h2>
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
                    {completedDailyWorkshopRegistrations.map((registration) => (
                      <DailyWorkshopRegistrationCard
                        key={registration.id}
                        registration={registration}
                        variant="completed"
                      />
                    ))}
                  </div>
                </section>
              )}

              {completedEventRegistrations.length > 0 && (
                <section>
                  <h2 className="font-display mb-4 text-lg font-semibold text-neutral-500 lg:mb-6 lg:text-xl dark:text-neutral-400">
                    Completed Events
                  </h2>
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
                    {completedEventRegistrations.map((registration) => (
                      <CompletedEventCard
                        key={registration.id}
                        registration={registration}
                      />
                    ))}
                  </div>
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
