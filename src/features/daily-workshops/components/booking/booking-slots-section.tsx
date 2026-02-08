import { createDate } from "@/lib/date";
import { cn } from "@/lib/utils";

import type { DailyWorkshopsBookingViewModel } from "../../types";

interface BookingSlotsSectionProps {
  viewModel: DailyWorkshopsBookingViewModel;
  onSelectDate: (dateKey: string) => void;
  onToggleSlot: (slotStartAt: Date | string) => void;
  isSlotSelectionPending: boolean;
}

export function BookingSlotsSection({
  viewModel,
  onSelectDate,
  onToggleSlot,
  isSlotSelectionPending,
}: BookingSlotsSectionProps) {
  return (
    <section className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="font-display text-lg font-semibold text-neutral-900">
            {viewModel.activeDateLabel}
          </p>
          <p className="text-sm text-neutral-500">
            Select one or more hourly slots
          </p>
        </div>
        {isSlotSelectionPending && (
          <span className="text-primary text-xs font-semibold">
            Updating...
          </span>
        )}
      </div>

      {viewModel.selectedDateTabs.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {viewModel.selectedDateTabs.map((tab) => (
            <button
              key={tab.dateKey}
              type="button"
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                tab.dateKey === viewModel.activeDateKey
                  ? "border-primary bg-primary text-white"
                  : "hover:border-primary/40 border-neutral-200 bg-white text-neutral-600",
              )}
              onClick={() => onSelectDate(tab.dateKey)}
            >
              {tab.label} · {tab.hours}h
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {viewModel.activeDaySlots.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-200 bg-neutral-50 px-4 py-5 text-sm text-neutral-500">
            {viewModel.isConfigLoading
              ? "Loading available slots..."
              : "No slots available for this day. Pick another date or workshop config."}
          </div>
        )}

        {viewModel.activeDaySlots.map((slot) => {
          const start = createDate(slot.startAt);
          const end = createDate(slot.endAt);
          const rangeLabel = `${start.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })} - ${end.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}`;

          return (
            <button
              key={start.toISOString()}
              type="button"
              disabled={!slot.isAvailable || viewModel.isConfigLoading}
              className={cn(
                "w-full rounded-xl border px-4 py-3 text-left transition-colors",
                slot.isSelected &&
                  "border-primary bg-primary text-primary-foreground shadow-sm",
                !slot.isSelected &&
                  slot.isAvailable &&
                  "hover:border-primary/40 hover:bg-primary-lighter/50 border-neutral-200",
                !slot.isAvailable &&
                  "cursor-not-allowed border-neutral-100 bg-neutral-50 text-neutral-400",
              )}
              onClick={() => onToggleSlot(slot.startAt)}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold">{rangeLabel}</span>
                <span className="text-xs font-medium">
                  {slot.isAvailable
                    ? `${slot.remainingCapacity} spots`
                    : (slot.reason ?? "Unavailable")}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
