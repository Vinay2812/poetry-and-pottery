"use client";

import { CalendarDays, Clock3, RotateCcw } from "lucide-react";

import { EventsListLayout } from "@/components/events";
import { Button } from "@/components/ui/button";

import { createDate } from "@/lib/date";
import { cn } from "@/lib/utils";

import type { DailyWorkshopRescheduleProps } from "../types";
import { CalendarGrid } from "./calendar-grid";

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
            <CalendarGrid
              monthLabel={viewModel.monthLabel}
              calendarDays={viewModel.calendarDays}
              onPreviousMonth={onPreviousMonth}
              onNextMonth={onNextMonth}
              onSelectDate={onSelectDate}
            />

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
