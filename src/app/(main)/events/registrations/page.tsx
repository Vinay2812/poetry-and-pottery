import {
  getCompletedRegistrations,
  getUpcomingEvents,
  getUpcomingRegistrations,
} from "@/actions";
import { RegistrationsContainer } from "@/features/events";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Registrations | Poetry & Pottery",
  description:
    "View your workshop registrations, manage tickets, and track upcoming events.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RegistrationsPage() {
  const [
    upcomingRegistrationsResult,
    completedRegistrationsResult,
    upcomingEventsResult,
  ] = await Promise.all([
    getUpcomingRegistrations(),
    getCompletedRegistrations(),
    getUpcomingEvents(1, 4),
  ]);

  const upcomingRegistrations = upcomingRegistrationsResult.success
    ? upcomingRegistrationsResult.data.data
    : [];
  const upcomingPagination = upcomingRegistrationsResult.success
    ? {
        total: upcomingRegistrationsResult.data.total,
        totalPages: upcomingRegistrationsResult.data.totalPages,
      }
    : { total: 0, totalPages: 0 };

  const completedRegistrations = completedRegistrationsResult.success
    ? completedRegistrationsResult.data.data
    : [];
  const completedPagination = completedRegistrationsResult.success
    ? {
        total: completedRegistrationsResult.data.total,
        totalPages: completedRegistrationsResult.data.totalPages,
      }
    : { total: 0, totalPages: 0 };

  return (
    <RegistrationsContainer
      initialUpcomingRegistrations={upcomingRegistrations}
      initialUpcomingPagination={upcomingPagination}
      initialCompletedRegistrations={completedRegistrations}
      initialCompletedPagination={completedPagination}
      upcomingEvents={upcomingEventsResult.data}
    />
  );
}
