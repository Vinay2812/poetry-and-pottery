"use client";

import { CalendarDays, ChevronRight, Clock3, Users } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { createDate } from "@/lib/date";
import { cn } from "@/lib/utils";

import type { DailyWorkshopRegistrationDetailProps } from "../types";

function formatDateTime(date: Date | string): string {
  return createDate(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatTime(date: Date | string): string {
  return createDate(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function DailyWorkshopRegistrationDetail({
  viewModel,
  onSelectDay,
}: DailyWorkshopRegistrationDetailProps) {
  return (
    <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
      <div className="container mx-auto px-4 py-6 lg:px-8">
        <nav className="mb-6 hidden items-center gap-2 text-sm lg:flex">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-neutral-300" />
          <Link
            href="/events/registrations"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Registrations
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-neutral-300" />
          <span className="text-foreground font-medium">
            Daily Workshop Registration
          </span>
        </nav>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-neutral-900 lg:text-3xl">
              Daily Workshop Registration
            </h1>
            <p className="mt-1 font-mono text-xs text-neutral-500">
              #{viewModel.registration.id.toUpperCase()}
            </p>
          </div>
          <Badge className="bg-primary-lighter text-primary border-none px-4 py-1.5 text-xs font-bold uppercase">
            {viewModel.statusLabel}
          </Badge>
        </div>

        {viewModel.cancellationNotice && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-900">
              {viewModel.cancellationTitle ?? "Booking update"}
            </p>
            <p className="mt-1 text-sm text-amber-800">
              {viewModel.cancellationNotice}
            </p>
            {viewModel.canReschedule && (
              <>
                <p className="mt-2 text-sm font-medium text-amber-900">
                  Reschedule {viewModel.rescheduleRequiredSlots} session
                  {viewModel.rescheduleRequiredSlots > 1 ? "s" : ""} (
                  {viewModel.rescheduleRequiredHours} combined hour
                  {viewModel.rescheduleRequiredHours > 1 ? "s" : ""}). You can
                  choose slots across multiple days.
                </p>
                <Button asChild className="mt-3 rounded-full">
                  <Link
                    href={`/events/daily-workshops/${viewModel.registration.id}/reschedule`}
                  >
                    Reschedule Booking
                  </Link>
                </Button>
              </>
            )}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <section className="space-y-4">
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-wrap gap-2">
                {viewModel.dayTimelines.map((day) => (
                  <button
                    key={day.dateKey}
                    type="button"
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
                      viewModel.activeDayKey === day.dateKey
                        ? "border-primary bg-primary text-white"
                        : "hover:border-primary/40 border-neutral-200 bg-white text-neutral-600",
                    )}
                    onClick={() => onSelectDay(day.dateKey)}
                  >
                    {day.label} · {day.hours}h
                  </button>
                ))}
              </div>

              {viewModel.dayTimelines
                .filter((day) => day.dateKey === viewModel.activeDayKey)
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

            <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
              <h2 className="font-display mb-4 text-lg font-semibold text-neutral-900">
                Status History
              </h2>
              <div className="space-y-4">
                {viewModel.statusSteps.map((step) => (
                  <div key={step.label} className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-1 h-3 w-3 rounded-full",
                        step.isCompleted && "bg-primary",
                        step.isActive && !step.isCompleted && "bg-amber-500",
                        !step.isCompleted && !step.isActive && "bg-neutral-300",
                      )}
                    />
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">
                        {step.label}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {step.date
                          ? formatDateTime(step.date)
                          : step.isCompleted
                            ? "Updated"
                            : "Pending"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="h-fit space-y-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
              <h2 className="font-display mb-4 text-lg font-semibold text-neutral-900">
                Pricing
              </h2>
              <div className="space-y-2 text-sm text-neutral-700">
                <div className="flex items-center justify-between">
                  <span>Price per person</span>
                  <span className="font-semibold">
                    ₹{viewModel.pricePerPerson.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Participants</span>
                  <span className="font-semibold">
                    {viewModel.participants}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Discount</span>
                  <span className="font-semibold">
                    -₹{viewModel.discount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              <div className="mt-4 border-t border-neutral-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Total</span>
                  <span className="text-primary text-2xl font-bold">
                    ₹{viewModel.finalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              <div className="bg-primary-lighter mt-4 rounded-xl p-3 text-sm text-neutral-700">
                <p className="mb-1 font-semibold text-neutral-900">
                  {viewModel.tierLabel}
                </p>
                <div className="space-y-1 text-xs text-neutral-600">
                  <p className="flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    {viewModel.totalHours} total hour(s)
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    {viewModel.participants} participant(s)
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {viewModel.totalPieces} total pieces
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
