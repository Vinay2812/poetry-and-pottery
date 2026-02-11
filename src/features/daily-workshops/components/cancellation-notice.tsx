import Link from "next/link";

import { Button } from "@/components/ui/button";

import type { CancellationNoticeProps } from "../types";

export function CancellationNotice({
  cancellationTitle,
  cancellationNotice,
  canReschedule,
  rescheduleRequiredSlots,
  rescheduleRequiredHours,
  rescheduleHref,
}: CancellationNoticeProps) {
  return (
    <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
      <p className="text-sm font-semibold text-amber-900">
        {cancellationTitle ?? "Booking update"}
      </p>
      <p className="mt-1 text-sm text-amber-800">{cancellationNotice}</p>
      {canReschedule && (
        <>
          <p className="mt-2 text-sm font-medium text-amber-900">
            Reschedule {rescheduleRequiredSlots} session
            {rescheduleRequiredSlots > 1 ? "s" : ""} ({rescheduleRequiredHours}{" "}
            combined hour
            {rescheduleRequiredHours > 1 ? "s" : ""}). You can choose slots
            across multiple days.
          </p>
          <Button asChild className="mt-3 rounded-full">
            <Link href={rescheduleHref}>Reschedule Booking</Link>
          </Button>
        </>
      )}
    </div>
  );
}
