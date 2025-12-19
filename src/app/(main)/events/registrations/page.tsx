import {
  getCompletedRegistrations,
  getUpcomingEvents,
  getUpcomingRegistrations,
} from "@/actions";
import type { Metadata } from "next";

import { RegistrationsClient } from "@/components/events";

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
    upcomingEvents,
  ] = await Promise.all([
    getUpcomingRegistrations(),
    getCompletedRegistrations(),
    getUpcomingEvents(4),
  ]);

  const upcomingRegistrations = upcomingRegistrationsResult.success
    ? upcomingRegistrationsResult.data
    : [];

  const completedRegistrations = completedRegistrationsResult.success
    ? completedRegistrationsResult.data
    : [];

  return (
    <RegistrationsClient
      upcomingRegistrations={upcomingRegistrations}
      completedRegistrations={completedRegistrations}
      upcomingEvents={upcomingEvents}
    />
  );
}
