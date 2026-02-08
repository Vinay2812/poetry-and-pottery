"use client";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Package,
  Users,
} from "lucide-react";

import { EventsListLayout } from "@/components/events";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

import type { DailyWorkshopsBookingProps } from "../types";

function formatHourLabel(hour: number): string {
  const normalizedHour = ((hour % 24) + 24) % 24;
  const suffix = normalizedHour >= 12 ? "PM" : "AM";
  const twelveHour = normalizedHour % 12 === 0 ? 12 : normalizedHour % 12;
  return `${twelveHour}:00 ${suffix}`;
}

export function DailyWorkshopsBooking({
  viewModel,
  onSelectConfig,
  onPreviousMonth,
  onNextMonth,
  onSelectDate,
  onToggleSlot,
  onParticipantsChange,
  onBook,
  isBooking,
  isSlotSelectionPending,
}: DailyWorkshopsBookingProps) {
  return (
    <EventsListLayout>
      <div>
        <section className="border-primary/20 from-primary-lighter/70 mb-6 rounded-3xl border bg-gradient-to-br via-white to-white p-5 shadow-sm lg:mb-8 lg:p-6">
          <div className="max-w-xl">
            <p className="mb-1 text-xs font-semibold tracking-wide text-neutral-500 uppercase">
              Select workshop type
            </p>
            <Select
              value={String(viewModel.selectedConfigId)}
              onValueChange={(value) => onSelectConfig(Number(value))}
              disabled={viewModel.isConfigLoading}
            >
              <SelectTrigger className="h-10 w-full rounded-xl border-neutral-200 bg-white text-sm">
                <SelectValue placeholder="Select workshop type" />
              </SelectTrigger>
              <SelectContent>
                {viewModel.availableConfigs.map((config) => (
                  <SelectItem key={config.id} value={String(config.id)}>
                    {config.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {viewModel.config.description && (
              <p className="mt-2 text-sm text-neutral-600">
                {viewModel.config.description}
              </p>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <span className="ring-primary/10 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-neutral-700 ring-1">
              <Clock3 className="text-primary h-3.5 w-3.5" />
              {formatHourLabel(viewModel.config.opening_hour)} -{" "}
              {formatHourLabel(viewModel.config.closing_hour)}
            </span>
            <span className="ring-primary/10 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-neutral-700 ring-1">
              <Users className="text-primary h-3.5 w-3.5" />
              Up to {viewModel.config.slot_capacity} people per slot
            </span>
            <span className="ring-primary/10 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-neutral-700 ring-1">
              <CalendarDays className="text-primary h-3.5 w-3.5" />
              Book up to {viewModel.config.booking_window_days} days ahead
            </span>
          </div>
          {viewModel.configError && (
            <p className="mt-3 text-xs font-medium text-red-600">
              {viewModel.configError}
            </p>
          )}
        </section>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-6">
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
                  );
                })}
              </div>
            </section>

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
                        <span className="text-sm font-semibold">
                          {rangeLabel}
                        </span>
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

            <section className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
              <h2 className="font-display mb-4 text-lg font-semibold text-neutral-900">
                Pricing Guide
              </h2>
              <div className="space-y-2">
                {[...viewModel.config.pricing_tiers]
                  .sort((a, b) => a.hours - b.hours)
                  .map((tier) => {
                    const appliedCount =
                      viewModel.appliedTierCounts[tier.id] ?? 0;
                    const isActive = appliedCount > 0;
                    return (
                      <div
                        key={tier.id}
                        className={cn(
                          "flex items-center justify-between rounded-xl border px-4 py-3",
                          isActive
                            ? "border-primary bg-primary-lighter"
                            : "border-neutral-200",
                        )}
                      >
                        <div>
                          <p className="text-sm font-semibold text-neutral-900">
                            {tier.hours} Hour Session
                          </p>
                          <p className="text-xs text-neutral-500">
                            {tier.pieces_per_person} pieces per person
                            {appliedCount > 1 ? ` • x${appliedCount}` : ""}
                          </p>
                        </div>
                        <p className="text-primary text-lg font-bold">
                          ₹{tier.price_per_person.toLocaleString("en-IN")}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm xl:sticky xl:top-24">
            <h2 className="font-display mb-4 text-lg font-semibold text-neutral-900">
              Booking Summary
            </h2>

            <div className="space-y-3 text-sm text-neutral-700">
              <div className="flex items-center justify-between">
                <span>Selected slots</span>
                <span className="font-semibold">
                  {viewModel.selectedSlotsCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total hours</span>
                <span className="font-semibold">{viewModel.totalHours}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Participants</span>
                <span className="font-semibold">{viewModel.participants}</span>
              </div>
            </div>

            <div className="my-5 rounded-xl bg-neutral-50 p-3">
              <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                Applied Tier
              </p>
              <p className="mt-1 text-sm font-semibold text-neutral-900">
                {viewModel.selectedTierLabel}
              </p>
            </div>

            <div className="mb-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <Clock3 className="h-4 w-4 text-neutral-500" />
                <span>
                  ₹{viewModel.pricePerPerson.toLocaleString("en-IN")} per person
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <Package className="h-4 w-4 text-neutral-500" />
                <span>
                  {viewModel.piecesPerPerson} pieces per person (selected
                  sessions)
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <Users className="h-4 w-4 text-neutral-500" />
                <span>{viewModel.totalPieces} total pieces</span>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-neutral-600">Total</span>
                <span className="text-primary text-2xl font-bold">
                  ₹{viewModel.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-10 rounded-full p-0"
                  onClick={() => onParticipantsChange(-1)}
                  disabled={
                    viewModel.participants <= 1 || viewModel.isConfigLoading
                  }
                >
                  -
                </Button>
                <span className="inline-flex h-10 min-w-12 items-center justify-center rounded-full border border-neutral-200 px-3 text-sm font-semibold text-neutral-800">
                  {viewModel.participants}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-10 rounded-full p-0"
                  onClick={() => onParticipantsChange(1)}
                  disabled={viewModel.isConfigLoading}
                >
                  +
                </Button>
              </div>
              <Button
                type="button"
                className="mt-4 w-full rounded-full"
                onClick={onBook}
                disabled={
                  viewModel.selectedSlotsCount === 0 ||
                  isBooking ||
                  viewModel.isConfigLoading
                }
              >
                {isBooking ? "Booking..." : "Book Workshop →"}
              </Button>
              {viewModel.bookingError && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {viewModel.bookingError}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </EventsListLayout>
  );
}
