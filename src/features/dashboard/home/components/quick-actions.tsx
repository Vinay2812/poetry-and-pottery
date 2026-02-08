import Link from "next/link";
import { useMemo } from "react";

import { createDate } from "@/lib/date";

import type { QuickActionsProps } from "../types";

export function QuickActions({
  ordersPending,
  ordersProcessing,
  registrationsPending,
  productsOutOfStock,
  productsLowStock,
  eventsUpcomingIn7Days,
}: QuickActionsProps) {
  const hasAttention =
    ordersPending > 0 ||
    ordersProcessing > 0 ||
    registrationsPending > 0 ||
    productsOutOfStock > 0 ||
    productsLowStock > 0 ||
    eventsUpcomingIn7Days > 0;

  const thisWeek = useMemo(() => {
    const startDate = createDate();
    const endDate = startDate.setDate(startDate.getDate() + 7);

    const isoStartDate = createDate(startDate).toISOString().split("T")[0];
    const isoEndDate = createDate(endDate).toISOString().split("T")[0];

    return {
      startDate: isoStartDate,
      endDate: isoEndDate,
    };
  }, []);

  if (!hasAttention) {
    return null;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {ordersPending > 0 && (
        <Link
          href="/dashboard/users"
          className="group flex items-center gap-3 rounded-2xl bg-amber-50 p-4 transition-colors hover:bg-amber-100"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 group-hover:bg-amber-200">
            <span className="text-lg font-bold">{ordersPending}</span>
          </div>
          <div>
            <p className="font-medium text-amber-900">Pending Orders</p>
            <p className="text-sm text-amber-600">Review now →</p>
          </div>
        </Link>
      )}
      {ordersProcessing > 0 && (
        <Link
          href="/dashboard/users"
          className="group flex items-center gap-3 rounded-2xl bg-blue-50 p-4 transition-colors hover:bg-blue-100"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-200">
            <span className="text-lg font-bold">{ordersProcessing}</span>
          </div>
          <div>
            <p className="font-medium text-blue-900">Processing</p>
            <p className="text-sm text-blue-600">Track status →</p>
          </div>
        </Link>
      )}
      {registrationsPending > 0 && (
        <Link
          href="/dashboard/events"
          className="group flex items-center gap-3 rounded-2xl bg-purple-50 p-4 transition-colors hover:bg-purple-100"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 group-hover:bg-purple-200">
            <span className="text-lg font-bold">{registrationsPending}</span>
          </div>
          <div>
            <p className="font-medium text-purple-900">Pending Registrations</p>
            <p className="text-sm text-purple-600">Confirm now →</p>
          </div>
        </Link>
      )}
      {productsOutOfStock > 0 && (
        <Link
          href="/dashboard/products?stock=out"
          className="group flex items-center gap-3 rounded-2xl bg-red-50 p-4 transition-colors hover:bg-red-100"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-red-100 text-red-600 group-hover:bg-red-200">
            <span className="text-lg font-bold">{productsOutOfStock}</span>
          </div>
          <div>
            <p className="font-medium text-red-900">Out of Stock</p>
            <p className="text-sm text-red-600">Restock now →</p>
          </div>
        </Link>
      )}
      {productsLowStock > 0 && (
        <Link
          href="/dashboard/products?stock=low"
          className="group bg-terracotta/10 hover:bg-terracotta/20 flex items-center gap-3 rounded-2xl p-4 transition-colors"
        >
          <div className="bg-terracotta/20 text-terracotta group-hover:bg-terracotta/30 flex size-10 items-center justify-center rounded-xl">
            <span className="text-lg font-bold">{productsLowStock}</span>
          </div>
          <div>
            <p className="text-terracotta font-medium">Low Stock</p>
            <p className="text-terracotta/80 text-sm">Check inventory →</p>
          </div>
        </Link>
      )}
      {eventsUpcomingIn7Days > 0 && (
        <Link
          href={`/dashboard/events?startDate=${thisWeek.startDate}&endDate=${thisWeek.endDate}`}
          className="group flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 transition-colors hover:bg-emerald-100"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200">
            <span className="text-lg font-bold">{eventsUpcomingIn7Days}</span>
          </div>
          <div>
            <p className="font-medium text-emerald-900">Events This Week</p>
            <p className="text-sm text-emerald-600">Starting soon →</p>
          </div>
        </Link>
      )}
    </div>
  );
}
