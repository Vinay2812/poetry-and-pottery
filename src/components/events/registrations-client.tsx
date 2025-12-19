"use client";

import type { RegistrationWithReviewStatus } from "@/actions";
import type {
  EventWithRegistrationCount,
  RegistrationWithEvent,
} from "@/types";
import { Calendar, CheckCircle2, Ticket } from "lucide-react";

import {
  CompletedEventCard,
  EventCard,
  RegisteredEventCard,
} from "@/components/cards";
import { EventsListLayout } from "@/components/events";
import { EmptyState } from "@/components/sections";

interface RegistrationsClientProps {
  upcomingRegistrations: RegistrationWithEvent[];
  completedRegistrations: RegistrationWithReviewStatus[];
  upcomingEvents?: EventWithRegistrationCount[];
}

export function RegistrationsClient({
  upcomingRegistrations,
  completedRegistrations,
  upcomingEvents = [],
}: RegistrationsClientProps) {
  const hasUpcomingRegistrations = upcomingRegistrations.length > 0;
  const hasCompletedRegistrations = completedRegistrations.length > 0;
  const hasAnyRegistrations =
    hasUpcomingRegistrations || hasCompletedRegistrations;
  const hasUpcomingEvents = upcomingEvents.length > 0;

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
        <div className="space-y-8">
          {/* Upcoming Registrations Section */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50">
                <Ticket className="h-4 w-4 text-sky-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Upcoming Events
                </h2>
                <p className="text-xs text-gray-500">
                  Your registered workshops that haven&apos;t started yet
                </p>
              </div>
            </div>
            {hasUpcomingRegistrations ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingRegistrations.map((registration) => (
                  <RegisteredEventCard
                    key={registration.id}
                    registration={registration}
                  />
                ))}
              </div>
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
          </section>

          {/* Completed Registrations Section */}
          {hasCompletedRegistrations && (
            <section>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Completed Events
                  </h2>
                  <p className="text-xs text-gray-500">
                    Past workshops you attended - share your experience!
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {completedRegistrations.map((registration) => (
                  <CompletedEventCard
                    key={registration.id}
                    registration={registration}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </EventsListLayout>
  );
}
