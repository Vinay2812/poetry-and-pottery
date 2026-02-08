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

export default function DailyWorkshopRegistrationDetailPage({
  params,
}: DailyWorkshopRegistrationDetailPageProps) {
  return (
    <Suspense fallback={<DailyWorkshopRegistrationDetailSkeleton />}>
      <DailyWorkshopRegistrationDetailContent params={params} />
    </Suspense>
  );
}
