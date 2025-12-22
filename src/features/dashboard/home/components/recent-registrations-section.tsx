import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import type { RecentRegistrationsSectionProps } from "../types";
import { StatusBadge } from "./status-badge";

export function RecentRegistrationsSection({
  registrations,
}: RecentRegistrationsSectionProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Registrations</h2>
        <Link
          href="/dashboard/events"
          className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
        >
          View all <ArrowRightIcon className="size-3" />
        </Link>
      </div>
      {registrations.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center text-sm">
          No registrations yet
        </p>
      ) : (
        <div className="divide-y">
          {registrations.map((reg) => (
            <div
              key={reg.id}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                  {reg.user.name || reg.user.email.split("@")[0]}
                </p>
                <p className="text-muted-foreground truncate text-sm">
                  {reg.event.title}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ₹{reg.price.toLocaleString("en-IN")}
                </p>
                <StatusBadge status={reg.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
