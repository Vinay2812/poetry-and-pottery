import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import type { DailyWorkshopsBookingViewModel } from "../../types";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface BookingCalendarSectionProps {
  viewModel: DailyWorkshopsBookingViewModel;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (dateKey: string) => void;
}

export function BookingCalendarSection({
  viewModel,
  onPreviousMonth,
  onNextMonth,
  onSelectDate,
}: BookingCalendarSectionProps) {
  return (
    <section className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          className="text-primary hover:bg-primary-lighter border-primary/15 rounded-full border p-2 transition-colors"
          onClick={onPreviousMonth}
          disabled={viewModel.isConfigLoading}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-sm font-semibold text-neutral-900 lg:text-base">
          {viewModel.monthLabel}
        </p>
        <button
          type="button"
          className="text-primary hover:bg-primary-lighter border-primary/15 rounded-full border p-2 transition-colors"
          onClick={onNextMonth}
          disabled={viewModel.isConfigLoading}
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-2">
        {WEEK_DAYS.map((label) => (
          <span
            key={label}
            className="text-center text-[11px] font-semibold tracking-wide text-neutral-500 uppercase"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {viewModel.calendarDays.map((day) => {
          return (
            <button
              key={day.dateKey}
              type="button"
              disabled={!day.isSelectable || viewModel.isConfigLoading}
              className={cn(
                "aspect-square rounded-xl text-sm font-semibold transition-colors",
                day.isSelected &&
                  "bg-primary text-primary-foreground shadow-sm",
                !day.isSelected &&
                  day.isSelectable &&
                  "hover:bg-primary-lighter text-neutral-800",
                !day.isSelectable && "cursor-not-allowed text-neutral-300",
                !day.isInCurrentMonth && "opacity-40",
                day.hasSelectedSlots && !day.isSelected && "bg-primary-lighter",
              )}
              onClick={() => onSelectDate(day.dateKey)}
            >
              {day.dayOfMonth}
            </button>
          );
        })}
      </div>
    </section>
  );
}
