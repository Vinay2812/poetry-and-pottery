"use client";

import {
  type DailyWorkshopRegistration,
  DailyWorkshopRegistrationStatus,
} from "@/data/daily-workshops/types";
import { CalendarDays, Clock3, Package, Palette, Users } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { createDate } from "@/lib/date";
import { cn } from "@/lib/utils";

type DailyWorkshopCardVariant = "upcoming" | "completed";

interface DailyWorkshopRegistrationCardProps {
  registration: DailyWorkshopRegistration;
  variant: DailyWorkshopCardVariant;
}

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatDate(date: Date | string): string {
  return createDate(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(date: Date | string): string {
  return createDate(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getStatusBadgeClass(status: DailyWorkshopRegistrationStatus): string {
  switch (status) {
    case DailyWorkshopRegistrationStatus.Pending:
      return "bg-amber-100 text-amber-800";
    case DailyWorkshopRegistrationStatus.Approved:
      return "bg-blue-100 text-blue-800";
    case DailyWorkshopRegistrationStatus.Paid:
      return "bg-teal-100 text-teal-800";
    case DailyWorkshopRegistrationStatus.Confirmed:
      return "bg-emerald-100 text-emerald-800";
    case DailyWorkshopRegistrationStatus.Rejected:
      return "bg-red-100 text-red-800";
    case DailyWorkshopRegistrationStatus.Cancelled:
      return "bg-neutral-100 text-neutral-500";
    default:
      return "bg-neutral-100 text-neutral-600";
  }
}

function getStatusLabel(status: DailyWorkshopRegistrationStatus): string {
  switch (status) {
    case DailyWorkshopRegistrationStatus.Pending:
      return "Pending";
    case DailyWorkshopRegistrationStatus.Approved:
      return "Approved";
    case DailyWorkshopRegistrationStatus.Paid:
      return "Paid";
    case DailyWorkshopRegistrationStatus.Confirmed:
      return "Confirmed";
    case DailyWorkshopRegistrationStatus.Rejected:
      return "Rejected";
    case DailyWorkshopRegistrationStatus.Cancelled:
      return "Cancelled";
    default:
      return status;
  }
}

export function DailyWorkshopRegistrationCard({
  registration,
  variant,
}: DailyWorkshopRegistrationCardProps) {
  const sortedSlots = [...registration.slots].sort((a, b) => {
    return (
      createDate(a.slot_start_at).getTime() -
      createDate(b.slot_start_at).getTime()
    );
  });

  const firstSlot = sortedSlots[0];
  const lastSlot = sortedSlots[sortedSlots.length - 1];
  const nextSlot = firstSlot;
  const isCancelled =
    registration.status === DailyWorkshopRegistrationStatus.Cancelled;

  return (
    <div
      className={cn(
        "flex gap-4 rounded-2xl bg-white p-3 lg:p-4 dark:bg-neutral-900",
        isCancelled && "opacity-60",
      )}
    >
      <Link
        href={`/events/daily-workshops/${registration.id}`}
        className="group relative flex h-24 w-24 shrink-0 flex-col items-center justify-between overflow-hidden rounded-xl bg-neutral-100 p-3 lg:h-28 lg:w-28 dark:bg-neutral-800"
      >
        <Badge className="bg-primary-lighter text-primary border-none px-1.5 py-0.5 text-[10px] font-semibold uppercase">
          Daily
        </Badge>
        <Palette className="text-primary h-7 w-7" />
        <span className="text-center text-[10px] font-medium text-neutral-600 dark:text-neutral-300">
          Flexible Slots
        </span>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <div className="mb-1.5 flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <Link
                href={`/events/daily-workshops/${registration.id}`}
                className="font-display line-clamp-2 text-sm leading-snug font-semibold text-neutral-900 hover:underline lg:text-base dark:text-neutral-100"
              >
                Daily Workshop
              </Link>
              <span className="text-primary mt-0.5 flex items-center gap-1 text-[10px] font-medium lg:text-xs">
                <Clock3 className="h-3 w-3" />
                <span>
                  {registration.slots_count} slot
                  {registration.slots_count > 1 ? "s" : ""} •{" "}
                  {registration.total_hours} hour
                  {registration.total_hours > 1 ? "s" : ""}
                </span>
              </span>
            </div>
            <Badge
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                getStatusBadgeClass(registration.status),
              )}
            >
              {getStatusLabel(registration.status)}
            </Badge>
          </div>

          {nextSlot && firstSlot && lastSlot && (
            <div className="mb-1 flex items-center gap-1.5 text-xs text-neutral-500 lg:text-sm">
              <CalendarDays className="h-3.5 w-3.5 shrink-0" />
              {variant === "upcoming" ? (
                <span>
                  {formatDate(nextSlot.slot_start_at)} •{" "}
                  {formatTime(nextSlot.slot_start_at)}
                </span>
              ) : (
                <span>
                  {formatDate(firstSlot.slot_start_at)} -{" "}
                  {formatDate(lastSlot.slot_start_at)}
                </span>
              )}
            </div>
          )}

          <div className="mb-1 flex items-center gap-1.5 text-xs text-neutral-500 lg:text-sm">
            <Users className="h-3.5 w-3.5 shrink-0" />
            <span>{registration.participants} participant(s)</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-neutral-500 lg:text-sm">
            <Package className="h-3.5 w-3.5 shrink-0" />
            <span>{registration.total_pieces} pieces included</span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="font-mono text-[10px] text-neutral-400 lg:text-xs">
            Reg #{registration.id.toUpperCase().slice(0, 12)}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-primary text-sm font-semibold lg:text-base">
              {formatCurrency(registration.final_amount)}
            </span>
            <Link href={`/events/daily-workshops/${registration.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-lg px-4 text-xs font-medium"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
