import { CalendarDays, Clock3, Users } from "lucide-react";

import type { PricingSidebarProps } from "../types";

export function PricingSidebar({
  pricePerPerson,
  participants,
  discount,
  finalAmount,
  tierLabel,
  totalHours,
  totalPieces,
}: PricingSidebarProps) {
  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
      <h2 className="font-display mb-4 text-lg font-semibold text-neutral-900">
        Pricing
      </h2>
      <div className="space-y-2 text-sm text-neutral-700">
        <div className="flex items-center justify-between">
          <span>Price per person</span>
          <span className="font-semibold">
            ₹{pricePerPerson.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Participants</span>
          <span className="font-semibold">{participants}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span className="font-semibold">
            -₹{discount.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
      <div className="mt-4 border-t border-neutral-200 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Total</span>
          <span className="text-primary text-2xl font-bold">
            ₹{finalAmount.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
      <div className="bg-primary-lighter mt-4 rounded-xl p-3 text-sm text-neutral-700">
        <p className="mb-1 font-semibold text-neutral-900">{tierLabel}</p>
        <div className="space-y-1 text-xs text-neutral-600">
          <p className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {totalHours} total hour(s)
          </p>
          <p className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {participants} participant(s)
          </p>
          <p className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {totalPieces} total pieces
          </p>
        </div>
      </div>
    </div>
  );
}
