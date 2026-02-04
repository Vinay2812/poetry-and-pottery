import { DEFAULT_EVENTS_LIMIT, DEFAULT_PAGE_SIZE } from "@/consts/performance";
import {
  getCompletedRegistrations,
  getUpcomingEvents,
  getUpcomingRegistrations,
} from "@/data/events/gateway/server";
import { RegistrationsContainer } from "@/features/events";
import type { Metadata } from "next";
import { Suspense } from "react";

import { RegistrationsSkeleton } from "@/components/skeletons";

export const metadata: Metadata = {
  title: "My Registrations | Poetry & Pottery",
  description:
    "View your workshop registrations, manage tickets, and track upcoming events.",
  robots: {
    index: false,
    follow: false,
  },
};

async function RegistrationsContent() {
  const [
    upcomingRegistrationsResult,
    completedRegistrationsResult,
    upcomingEventsResult,
  ] = await Promise.all([
    getUpcomingRegistrations({ page: 1, limit: DEFAULT_EVENTS_LIMIT }),
    getCompletedRegistrations({ page: 1, limit: DEFAULT_EVENTS_LIMIT }),
    getUpcomingEvents({ page: 1, limit: DEFAULT_EVENTS_LIMIT }),
  ]);

  const upcomingRegistrations = upcomingRegistrationsResult.success
    ? upcomingRegistrationsResult.data.data
    : [];
  const upcomingPagination = upcomingRegistrationsResult.success
    ? {
        total: upcomingRegistrationsResult.data.total,
        totalPages: upcomingRegistrationsResult.data.total_pages,
      }
    : { total: 0, totalPages: 0 };

  const completedRegistrations = completedRegistrationsResult.success
    ? completedRegistrationsResult.data.data
    : [];
  const completedPagination = completedRegistrationsResult.success
    ? {
        total: completedRegistrationsResult.data.total,
        totalPages: completedRegistrationsResult.data.total_pages,
      }
    : { total: 0, totalPages: 0 };

  const upcomingEvents = upcomingEventsResult.success
    ? upcomingEventsResult.data.data
    : [];

  return (
    <RegistrationsContainer
      initialUpcomingRegistrations={upcomingRegistrations}
      initialUpcomingPagination={upcomingPagination}
      initialCompletedRegistrations={completedRegistrations}
      initialCompletedPagination={completedPagination}
      upcomingEvents={upcomingEvents}
    />
  );
}

export default function RegistrationsPage() {
  return (
    <Suspense fallback={<RegistrationsSkeleton />}>
      <RegistrationsContent />
    </Suspense>
  );
}
