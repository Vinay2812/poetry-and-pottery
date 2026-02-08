"use client";

import {
  useDailyWorkshopAvailabilityByConfigQuery,
  useRegisterForDailyWorkshop,
} from "@/data/daily-workshops/gateway/client";
import type {
  DailyWorkshopAvailabilityResponse,
  DailyWorkshopConfig,
} from "@/data/daily-workshops/types";
import { useAuthAction } from "@/hooks/use-auth-action";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { createDate } from "@/lib/date";

import { DailyWorkshopsBooking } from "../components/daily-workshops-booking";
import { useCurrentTimestamp } from "../hooks/use-current-timestamp";
import { useDailyWorkshopBookingDerivations } from "../hooks/use-daily-workshop-booking-derivations";
import { useDailyWorkshopConfigSelection } from "../hooks/use-daily-workshop-config-selection";
import { useDailyWorkshopParticipantsState } from "../hooks/use-daily-workshop-participants-state";
import { useDailyWorkshopSlotSelectionState } from "../hooks/use-daily-workshop-slot-selection-state";
import { useWorkshopCalendarState } from "../hooks/use-workshop-calendar-state";
import type {
  DailyWorkshopsBookingContainerProps,
  DailyWorkshopsBookingViewModel,
} from "../types";
import { formatDateKeyInTimeZone, parseDateKey } from "../utils/calendar-utils";

export function DailyWorkshopsBookingContainer({
  initialAvailability,
  initialConfigs,
}: DailyWorkshopsBookingContainerProps) {
  const router = useRouter();
  const { requireAuth } = useAuthAction();
  const { mutate: registerForDailyWorkshop, loading: isBooking } =
    useRegisterForDailyWorkshop();

  const initialConfigId = initialAvailability.config.id;
  const { selectedConfigId, isUsingInitialConfig, selectConfig } =
    useDailyWorkshopConfigSelection({ initialConfigId });
  const { participants, resetParticipants, adjustParticipants } =
    useDailyWorkshopParticipantsState({ initialParticipants: 1 });
  const {
    bookingError,
    selectedSlotStartTimes,
    isSlotSelectionPending,
    setBookingError,
    clearBookingError,
    clearSelectedSlots,
    replaceSelectedSlots,
    runSlotSelectionTransition,
  } = useDailyWorkshopSlotSelectionState();

  const availableConfigs = useMemo(() => {
    const byId = new Map<number, DailyWorkshopConfig>();

    initialConfigs.forEach((config) => {
      byId.set(config.id, config);
    });
    byId.set(initialAvailability.config.id, initialAvailability.config);

    return Array.from(byId.values());
  }, [initialAvailability.config, initialConfigs]);

  const {
    data: selectedConfigAvailabilityData,
    loading: isConfigLoading,
    error: configAvailabilityError,
  } = useDailyWorkshopAvailabilityByConfigQuery({
    configId: selectedConfigId,
    skip: isUsingInitialConfig,
  });

  const selectedAvailability = useMemo(() => {
    if (isUsingInitialConfig) {
      return initialAvailability;
    }
    return selectedConfigAvailabilityData?.dailyWorkshopAvailability ?? null;
  }, [
    initialAvailability,
    isUsingInitialConfig,
    selectedConfigAvailabilityData?.dailyWorkshopAvailability,
  ]);

  const fallbackConfig = useMemo(() => {
    return (
      availableConfigs.find((config) => config.id === selectedConfigId) ??
      initialAvailability.config
    );
  }, [availableConfigs, initialAvailability.config, selectedConfigId]);

  const availability: DailyWorkshopAvailabilityResponse = useMemo(() => {
    if (selectedAvailability) {
      return selectedAvailability;
    }

    return {
      config: fallbackConfig,
      days: [],
    };
  }, [fallbackConfig, selectedAvailability]);

  const {
    activeDateKey,
    calendarMonthDate,
    handlePreviousMonth,
    handleNextMonth,
    handleSelectDate,
    resetCalendarToDateKey,
  } = useWorkshopCalendarState({
    initialDateKey: initialAvailability.days[0]?.date_key ?? "",
    timeZone: initialAvailability.config.timezone,
  });

  const currentTimestamp = useCurrentTimestamp();

  const {
    activeDay,
    activeDaySlots,
    appliedTierCounts,
    calendarDays,
    effectiveActiveDateKey,
    effectiveParticipants,
    maxParticipants,
    piecesPerPerson,
    pricePerPerson,
    selectedDateTabs,
    selectedTierLabel,
    slotAvailabilityByStart,
    totalAmount,
    totalHours,
    totalPieces,
  } = useDailyWorkshopBookingDerivations({
    availability,
    activeDateKey,
    calendarMonthDate,
    selectedSlotStartTimes,
    participants,
    currentTimestamp,
  });

  const resetBookingSelection = useCallback(() => {
    clearSelectedSlots();
    resetParticipants();
    clearBookingError();
    resetCalendarToDateKey(availability.days[0]?.date_key ?? "");
  }, [
    availability.days,
    clearBookingError,
    clearSelectedSlots,
    resetCalendarToDateKey,
    resetParticipants,
  ]);

  const handleSelectConfig = useCallback(
    (configId: number) => {
      const nextConfig =
        availableConfigs.find((config) => config.id === configId) ??
        availability.config;

      selectConfig(configId);
      clearSelectedSlots();
      resetParticipants();
      clearBookingError();
      resetCalendarToDateKey(
        formatDateKeyInTimeZone(createDate(), nextConfig.timezone),
      );
    },
    [
      availability.config,
      availableConfigs,
      clearBookingError,
      clearSelectedSlots,
      resetCalendarToDateKey,
      resetParticipants,
      selectConfig,
    ],
  );

  const handleToggleSlot = useCallback(
    (slotStartAt: Date | string) => {
      const slotStartISO = createDate(slotStartAt).toISOString();
      const slotStartTime = createDate(slotStartISO).getTime();
      const slotInfo = slotAvailabilityByStart.get(slotStartISO);

      if (isConfigLoading) {
        return;
      }

      if (slotStartTime <= Date.now()) {
        setBookingError("This time slot has already passed.");
        return;
      }

      runSlotSelectionTransition((current) => {
        const isAlreadySelected = current.includes(slotStartISO);

        if (
          !isAlreadySelected &&
          (!slotInfo?.isAvailable ||
            slotInfo.remainingCapacity < effectiveParticipants)
        ) {
          setBookingError(
            slotInfo?.reason ??
              `Only ${slotInfo?.remainingCapacity ?? 0} spots left in this slot`,
          );
          return current;
        }

        return isAlreadySelected
          ? current.filter((value) => value !== slotStartISO)
          : [...current, slotStartISO];
      });
    },
    [
      effectiveParticipants,
      isConfigLoading,
      runSlotSelectionTransition,
      setBookingError,
      slotAvailabilityByStart,
    ],
  );

  const handleParticipantsChange = useCallback(
    (delta: -1 | 1) => {
      adjustParticipants(delta, maxParticipants);
    },
    [adjustParticipants, maxParticipants],
  );

  const handleBook = useCallback(() => {
    requireAuth(async () => {
      const now = Date.now();
      const futureSlots = selectedSlotStartTimes.filter(
        (slotStartISO) => createDate(slotStartISO).getTime() > now,
      );

      if (futureSlots.length === 0) {
        setBookingError("Please select at least one slot.");
        clearSelectedSlots();
        return;
      }

      if (futureSlots.length !== selectedSlotStartTimes.length) {
        replaceSelectedSlots(futureSlots);
        setBookingError(
          "Some selected slots are now in the past. Please review and book again.",
        );
        return;
      }

      setBookingError(null);

      const result = await registerForDailyWorkshop({
        configId: selectedConfigId,
        participants: effectiveParticipants,
        slotStartTimes: futureSlots,
      });

      if (!result.success) {
        setBookingError(result.error);
        return;
      }

      resetBookingSelection();
      router.push(`/events/daily-workshops/${result.data.id}`);
    });
  }, [
    clearSelectedSlots,
    effectiveParticipants,
    registerForDailyWorkshop,
    replaceSelectedSlots,
    requireAuth,
    resetBookingSelection,
    router,
    selectedConfigId,
    selectedSlotStartTimes,
    setBookingError,
  ]);

  const viewModel: DailyWorkshopsBookingViewModel = {
    config: availability.config,
    availableConfigs,
    selectedConfigId,
    isConfigLoading,
    configError: configAvailabilityError?.message ?? null,
    monthLabel: calendarMonthDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: availability.config.timezone,
    }),
    activeDateKey: effectiveActiveDateKey,
    activeDateLabel:
      activeDay?.label ??
      parseDateKey(
        effectiveActiveDateKey ||
          formatDateKeyInTimeZone(createDate(), availability.config.timezone),
      ).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        timeZone: availability.config.timezone,
      }),
    selectedDateTabs,
    calendarDays,
    activeDaySlots,
    participants: effectiveParticipants,
    maxParticipants,
    totalHours,
    selectedSlotsCount: selectedSlotStartTimes.length,
    selectedTierLabel,
    appliedTierCounts,
    pricePerPerson,
    piecesPerPerson,
    totalPieces,
    totalAmount,
    bookingError,
  };

  return (
    <DailyWorkshopsBooking
      viewModel={viewModel}
      onSelectConfig={handleSelectConfig}
      onPreviousMonth={handlePreviousMonth}
      onNextMonth={handleNextMonth}
      onSelectDate={handleSelectDate}
      onToggleSlot={handleToggleSlot}
      onParticipantsChange={handleParticipantsChange}
      onBook={handleBook}
      isBooking={isBooking}
      isSlotSelectionPending={isSlotSelectionPending}
    />
  );
}
