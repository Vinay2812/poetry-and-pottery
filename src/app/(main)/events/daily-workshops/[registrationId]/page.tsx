import type { Metadata } from "next";
import { Suspense } from "react";

import { DailyWorkshopRegistrationDetailSkeleton } from "@/components/skeletons";

import {
  DailyWorkshopRegistrationDetailContent,
  type DailyWorkshopRegistrationDetailPageParams,
} from "./daily-workshop-registration-detail-content";

interface DailyWorkshopRegistrationDetailPageProps {
  params: Promise<DailyWorkshopRegistrationDetailPageParams>;
}

export async function generateMetadata({
  params,
}: DailyWorkshopRegistrationDetailPageProps): Promise<Metadata> {
  const { registrationId } = await params;
  return {
    title: `Daily Workshop Registration ${registrationId.toUpperCase()} | Poetry & Pottery`,
    description:
      "View your daily workshop booking details, selected slots, pricing, and registration status timeline.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

/**
 * Route: /events/daily-workshops/[registrationId]
 * Page does: Daily-workshop booking detail page for a specific registration record.
 * Key UI operations:
 * - Review booked slots, pricing snapshot, and status timeline for the registration.
 * - Use follow-up actions from the registration detail card/state components.
 * UI info needed for operations:
 * - Route param `registrationId` mapped to a valid daily-workshop registration record.
 * - Registration payload plus matching workshop config for rendering slot and tier context.
 */
export default function DailyWorkshopRegistrationDetailPage({
  params,
}: DailyWorkshopRegistrationDetailPageProps) {
  return (
    <Suspense fallback={<DailyWorkshopRegistrationDetailSkeleton />}>
      <DailyWorkshopRegistrationDetailContent params={params} />
    </Suspense>
  );
}
