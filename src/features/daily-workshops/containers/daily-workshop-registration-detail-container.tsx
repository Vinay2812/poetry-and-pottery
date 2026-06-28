"use client";

import { DailyWorkshopRegistrationStatus } from "@/data/daily-workshops/types";
import { useUser } from "@clerk/nextjs";
import { useCallback } from "react";

import { openWhatsAppFollowUp } from "@/lib/contact-business";
import { createDate } from "@/lib/date";

import { DailyWorkshopRegistrationDetail } from "../components/daily-workshop-registration-detail";
import { useDailyWorkshopActiveDayState } from "../hooks/use-daily-workshop-active-day-state";
import { useDailyWorkshopRegistrationDetailDerivations } from "../hooks/use-daily-workshop-registration-detail-derivations";
import type {
  DailyWorkshopRegistrationDetailContainerProps,
  DailyWorkshopRegistrationDetailViewModel,
} from "../types";

export function DailyWorkshopRegistrationDetailContainer({
  registration,
  config,
}: DailyWorkshopRegistrationDetailContainerProps) {
  const {
    cancellationNotice,
    cancellationTitle,
    canReschedule,
    dayTimelines,
    initialDayKey,
    rescheduleRequiredHours,
    rescheduleRequiredSlots,
    statusLabel,
    statusSteps,
    tierLabel,
  } = useDailyWorkshopRegistrationDetailDerivations({ registration, config });

  const { activeDayKey, handleSelectDay } = useDailyWorkshopActiveDayState({
    initialDayKey,
  });

  const { user } = useUser();

  const isConfirmed =
    registration.status === DailyWorkshopRegistrationStatus.Confirmed;

  const handleWhatsAppContact = useCallback(() => {
    const customerEmail = user?.emailAddresses[0]?.emailAddress ?? "";
    const customerName =
      user?.fullName || user?.firstName || customerEmail || "Guest";

    const earliestSlot = [...registration.slots]
      .map((slot) => slot.slot_start_at)
      .sort((a, b) => createDate(a).getTime() - createDate(b).getTime())[0];

    openWhatsAppFollowUp({
      type: "daily-workshop-followup",
      registrationId: registration.id.toUpperCase(),
      workshopName: config?.name ?? "Daily Pottery Workshop",
      date: earliestSlot ?? registration.created_at,
      registrationStatus: statusLabel,
      customerName,
      customerEmail,
    });
  }, [config?.name, registration, statusLabel, user]);

  const viewModel: DailyWorkshopRegistrationDetailViewModel = {
    registration,
    status: registration.status,
    statusLabel,
    cancellationTitle,
    cancellationNotice,
    canReschedule,
    rescheduleRequiredSlots,
    rescheduleRequiredHours,
    activeDayKey,
    dayTimelines,
    statusSteps,
    participants: registration.participants,
    totalHours: registration.total_hours,
    totalPieces: registration.total_pieces,
    finalAmount: registration.final_amount,
    discount: registration.discount,
    pricePerPerson: registration.price_per_person,
    tierLabel,
    showWhatsAppButton: !isConfirmed,
  };

  return (
    <DailyWorkshopRegistrationDetail
      viewModel={viewModel}
      onSelectDay={handleSelectDay}
      onWhatsAppContact={handleWhatsAppContact}
    />
  );
}
