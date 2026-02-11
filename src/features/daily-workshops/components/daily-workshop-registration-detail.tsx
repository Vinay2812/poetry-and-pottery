"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

import { createDate } from "@/lib/date";
import { cn } from "@/lib/utils";

import type { DailyWorkshopRegistrationDetailProps } from "../types";
import { CancellationNotice } from "./cancellation-notice";
import { DayTimelineTabs } from "./day-timeline-tabs";
import { PricingSidebar } from "./pricing-sidebar";

function formatDateTime(date: Date | string): string {
  return createDate(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
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
          <CancellationNotice
            cancellationTitle={viewModel.cancellationTitle}
            cancellationNotice={viewModel.cancellationNotice}
            canReschedule={viewModel.canReschedule}
            rescheduleRequiredSlots={viewModel.rescheduleRequiredSlots}
            rescheduleRequiredHours={viewModel.rescheduleRequiredHours}
            rescheduleHref={`/events/daily-workshops/${viewModel.registration.id}/reschedule`}
          />
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <section className="space-y-4">
            <DayTimelineTabs
              dayTimelines={viewModel.dayTimelines}
              activeDayKey={viewModel.activeDayKey}
              onSelectDay={onSelectDay}
            />

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
            <PricingSidebar
              pricePerPerson={viewModel.pricePerPerson}
              participants={viewModel.participants}
              discount={viewModel.discount}
              finalAmount={viewModel.finalAmount}
              tierLabel={viewModel.tierLabel}
              totalHours={viewModel.totalHours}
              totalPieces={viewModel.totalPieces}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
