"use client";

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
  };

  return (
    <DailyWorkshopRegistrationDetail
      viewModel={viewModel}
      onSelectDay={handleSelectDay}
    />
  );
}
