import type { Metadata } from "next";
import { Suspense } from "react";

import { RegistrationsSkeleton } from "@/components/skeletons";

import { RegistrationsContent } from "./registrations-content";

export const metadata: Metadata = {
  title: "My Registrations | Poetry & Pottery",
  description:
    "View your workshop registrations, manage tickets, and track upcoming events.",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Route: /events/registrations
 * Page does: Authenticated registrations page combining event and daily-workshop bookings.
 * Key UI operations:
 * - View upcoming/completed registrations, search entries, and open registration details.
 * - Switch between event registrations and daily-workshop registration datasets.
 * UI info needed for operations:
 * - Authenticated user context for personal registrations and pagination state.
 * - Upcoming/completed registration lists from both events and daily-workshop services.
 */
export default function RegistrationsPage() {
  return (
    <Suspense fallback={<RegistrationsSkeleton />}>
      <RegistrationsContent />
    </Suspense>
  );
}
