import type { Metadata } from "next";
import { Suspense } from "react";

import { DailyWorkshopsBookingSkeleton } from "@/components/skeletons";

import {
  DailyWorkshopRescheduleContent,
  type DailyWorkshopReschedulePageParams,
} from "./daily-workshop-reschedule-content";

interface DailyWorkshopReschedulePageProps {
  params: Promise<DailyWorkshopReschedulePageParams>;
}

export async function generateMetadata({
  params,
}: DailyWorkshopReschedulePageProps): Promise<Metadata> {
  const { registrationId } = await params;
  return {
    title: `Reschedule Daily Workshop ${registrationId.toUpperCase()} | Poetry & Pottery`,
    description:
      "Reschedule your cancelled daily workshop sessions by selecting new available date and time slots.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

/**
 * Route: /events/daily-workshops/[registrationId]/reschedule
 * Page does: Reschedule page for system-cancelled or partially-cancelled daily workshop bookings.
 * Key UI operations:
 * - Pick replacement slots from current availability and submit reschedule selection.
 * - Show empty-state guidance when no valid recovery slots are currently available.
 * UI info needed for operations:
 * - Route param `registrationId` and cancellation metadata proving reschedule eligibility.
 * - Fresh availability matrix for the registration's config to drive slot selection UI.
 */
export default function DailyWorkshopReschedulePage({
  params,
}: DailyWorkshopReschedulePageProps) {
  return (
    <Suspense fallback={<DailyWorkshopsBookingSkeleton />}>
      <DailyWorkshopRescheduleContent params={params} />
    </Suspense>
  );
}
