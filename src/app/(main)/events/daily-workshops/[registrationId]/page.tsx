import {
  getDailyWorkshopPublicConfigs,
  getDailyWorkshopRegistrationById,
} from "@/data/daily-workshops/gateway/server";
import { DailyWorkshopRegistrationDetailContainer } from "@/features/daily-workshops";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { DailyWorkshopRegistrationDetailSkeleton } from "@/components/skeletons";

interface DailyWorkshopRegistrationDetailPageProps {
  params: Promise<{ registrationId: string }>;
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

async function DailyWorkshopRegistrationDetailContent({
  params,
}: DailyWorkshopRegistrationDetailPageProps) {
  const { registrationId } = await params;
  const [registrationResult, configsResult] = await Promise.all([
    getDailyWorkshopRegistrationById(registrationId),
    getDailyWorkshopPublicConfigs(),
  ]);

  if (!registrationResult.success) {
    notFound();
  }

  const config = configsResult.success
    ? (configsResult.data.find(
        (item) => item.id === registrationResult.data.config_id,
      ) ?? null)
    : null;

  return (
    <DailyWorkshopRegistrationDetailContainer
      registration={registrationResult.data}
      config={config}
    />
  );
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
