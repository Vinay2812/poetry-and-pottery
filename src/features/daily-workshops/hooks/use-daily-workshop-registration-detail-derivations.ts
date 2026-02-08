"use client";

import type {
  DailyWorkshopConfig,
  DailyWorkshopRegistration,
} from "@/data/daily-workshops/types";
import { useMemo } from "react";

import { createDate } from "@/lib/date";

import type {
  DailyWorkshopDayTimelineViewModel,
  DailyWorkshopStatusStep,
} from "../types";
import {
  getSlotDurationMinutesFromSnapshot,
  inferPartialRecoverySlotCountFromReason,
  normalizeBlackoutCancellationReason,
  parseBlackoutRecoveryMetadata,
} from "../utils/blackout-recovery-utils";

function formatDateKey(date: Date | string): string {
  const target = createDate(date);
  const year = target.getFullYear();
  const month = `${target.getMonth() + 1}`.padStart(2, "0");
  const day = `${target.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "PENDING":
      return "Pending";
    case "APPROVED":
      return "Approved";
    case "PAID":
      return "Paid";
    case "CONFIRMED":
      return "Confirmed";
    case "REJECTED":
      return "Rejected";
    case "CANCELLED":
      return "Cancelled";
    default:
      return status;
  }
}

function formatDateList(labels: string[]): string {
  if (labels.length <= 1) {
    return labels[0] ?? "";
  }

  if (labels.length === 2) {
    return `${labels[0]} and ${labels[1]}`;
  }

  return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
}

function extractCancellationReasonBase(reason?: string | null): string {
  const normalized = normalizeBlackoutCancellationReason(reason);
  return normalized
    .replace(/\b\d+\s+booked sessions were cancelled\./gi, "")
    .replace(/\b1\s+booked session was cancelled\./gi, "")
    .replace(/\bSession on .*? was cancelled\./gi, "")
    .replace(/\bSessions on .*? were cancelled\./gi, "")
    .replace(/\bAffected date: .*?\./gi, "")
    .replace(/\bAffected dates: .*?\./gi, "")
    .replace(/\bRemaining booked sessions are still active\./gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getAffectedDateLabels(
  pendingSlotStartTimes: string[],
  timeZone: string,
): string[] {
  const sortedDates = [...pendingSlotStartTimes]
    .map((slotStart) => createDate(slotStart))
    .sort((a, b) => a.getTime() - b.getTime());
  const labels: string[] = [];
  const seen = new Set<string>();

  sortedDates.forEach((date) => {
    const label = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone,
    });
    if (!seen.has(label)) {
      seen.add(label);
      labels.push(label);
    }
  });

  return labels;
}

interface UseDailyWorkshopRegistrationDetailDerivationsInput {
  registration: DailyWorkshopRegistration;
  config: DailyWorkshopConfig | null;
}

export function useDailyWorkshopRegistrationDetailDerivations({
  registration,
  config,
}: UseDailyWorkshopRegistrationDetailDerivationsInput) {
  const dayTimelines = useMemo<DailyWorkshopDayTimelineViewModel[]>(() => {
    const groups = new Map<
      string,
      {
        label: string;
        slots: Array<{
          id: number;
          startAt: Date | string;
          endAt: Date | string;
        }>;
      }
    >();

    [...registration.slots]
      .sort((a, b) => {
        return (
          createDate(a.slot_start_at).getTime() -
          createDate(b.slot_start_at).getTime()
        );
      })
      .forEach((slot) => {
        const dateKey = formatDateKey(slot.slot_start_at);
        const existing = groups.get(dateKey);

        if (existing) {
          existing.slots.push({
            id: slot.id,
            startAt: slot.slot_start_at,
            endAt: slot.slot_end_at,
          });
          return;
        }

        groups.set(dateKey, {
          label: createDate(slot.slot_start_at).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          slots: [
            {
              id: slot.id,
              startAt: slot.slot_start_at,
              endAt: slot.slot_end_at,
            },
          ],
        });
      });

    return Array.from(groups.entries()).map(([dateKey, value]) => {
      return {
        dateKey,
        label: value.label,
        hours: value.slots.length,
        slots: value.slots,
      };
    });
  }, [registration.slots]);

  const isFullyCancelledByBlackout =
    registration.status === "CANCELLED" &&
    Boolean(registration.cancelled_by_blackout_rule_id);

  const blackoutRecovery = useMemo(() => {
    return parseBlackoutRecoveryMetadata(registration.pricing_snapshot);
  }, [registration.pricing_snapshot]);

  const inferredRequiredSlots = useMemo(() => {
    return inferPartialRecoverySlotCountFromReason(
      registration.cancelled_reason,
    );
  }, [registration.cancelled_reason]);

  const slotDurationMinutes =
    getSlotDurationMinutesFromSnapshot(registration.pricing_snapshot) ||
    config?.slot_duration_minutes ||
    60;

  const pendingRecoverySlotCount = Math.max(
    blackoutRecovery?.requiredSlots ?? 0,
    blackoutRecovery?.pendingSlotStartTimes.length ?? 0,
    inferredRequiredSlots,
  );

  const isPartiallyCancelledBySystem =
    registration.status !== "CANCELLED" &&
    registration.cancelled_by_user_id === null &&
    (pendingRecoverySlotCount > 0 ||
      Boolean(registration.cancelled_at && registration.cancelled_reason));
  const isFullyCancelledBySystem =
    registration.status === "CANCELLED" && !registration.cancelled_by_user_id;

  const canReschedule =
    isFullyCancelledBySystem || isPartiallyCancelledBySystem;

  const rescheduleRequiredSlots = isPartiallyCancelledBySystem
    ? Math.max(1, pendingRecoverySlotCount || 1)
    : canReschedule
      ? Math.max(1, registration.slots_count)
      : 0;

  const rescheduleRequiredHours = Math.max(
    0,
    Math.round((rescheduleRequiredSlots * slotDurationMinutes) / 60),
  );

  const hasCancellationNotice = Boolean(
    registration.cancelled_reason ||
    isPartiallyCancelledBySystem ||
    isFullyCancelledBySystem,
  );

  const statusSteps = useMemo<DailyWorkshopStatusStep[]>(() => {
    const isCancelled = registration.status === "CANCELLED";
    const isRejected = registration.status === "REJECTED";

    const steps: DailyWorkshopStatusStep[] = [
      {
        label: "Request Submitted",
        date: registration.request_at ?? registration.created_at,
        isCompleted: true,
        isActive: registration.status === "PENDING",
      },
      {
        label: "Approved",
        date: registration.approved_at,
        isCompleted: Boolean(registration.approved_at),
        isActive: registration.status === "APPROVED",
      },
      {
        label: "Paid",
        date: registration.paid_at,
        isCompleted: Boolean(registration.paid_at),
        isActive: registration.status === "PAID",
      },
      {
        label: "Confirmed",
        date: registration.confirmed_at,
        isCompleted: Boolean(registration.confirmed_at),
        isActive: registration.status === "CONFIRMED",
      },
    ];

    if (isCancelled || isRejected) {
      steps.push({
        label: isCancelled ? "Cancelled" : "Rejected",
        date: isFullyCancelledByBlackout ? null : registration.cancelled_at,
        isCompleted: true,
        isActive: true,
      });
    }

    return steps;
  }, [
    registration.approved_at,
    registration.cancelled_at,
    registration.confirmed_at,
    registration.created_at,
    registration.paid_at,
    registration.request_at,
    registration.status,
    isFullyCancelledByBlackout,
  ]);

  const tierLabel = useMemo(() => {
    const tier = config?.pricing_tiers.find(
      (pricingTier) => pricingTier.hours === registration.total_hours,
    );
    if (tier) {
      return `${tier.hours} Hour Session`;
    }
    return `${registration.total_hours} Hour Session`;
  }, [config?.pricing_tiers, registration.total_hours]);

  const cancellationNotice = hasCancellationNotice
    ? (() => {
        if (isPartiallyCancelledBySystem && canReschedule) {
          const baseReason = extractCancellationReasonBase(
            registration.cancelled_reason,
          );
          const slotLabel =
            rescheduleRequiredSlots === 1
              ? "1 booked session was cancelled."
              : `${rescheduleRequiredSlots} booked sessions were cancelled.`;
          const affectedDateLabels = getAffectedDateLabels(
            blackoutRecovery?.pendingSlotStartTimes ?? [],
            config?.timezone ?? "UTC",
          );
          const dateLabel =
            affectedDateLabels.length === 0
              ? ""
              : affectedDateLabels.length === 1
                ? `Affected date: ${affectedDateLabels[0]}.`
                : `Affected dates: ${formatDateList(affectedDateLabels)}.`;

          return `${baseReason ? `${baseReason} ` : ""}${slotLabel}${dateLabel ? ` ${dateLabel}` : ""} Remaining booked sessions are still active.`;
        }

        return normalizeBlackoutCancellationReason(
          registration.cancelled_reason ??
            "Some sessions are unavailable and can be rescheduled.",
        );
      })()
    : null;

  const cancellationTitle = !cancellationNotice
    ? null
    : isFullyCancelledByBlackout || isFullyCancelledBySystem
      ? "This booking has been cancelled"
      : "Some booked sessions were cancelled";

  return {
    cancellationNotice,
    cancellationTitle,
    canReschedule,
    dayTimelines,
    initialDayKey: dayTimelines[0]?.dateKey ?? "",
    rescheduleRequiredHours,
    rescheduleRequiredSlots,
    statusLabel: getStatusLabel(registration.status),
    statusSteps,
    tierLabel,
  };
}
