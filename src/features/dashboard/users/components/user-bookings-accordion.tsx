"use client";

import { Loader2Icon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

import type {
  BookingRowViewModel,
  BookingTone,
  UserBookingsAccordionProps,
} from "../types";

const TONE_CLASSES: Record<BookingTone, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-blue-100 text-blue-700",
  paid: "bg-teal-100 text-teal-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
  neutral: "bg-neutral-100 text-neutral-600",
};

interface BookingRowProps {
  row: BookingRowViewModel;
  isUpdating: boolean;
  onStatusChange: (row: BookingRowViewModel, nextStatus: string) => void;
}

function BookingRow({ row, isUpdating, onStatusChange }: BookingRowProps) {
  // Guarantee the current status is selectable even if it's outside the
  // standard option set (e.g. an order that was refunded/returned).
  const options = row.statusOptions.some(
    (option) => option.value === row.status,
  )
    ? row.statusOptions
    : [{ value: row.status, label: row.statusLabel }, ...row.statusOptions];

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors",
        row.isMatched
          ? "bg-primary/5 ring-primary/40 ring-1"
          : "bg-neutral-50/70",
      )}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium text-neutral-900">
            {row.title}
          </p>
          {row.isMatched && (
            <span className="bg-primary/10 text-primary shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase">
              Match
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate font-mono text-xs text-neutral-400">
          #{row.id.toUpperCase()}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-neutral-700">
            {row.amountLabel}
          </p>
          <p className="text-xs text-neutral-400">{row.dateLabel}</p>
        </div>

        <div className="flex w-[140px] items-center justify-end gap-1.5">
          {isUpdating && (
            <Loader2Icon className="size-3.5 animate-spin text-neutral-400" />
          )}
          <Select
            value={row.status}
            onValueChange={(value) => onStatusChange(row, value)}
            disabled={isUpdating}
          >
            <SelectTrigger
              className={cn(
                "h-7 w-auto gap-1 rounded-full border-0 px-2.5 text-xs font-medium shadow-none focus:ring-0 focus:ring-offset-0",
                TONE_CLASSES[row.tone],
              )}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-xs"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

interface BookingSectionProps {
  value: string;
  label: string;
  rows: BookingRowViewModel[];
  emptyLabel: string;
  updatingId: string | null;
  onStatusChange: (row: BookingRowViewModel, nextStatus: string) => void;
}

function BookingSection({
  value,
  label,
  rows,
  emptyLabel,
  updatingId,
  onStatusChange,
}: BookingSectionProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-sm">
        <span className="flex items-center gap-2">
          {label}
          <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-500">
            {rows.length}
          </span>
        </span>
      </AccordionTrigger>
      <AccordionContent className="space-y-2">
        {rows.length === 0 ? (
          <p className="px-3 py-2 text-sm text-neutral-400">{emptyLabel}</p>
        ) : (
          rows.map((row) => (
            <BookingRow
              key={row.id}
              row={row}
              isUpdating={updatingId === row.id}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

export function UserBookingsAccordion({
  viewModel,
  updatingId,
  onStatusChange,
}: UserBookingsAccordionProps) {
  if (viewModel.isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-6 text-sm text-neutral-500">
        <Loader2Icon className="size-4 animate-spin" />
        Loading bookings…
      </div>
    );
  }

  if (viewModel.hasError) {
    return (
      <div className="px-3 py-6 text-sm text-red-500">
        Failed to load this user&apos;s bookings. Please try again.
      </div>
    );
  }

  // Open every non-empty section by default so the admin sees everything at a
  // glance once a row is expanded.
  const defaultOpen = [
    viewModel.orders.length > 0 ? "orders" : null,
    viewModel.registrations.length > 0 ? "registrations" : null,
    viewModel.dailyWorkshops.length > 0 ? "daily-workshops" : null,
  ].filter((value): value is string => value !== null);

  return (
    <Accordion type="multiple" defaultValue={defaultOpen} className="w-full">
      <BookingSection
        value="orders"
        label="Orders"
        rows={viewModel.orders}
        emptyLabel="No orders yet."
        updatingId={updatingId}
        onStatusChange={onStatusChange}
      />
      <BookingSection
        value="registrations"
        label="Event Registrations"
        rows={viewModel.registrations}
        emptyLabel="No event registrations yet."
        updatingId={updatingId}
        onStatusChange={onStatusChange}
      />
      <BookingSection
        value="daily-workshops"
        label="Daily Workshop Bookings"
        rows={viewModel.dailyWorkshops}
        emptyLabel="No daily workshop bookings yet."
        updatingId={updatingId}
        onStatusChange={onStatusChange}
      />
    </Accordion>
  );
}
