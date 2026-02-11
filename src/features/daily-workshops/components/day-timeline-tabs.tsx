import { createDate } from "@/lib/date";
import { cn } from "@/lib/utils";

import type { DayTimelineTabsProps } from "../types";

function formatTime(date: Date | string): string {
  return createDate(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function DayTimelineTabs({
  dayTimelines,
  activeDayKey,
  onSelectDay,
}: DayTimelineTabsProps) {
  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap gap-2">
        {dayTimelines.map((day) => (
          <button
            key={day.dateKey}
            type="button"
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
              activeDayKey === day.dateKey
                ? "border-primary bg-primary text-white"
                : "hover:border-primary/40 border-neutral-200 bg-white text-neutral-600",
            )}
            onClick={() => onSelectDay(day.dateKey)}
          >
            {day.label} · {day.hours}h
          </button>
        ))}
      </div>

      {dayTimelines
        .filter((day) => day.dateKey === activeDayKey)
        .map((activeDay) => (
          <div key={activeDay.dateKey} className="space-y-3">
            {activeDay.slots.map((slot) => (
              <div
                key={slot.id}
                className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3"
              >
                <p className="text-sm font-semibold text-neutral-900">
                  {formatTime(slot.startAt)} - {formatTime(slot.endAt)}
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  Daily workshop slot
                </p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
