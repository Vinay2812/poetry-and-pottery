export const DEFAULT_BLACKOUT_REASON =
  "Instructor is unavailable due to personal reasons.";

export type BlackoutRecoveryMetadata = {
  pendingSlotStartTimes: string[];
  requiredSlots: number;
  windowStartMinutes: number | null;
  windowEndMinutes: number | null;
};

function getObjectRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  return value as Record<string, unknown>;
}

export function parseBlackoutRecoveryMetadata(
  snapshot: unknown,
): BlackoutRecoveryMetadata | null {
  const snapshotRecord = getObjectRecord(snapshot);
  const recoveryRecord = snapshotRecord
    ? getObjectRecord(snapshotRecord.blackout_recovery)
    : null;
  if (!recoveryRecord) {
    return null;
  }

  const rawPending = recoveryRecord.pending_slot_start_times;
  const pendingSlotStartTimes = Array.isArray(rawPending)
    ? rawPending.filter(
        (value): value is string =>
          typeof value === "string" && value.trim().length > 0,
      )
    : [];

  const requiredSlots = Number(recoveryRecord.required_slots);
  const windowStartMinutesRaw = Number(recoveryRecord.window_start_minutes);
  const windowEndMinutesRaw = Number(recoveryRecord.window_end_minutes);
  const normalizedRequiredSlots = Number.isNaN(requiredSlots)
    ? pendingSlotStartTimes.length
    : Math.max(1, requiredSlots);

  if (normalizedRequiredSlots < 1 && pendingSlotStartTimes.length < 1) {
    return null;
  }

  return {
    pendingSlotStartTimes,
    requiredSlots: normalizedRequiredSlots,
    windowStartMinutes: Number.isNaN(windowStartMinutesRaw)
      ? null
      : windowStartMinutesRaw,
    windowEndMinutes: Number.isNaN(windowEndMinutesRaw)
      ? null
      : windowEndMinutesRaw,
  };
}

export function getBlackoutRecoveryPendingSlots(snapshot: unknown): string[] {
  const snapshotRecord = getObjectRecord(snapshot);
  const recoveryRecord = snapshotRecord
    ? getObjectRecord(snapshotRecord.blackout_recovery)
    : null;
  if (!recoveryRecord) {
    return [];
  }

  const rawPending = recoveryRecord.pending_slot_start_times;
  if (!Array.isArray(rawPending)) {
    return [];
  }

  return rawPending.filter(
    (value): value is string =>
      typeof value === "string" && value.trim().length > 0,
  );
}

export function getSlotDurationMinutesFromSnapshot(snapshot: unknown): number {
  const snapshotRecord = getObjectRecord(snapshot);
  if (!snapshotRecord) {
    return 0;
  }

  const rawDuration = Number(snapshotRecord.slot_duration_minutes);
  if (Number.isNaN(rawDuration) || rawDuration < 1) {
    return 0;
  }

  return rawDuration;
}

export function inferPartialRecoverySlotCountFromReason(
  reason?: string | null,
): number {
  const text = reason?.trim();
  if (!text) {
    return 0;
  }

  if (!/\bsession(s)?\b/i.test(text) || !/\bcancelled\b/i.test(text)) {
    return 0;
  }

  const explicitCountMatch = [...text.matchAll(/\b(\d+)\s+session(s)?\b/gi)]
    .map((match) => Number(match[1]))
    .filter((value) => Number.isFinite(value) && value > 0);
  if (explicitCountMatch.length > 0) {
    return Math.max(...explicitCountMatch);
  }

  const explicitDates = text.match(
    /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4}\b/g,
  );
  if (explicitDates && explicitDates.length > 0) {
    return explicitDates.length;
  }

  if (/remaining booked sessions are still active\./i.test(text)) {
    return 1;
  }

  return 1;
}

export function normalizeBlackoutCancellationReason(
  reason?: string | null,
): string {
  const trimmedReason = reason?.trim();
  if (!trimmedReason) {
    return DEFAULT_BLACKOUT_REASON;
  }

  if (/blackout rule|blocked by/i.test(trimmedReason)) {
    return DEFAULT_BLACKOUT_REASON;
  }

  return trimmedReason;
}
