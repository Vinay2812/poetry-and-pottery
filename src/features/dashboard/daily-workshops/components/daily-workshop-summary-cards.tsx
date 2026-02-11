import type { DailyWorkshopSummaryCardsProps } from "../types";

export function DailyWorkshopSummaryCards({
  tiersCount,
  activeTiersCount,
  blackoutsCount,
  activeBlackoutsCount,
  openingHourLabel,
  closingHourLabel,
  slotDurationLabel,
  bookingWindowDays,
}: DailyWorkshopSummaryCardsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl border bg-white p-4">
        <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
          Pricing Tiers
        </p>
        <p className="mt-2 text-2xl font-semibold text-neutral-900">
          {tiersCount}
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          {activeTiersCount} active
        </p>
      </div>
      <div className="rounded-2xl border bg-white p-4">
        <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
          Blackout Rules
        </p>
        <p className="mt-2 text-2xl font-semibold text-neutral-900">
          {blackoutsCount}
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          {activeBlackoutsCount} active
        </p>
      </div>
      <div className="rounded-2xl border bg-white p-4">
        <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
          Operating Hours
        </p>
        <p className="mt-2 text-sm font-semibold text-neutral-900">
          {openingHourLabel} - {closingHourLabel}
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          {slotDurationLabel} slots
        </p>
      </div>
      <div className="rounded-2xl border bg-white p-4">
        <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
          Booking Window
        </p>
        <p className="mt-2 text-2xl font-semibold text-neutral-900">
          {bookingWindowDays}
        </p>
        <p className="mt-1 text-xs text-neutral-500">days ahead</p>
      </div>
    </div>
  );
}
