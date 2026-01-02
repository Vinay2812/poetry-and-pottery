"use client";

import type { EventRegistrationStatus } from "@/prisma/generated/enums";
import { UserIcon } from "lucide-react";

import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

import { getRegistrationStatusColor } from "@/lib/status-utils";

import type { AdminEventRegistration } from "@/graphql/generated/types";

interface EventRegistrationsSectionProps {
  eventId: string;
  registrations: AdminEventRegistration[];
  total: number;
  statusCounts: Record<EventRegistrationStatus, number>;
}

export function EventRegistrationsSection({
  registrations,
  total,
  statusCounts,
}: EventRegistrationsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div
            key={status}
            className="rounded-xl border border-neutral-200 bg-white p-4"
          >
            <div className="text-2xl font-bold text-neutral-900">{count}</div>
            <div className="text-sm text-neutral-500">
              {status.toLowerCase().replace("_", " ")}
            </div>
          </div>
        ))}
      </div>

      {/* Registrations List */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                  User
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                  Seats
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-neutral-600">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                  Registered
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {registrations.map((registration) => (
                <tr
                  key={registration.id}
                  className="transition-colors hover:bg-neutral-50/50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {registration.user.image ? (
                        <div className="relative size-10 overflow-hidden rounded-full bg-neutral-100">
                          <OptimizedImage
                            src={registration.user.image}
                            alt={registration.user.name || ""}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex size-10 items-center justify-center rounded-full bg-neutral-100">
                          <UserIcon className="size-5 text-neutral-400" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-neutral-900">
                          {registration.user.name || "Unnamed User"}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {registration.user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-neutral-600">
                      {registration.seats_reserved}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="font-medium text-neutral-900">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(registration.price)}
                    </div>
                    {registration.discount > 0 && (
                      <div className="text-sm text-green-600">
                        -
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          maximumFractionDigits: 0,
                        }).format(registration.discount)}{" "}
                        discount
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={`border ${getRegistrationStatusColor(registration.status)}`}
                    >
                      {registration.status.toLowerCase().replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-sm text-neutral-500"
                      suppressHydrationWarning
                    >
                      {new Date(registration.created_at).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </td>
                </tr>
              ))}
              {registrations.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-neutral-500"
                  >
                    No registrations yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
