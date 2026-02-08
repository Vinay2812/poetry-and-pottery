"use client";

import type { DailyWorkshopAvailabilityResponse } from "@/data/daily-workshops/types";
import { useMemo } from "react";

import {
  buildCalendarDays,
  buildSelectedDateTabs,
  formatDateKeyInTimeZone,
} from "../utils/calendar-utils";

type PricingTier =
  DailyWorkshopAvailabilityResponse["config"]["pricing_tiers"][number];

function findBestTierFallback(
  tiers: PricingTier[],
  totalHours: number,
): PricingTier | null {
  const exact = tiers.find((tier) => tier.hours === totalHours);
  if (exact) {
    return exact;
  }

  let fallback: PricingTier | null = null;
  for (const tier of tiers) {
    if (tier.hours <= totalHours) {
      fallback = tier;
    }
  }

  return fallback;
}

function findTierCombination(
  tiers: PricingTier[],
  totalHours: number,
): PricingTier[] | null {
  const descending = [...tiers].sort(
    (a, b) => b.hours - a.hours || a.sort_order - b.sort_order,
  );

  if (descending.length === 0 || totalHours <= 0) {
    return null;
  }

  const memo = new Map<number, PricingTier[] | null>();

  const dfs = (remaining: number): PricingTier[] | null => {
    if (remaining === 0) {
      return [];
    }

    if (memo.has(remaining)) {
      return memo.get(remaining) ?? null;
    }

    for (const tier of descending) {
      if (tier.hours > remaining) {
        continue;
      }

      const child = dfs(remaining - tier.hours);
      if (child) {
        const result = [tier, ...child];
        memo.set(remaining, result);
        return result;
      }
    }

    memo.set(remaining, null);
    return null;
  };

  return dfs(totalHours);
}

interface UseDailyWorkshopBookingDerivationsInput {
  availability: DailyWorkshopAvailabilityResponse;
  activeDateKey: string;
  calendarMonthDate: Date;
  selectedSlotStartTimes: string[];
  participants: number;
  currentTimestamp: number;
}

export function useDailyWorkshopBookingDerivations({
  availability,
  activeDateKey,
  calendarMonthDate,
  selectedSlotStartTimes,
  participants,
  currentTimestamp,
}: UseDailyWorkshopBookingDerivationsInput) {
  const availabilityByDate = useMemo(() => {
    const map = new Map<string, boolean>();
    availability.days.forEach((day) => {
      map.set(
        day.date_key,
        day.slots.some((slot) => slot.is_available),
      );
    });
    return map;
  }, [availability.days]);

  const dayLookup = useMemo(() => {
    return new Map(availability.days.map((day) => [day.date_key, day]));
  }, [availability.days]);

  const effectiveActiveDateKey = useMemo(() => {
    if (activeDateKey && dayLookup.has(activeDateKey)) {
      return activeDateKey;
    }

    return availability.days[0]?.date_key ?? "";
  }, [activeDateKey, availability.days, dayLookup]);

  const selectedDateKeys = useMemo(() => {
    const keys = new Set<string>();
    selectedSlotStartTimes.forEach((slotStartAt) => {
      keys.add(
        formatDateKeyInTimeZone(
          new Date(slotStartAt),
          availability.config.timezone,
        ),
      );
    });
    return keys;
  }, [availability.config.timezone, selectedSlotStartTimes]);

  const selectedDateTabs = useMemo(() => {
    return buildSelectedDateTabs(
      selectedDateKeys,
      selectedSlotStartTimes,
      availability.config.timezone,
      dayLookup,
    );
  }, [
    availability.config.timezone,
    dayLookup,
    selectedDateKeys,
    selectedSlotStartTimes,
  ]);

  const slotAvailabilityByStart = useMemo(() => {
    const map = new Map<
      string,
      {
        isAvailable: boolean;
        remainingCapacity: number;
        reason?: string | null;
      }
    >();

    for (const day of availability.days) {
      for (const slot of day.slots) {
        const slotStartISO = new Date(slot.slot_start_at).toISOString();
        map.set(slotStartISO, {
          isAvailable: slot.is_available,
          remainingCapacity: slot.remaining_capacity,
          reason: slot.reason,
        });
      }
    }

    return map;
  }, [availability.days]);

  const activeDay = dayLookup.get(effectiveActiveDateKey);

  const activeDaySlots = useMemo(() => {
    if (!activeDay) return [];

    return [...activeDay.slots]
      .filter(
        (slot) => new Date(slot.slot_start_at).getTime() > currentTimestamp,
      )
      .sort((a, b) => {
        return (
          new Date(a.slot_start_at).getTime() -
          new Date(b.slot_start_at).getTime()
        );
      })
      .map((slot) => {
        const slotStartISO = new Date(slot.slot_start_at).toISOString();
        return {
          startAt: slot.slot_start_at,
          endAt: slot.slot_end_at,
          isAvailable: slot.is_available,
          remainingCapacity: slot.remaining_capacity,
          reason: slot.reason,
          isSelected: selectedSlotStartTimes.includes(slotStartISO),
        };
      });
  }, [activeDay, currentTimestamp, selectedSlotStartTimes]);

  const calendarDays = useMemo(() => {
    return buildCalendarDays(
      calendarMonthDate,
      availabilityByDate,
      effectiveActiveDateKey,
      selectedDateKeys,
      availability.config.timezone,
    );
  }, [
    availabilityByDate,
    availability.config.timezone,
    calendarMonthDate,
    effectiveActiveDateKey,
    selectedDateKeys,
  ]);

  const sortedTiers = useMemo(() => {
    return [...availability.config.pricing_tiers]
      .filter((tier) => tier.is_active && tier.hours > 0)
      .sort((a, b) => a.hours - b.hours);
  }, [availability.config.pricing_tiers]);

  const totalHours = selectedSlotStartTimes.length;

  const appliedTiers = useMemo(() => {
    if (sortedTiers.length === 0 || totalHours <= 0) {
      return [] as PricingTier[];
    }

    const tierCombination = findTierCombination(sortedTiers, totalHours);
    if (tierCombination && tierCombination.length > 0) {
      return tierCombination;
    }

    const fallback = findBestTierFallback(sortedTiers, totalHours);
    return fallback ? [fallback] : [];
  }, [sortedTiers, totalHours]);

  const appliedTierCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    for (const tier of appliedTiers) {
      counts[tier.id] = (counts[tier.id] ?? 0) + 1;
    }
    return counts;
  }, [appliedTiers]);

  const selectedTierLabel = useMemo(() => {
    if (totalHours === 0) {
      return "Select slots to see pricing";
    }

    const entries = [...sortedTiers]
      .sort((a, b) => b.hours - a.hours || a.sort_order - b.sort_order)
      .map((tier) => {
        const count = appliedTierCounts[tier.id] ?? 0;
        if (count <= 0) {
          return null;
        }
        return count === 1 ? `${tier.hours}h` : `${tier.hours}h x ${count}`;
      })
      .filter((value): value is string => Boolean(value));

    if (entries.length === 0) {
      return "No tier selected";
    }

    return entries.join(" + ");
  }, [appliedTierCounts, sortedTiers, totalHours]);

  const pricePerPerson = appliedTiers.reduce(
    (sum, tier) => sum + tier.price_per_person,
    0,
  );
  const piecesPerPerson = appliedTiers.reduce(
    (sum, tier) => sum + tier.pieces_per_person,
    0,
  );

  const maxParticipants = useMemo(() => {
    const configCapacity = Math.max(1, availability.config.slot_capacity);

    if (selectedSlotStartTimes.length === 0) {
      return configCapacity;
    }

    let minRemaining = configCapacity;
    for (const slotStartISO of selectedSlotStartTimes) {
      const slotInfo = slotAvailabilityByStart.get(slotStartISO);
      if (!slotInfo || !slotInfo.isAvailable) {
        return 1;
      }
      minRemaining = Math.min(
        minRemaining,
        Math.max(0, slotInfo.remainingCapacity),
      );
    }

    return Math.max(1, minRemaining);
  }, [
    availability.config.slot_capacity,
    selectedSlotStartTimes,
    slotAvailabilityByStart,
  ]);

  const effectiveParticipants = Math.min(participants, maxParticipants);
  const totalAmount = pricePerPerson * effectiveParticipants;
  const totalPieces = piecesPerPerson * effectiveParticipants;

  return {
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
  };
}
