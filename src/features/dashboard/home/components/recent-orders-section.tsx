import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { createDate } from "@/lib/date";

import type { RecentOrdersSectionProps } from "../types";
import { StatusBadge } from "./status-badge";

export function RecentOrdersSection({ orders }: RecentOrdersSectionProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
        <Link
          href="/dashboard/users"
          className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
        >
          View all <ArrowRightIcon className="size-3" />
        </Link>
      </div>
      {orders.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center text-sm">
          No orders yet
        </p>
      ) : (
        <div className="divide-y">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                  {order.user.name || order.user.email.split("@")[0]}
                </p>
                <p className="text-muted-foreground text-sm">
                  {createDate(order.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ₹{order.total.toLocaleString("en-IN")}
                </p>
                <StatusBadge status={order.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
