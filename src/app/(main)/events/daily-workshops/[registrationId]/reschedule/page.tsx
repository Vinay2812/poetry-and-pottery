import {
  getDailyWorkshopAvailability,
  getDailyWorkshopRegistrationById,
} from "@/data/daily-workshops/gateway/server";
import { DailyWorkshopRescheduleContainer } from "@/features/daily-workshops";
import {
  getBlackoutRecoveryPendingSlots,
  inferPartialRecoverySlotCountFromReason,
  parseBlackoutRecoveryMetadata,
} from "@/features/daily-workshops/utils/blackout-recovery-utils";
import { CalendarDays } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { EventsListLayout } from "@/components/events";
import { EmptyState } from "@/components/sections";
import { DailyWorkshopsBookingSkeleton } from "@/components/skeletons";

interface DailyWorkshopReschedulePageProps {
  params: Promise<{ registrationId: string }>;
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

async function DailyWorkshopRescheduleContent({
  params,
}: DailyWorkshopReschedulePageProps) {
  const { registrationId } = await params;

  const registrationResult =
    await getDailyWorkshopRegistrationById(registrationId);

  if (!registrationResult.success) {
    notFound();
  }

  const registration = registrationResult.data;
  const pendingRecoverySlots = getBlackoutRecoveryPendingSlots(
    registration.pricing_snapshot,
  );
  const blackoutRecovery = parseBlackoutRecoveryMetadata(
    registration.pricing_snapshot,
  );
  const inferredRequiredSlots = inferPartialRecoverySlotCountFromReason(
    registration.cancelled_reason,
  );
  const isFullyCancelledBySystem =
    registration.status === "CANCELLED" &&
    registration.cancelled_by_user_id === null;
  const isPartiallyCancelledBySystem =
    registration.status !== "CANCELLED" &&
    registration.cancelled_by_user_id === null &&
    ((blackoutRecovery?.requiredSlots ?? 0) > 0 ||
      pendingRecoverySlots.length > 0 ||
      inferredRequiredSlots > 0 ||
      Boolean(registration.cancelled_at && registration.cancelled_reason));

  if (!isFullyCancelledBySystem && !isPartiallyCancelledBySystem) {
    notFound();
  }

  const availabilityResult = await getDailyWorkshopAvailability({
    config_id: registration.config_id,
  });

  if (!availabilityResult.success) {
    return (
      <EventsListLayout>
        <EmptyState
          icon={CalendarDays}
          title="Reschedule unavailable"
          description="No reschedule slots are available right now. Please try again later."
        />
      </EventsListLayout>
    );
  }

  return (
    <DailyWorkshopRescheduleContainer
      registration={registration}
      initialAvailability={availabilityResult.data}
    />
  );
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
