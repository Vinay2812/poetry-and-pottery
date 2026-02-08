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

export default function DailyWorkshopReschedulePage({
  params,
}: DailyWorkshopReschedulePageProps) {
  return (
    <Suspense fallback={<DailyWorkshopsBookingSkeleton />}>
      <DailyWorkshopRescheduleContent params={params} />
    </Suspense>
  );
}
