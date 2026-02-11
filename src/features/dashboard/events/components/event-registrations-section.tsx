"use client";

import type { EventRegistrationStatus } from "@/graphql/generated/types";
import type { AdminEventRegistration } from "@/graphql/generated/types";

import { RegistrationTableRow } from "./registration-table-row";

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
                <RegistrationTableRow
                  key={registration.id}
                  id={registration.id}
                  userName={registration.user.name || null}
                  userEmail={registration.user.email}
                  userImage={registration.user.image || null}
                  seatsReserved={registration.seats_reserved}
                  price={registration.price}
                  discount={registration.discount}
                  status={registration.status}
                  createdAt={registration.created_at}
                />
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
