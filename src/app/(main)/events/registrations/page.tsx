import { DEFAULT_EVENTS_LIMIT } from "@/consts/performance";
import {
  getMyCompletedDailyWorkshopRegistrations,
  getMyUpcomingDailyWorkshopRegistrations,
} from "@/data/daily-workshops/gateway/server";
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
    upcomingDailyWorkshopRegistrationsResult,
    completedDailyWorkshopRegistrationsResult,
  ] = await Promise.all([
    getUpcomingRegistrations({ page: 1, limit: DEFAULT_EVENTS_LIMIT }),
    getCompletedRegistrations({ page: 1, limit: DEFAULT_EVENTS_LIMIT }),
    getUpcomingEvents({ page: 1, limit: DEFAULT_EVENTS_LIMIT }),
    getMyUpcomingDailyWorkshopRegistrations({
      page: 1,
      limit: DEFAULT_EVENTS_LIMIT,
    }),
    getMyCompletedDailyWorkshopRegistrations({
      page: 1,
      limit: DEFAULT_EVENTS_LIMIT,
    }),
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
  const upcomingDailyWorkshopRegistrations =
    upcomingDailyWorkshopRegistrationsResult.success
      ? upcomingDailyWorkshopRegistrationsResult.data.data
      : [];
  const completedDailyWorkshopRegistrations =
    completedDailyWorkshopRegistrationsResult.success
      ? completedDailyWorkshopRegistrationsResult.data.data
      : [];

  return (
    <RegistrationsContainer
      initialUpcomingRegistrations={upcomingRegistrations}
      initialUpcomingPagination={upcomingPagination}
      initialCompletedRegistrations={completedRegistrations}
      initialCompletedPagination={completedPagination}
      initialUpcomingDailyWorkshopRegistrations={
        upcomingDailyWorkshopRegistrations
      }
      initialCompletedDailyWorkshopRegistrations={
        completedDailyWorkshopRegistrations
      }
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
