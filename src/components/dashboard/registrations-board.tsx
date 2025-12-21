"use client";

import {
  getRegistrationStatusColor,
  updateRegistrationStatus,
} from "@/actions/admin";
import type { UserRegistration } from "@/actions/admin";
import { EventRegistrationStatus } from "@/prisma/generated/enums";
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";

import { KanbanBoard, KanbanColumn } from "./kanban-board";
import { RegistrationDetailDialog } from "./registration-detail-dialog";

interface RegistrationsBoardProps {
  registrations: UserRegistration[];
}

// Define the columns for registration status
const REGISTRATION_COLUMNS: { id: EventRegistrationStatus; title: string }[] = [
  { id: EventRegistrationStatus.PENDING, title: "Pending" },
  { id: EventRegistrationStatus.APPROVED, title: "Approved" },
  { id: EventRegistrationStatus.PAID, title: "Paid" },
  { id: EventRegistrationStatus.CONFIRMED, title: "Confirmed" },
  { id: EventRegistrationStatus.REJECTED, title: "Rejected" },
  { id: EventRegistrationStatus.CANCELLED, title: "Cancelled" },
];

export function RegistrationsBoard({ registrations }: RegistrationsBoardProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticRegistrations, setOptimisticRegistrations] =
    useOptimistic(registrations);
  const [selectedRegistration, setSelectedRegistration] =
    useState<UserRegistration | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = useCallback((registration: UserRegistration) => {
    setSelectedRegistration(registration);
    setDialogOpen(true);
  }, []);

  const columns = useMemo((): KanbanColumn<UserRegistration>[] => {
    return REGISTRATION_COLUMNS.map((col) => ({
      id: col.id,
      title: col.title,
      items: optimisticRegistrations.filter((reg) => reg.status === col.id),
      colorClass: getRegistrationStatusColor(col.id),
    }));
  }, [optimisticRegistrations]);

  const handleMove = useCallback(
    async (registrationId: string, fromColumn: string, toColumn: string) => {
      const newStatus = toColumn as EventRegistrationStatus;

      // Optimistic update
      startTransition(async () => {
        setOptimisticRegistrations((prev) =>
          prev.map((reg) =>
            reg.id === registrationId ? { ...reg, status: newStatus } : reg,
          ),
        );

        const result = await updateRegistrationStatus(
          registrationId,
          newStatus,
        );

        if (!result.success) {
          console.error("Failed to update registration status:", result.error);
          // The page will revalidate and show the correct state
        }
      });
    },
    [setOptimisticRegistrations],
  );

  const renderRegistrationCard = useCallback(
    (registration: UserRegistration, isDragging?: boolean) => {
      return (
        <div
          onClick={() => handleCardClick(registration)}
          className={`cursor-pointer rounded-2xl bg-white p-4 shadow-sm transition-shadow ${
            isDragging ? "shadow-lg" : "hover:shadow-md"
          }`}
        >
          {/* Event Image */}
          {registration.event.image ? (
            <div className="relative mb-3 aspect-4/3 w-full overflow-hidden rounded-xl bg-neutral-100">
              <Image
                src={registration.event.image}
                alt={registration.event.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="mb-3 flex aspect-4/3 w-full items-center justify-center rounded-xl bg-neutral-100">
              <CalendarIcon className="size-10 text-neutral-300" />
            </div>
          )}

          {/* Event Info */}
          <div className="mb-3">
            <p className="line-clamp-2 text-sm font-medium text-neutral-900">
              {registration.event.title}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
              <MapPinIcon className="size-3" />
              <span className="truncate">{registration.event.location}</span>
            </p>
          </div>

          {/* Price with discount */}
          <div className="mb-3 flex items-baseline gap-2">
            <p className="text-primary text-lg font-bold">
              ₹
              {Math.max(
                0,
                registration.price - registration.discount,
              ).toLocaleString("en-IN")}
            </p>
            {registration.discount > 0 && (
              <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-600">
                -₹{registration.discount.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <UsersIcon className="size-3.5" />
              {registration.seats_reserved} seat
              {registration.seats_reserved !== 1 ? "s" : ""}
            </span>
            <span className="flex items-center gap-1" suppressHydrationWarning>
              <CalendarIcon className="size-3.5" />
              {new Date(registration.event.starts_at).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                },
              )}
            </span>
          </div>
        </div>
      );
    },
    [handleCardClick],
  );

  if (registrations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-neutral-50 py-12">
        <CalendarIcon className="mb-3 size-12 text-neutral-300" />
        <p className="text-neutral-500">No event registrations yet</p>
      </div>
    );
  }

  return (
    <div>
      <KanbanBoard
        columns={columns}
        onMove={handleMove}
        renderCard={renderRegistrationCard}
        isLoading={isPending}
      />
      <RegistrationDetailDialog
        registration={selectedRegistration}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
