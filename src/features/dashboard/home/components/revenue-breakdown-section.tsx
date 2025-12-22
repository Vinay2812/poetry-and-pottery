import { TrendingUpIcon } from "lucide-react";

import type { RevenueBreakdownSectionProps } from "../types";

export function RevenueBreakdownSection({
  ordersRevenue,
  registrationsRevenue,
  ordersTotal,
  registrationsTotal,
  totalRevenue,
  totalTransactions,
}: RevenueBreakdownSectionProps) {
  return (
    <section className="rounded-3xl bg-neutral-50 p-8">
      <div className="mb-6 flex items-center gap-2">
        <TrendingUpIcon className="text-primary size-5" />
        <h2 className="text-lg font-semibold">Revenue Breakdown</h2>
      </div>
      <div className="grid gap-8 sm:grid-cols-3">
        <div>
          <p className="text-muted-foreground mb-1 text-sm">Product Sales</p>
          <p className="text-2xl font-bold">
            ₹{ordersRevenue.toLocaleString("en-IN")}
          </p>
          <p className="text-muted-foreground text-sm">{ordersTotal} orders</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1 text-sm">
            Event Registrations
          </p>
          <p className="text-2xl font-bold">
            ₹{registrationsRevenue.toLocaleString("en-IN")}
          </p>
          <p className="text-muted-foreground text-sm">
            {registrationsTotal} registrations
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4">
          <p className="text-primary mb-1 text-sm font-medium">Total Revenue</p>
          <p className="text-primary text-2xl font-bold">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </p>
          <p className="text-muted-foreground text-sm">
            {totalTransactions} transactions
          </p>
        </div>
      </div>
    </section>
  );
}
