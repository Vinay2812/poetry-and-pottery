"use client";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  RotateCcw,
} from "lucide-react";

import { EventsListLayout } from "@/components/events";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type { DailyWorkshopRescheduleProps } from "../types";

export function DailyWorkshopReschedule({
  viewModel,
  onPreviousMonth,
  onNextMonth,
  onSelectDate,
  onToggleSlot,
  onReschedule,
  isSubmitting,
  isSlotSelectionPending,
}: DailyWorkshopRescheduleProps) {
  const isSelectionComplete =
    viewModel.selectedSlotsCount === viewModel.requiredSlots;

  return (
    <EventsListLayout>
      <div>
        <section className="border-primary/20 from-primary-lighter/70 mb-6 rounded-3xl border bg-gradient-to-br via-white to-white p-5 shadow-sm lg:mb-8 lg:p-6">
          <h1 className="font-display text-2xl font-bold tracking-tight text-neutral-900 lg:text-3xl">
            Reschedule Daily Workshop
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            Choose new slots for cancelled sessions. You must select{" "}
            {viewModel.requiredSlots} session
            {viewModel.requiredSlots > 1 ? "s" : ""} ({viewModel.requiredHours}{" "}
            combined hour
            {viewModel.requiredHours > 1 ? "s" : ""}) and you can split them
            across multiple days.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <span className="ring-primary/10 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-neutral-700 ring-1">
              <CalendarDays className="text-primary h-3.5 w-3.5" />
              Required sessions: {viewModel.requiredSlots}
            </span>
            <span className="ring-primary/10 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-neutral-700 ring-1">
              <Clock3 className="text-primary h-3.5 w-3.5" />
              Combined hours: {viewModel.requiredHours}
            </span>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <button
                  type="button"
                  className="text-primary hover:bg-primary-lighter border-primary/15 rounded-full border p-2 transition-colors"
                  onClick={onPreviousMonth}
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
                  aria-label="Next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-2 grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (label) => (
                    <span
                      key={label}
                      className="text-center text-[11px] font-semibold tracking-wide text-neutral-500 uppercase"
                    >
                      {label}
                    </span>
                  ),
                )}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {viewModel.calendarDays.map((day) => (
                  <button
                    key={day.dateKey}
                    type="button"
                    disabled={!day.isSelectable}
                    className={cn(
                      "aspect-square rounded-xl text-sm font-semibold transition-colors",
                      day.isSelected &&
                        "bg-primary text-primary-foreground shadow-sm",
                      !day.isSelected &&
                        day.isSelectable &&
                        "hover:bg-primary-lighter text-neutral-800",
                      !day.isSelectable &&
                        "cursor-not-allowed text-neutral-300",
                      !day.isInCurrentMonth && "opacity-40",
                      day.hasSelectedSlots &&
                        !day.isSelected &&
                        "bg-primary-lighter",
                    )}
                    onClick={() => onSelectDate(day.dateKey)}
                  >
                    {day.dayOfMonth}
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-semibold text-neutral-900">
                    {viewModel.activeDateLabel}
                  </p>
                  <p className="text-sm text-neutral-500">
                    Select {viewModel.requiredSlots} session
                    {viewModel.requiredSlots > 1 ? "s" : ""}
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
                {viewModel.activeDaySlots.map((slot) => {
                  const start = new Date(slot.startAt);
                  const end = new Date(slot.endAt);
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
                      disabled={!slot.isAvailable}
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
                        <span className="text-sm font-semibold">
                          {rangeLabel}
                        </span>
                        <span className="text-xs font-medium">
                          {slot.isAvailable
                            ? "Available"
                            : (slot.reason ?? "Unavailable")}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm xl:sticky xl:top-24">
            <h2 className="font-display mb-4 text-lg font-semibold text-neutral-900">
              Reschedule Summary
            </h2>

            <div className="space-y-3 text-sm text-neutral-700">
              <div className="flex items-center justify-between">
                <span>Required sessions</span>
                <span className="font-semibold">{viewModel.requiredSlots}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Selected sessions</span>
                <span
                  className={cn(
                    "font-semibold",
                    isSelectionComplete ? "text-emerald-700" : "text-amber-700",
                  )}
                >
                  {viewModel.selectedSlotsCount}
                </span>
              </div>
            </div>

            <Button
              type="button"
              className="mt-5 w-full rounded-full"
              onClick={onReschedule}
              disabled={!isSelectionComplete || isSubmitting}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              {isSubmitting ? "Rescheduling..." : "Confirm Reschedule"}
            </Button>

            {!isSelectionComplete && (
              <p className="mt-2 text-xs text-neutral-600">
                Select exactly {viewModel.requiredSlots} session
                {viewModel.requiredSlots > 1 ? "s" : ""} to continue.
              </p>
            )}

            {viewModel.bookingError && (
              <p className="mt-2 text-xs font-medium text-red-600">
                {viewModel.bookingError}
              </p>
            )}
          </aside>
        </div>
      </div>
    </EventsListLayout>
  );
}
