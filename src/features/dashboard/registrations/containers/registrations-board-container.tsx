"use client";

import { updateRegistrationStatus } from "@/data/admin/registrations/gateway/server";
import {
  useCallback,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";

import type { KanbanColumn } from "@/components/dashboard/kanban-board";

import { getRegistrationStatusColor } from "@/lib/status-utils";

import { EventRegistrationStatus } from "@/graphql/generated/types";
import type { AdminUserRegistration } from "@/graphql/generated/types";

import { RegistrationsBoard } from "../components/registrations-board";
import type { RegistrationsBoardContainerProps } from "../types";

// Define the columns for registration status
const REGISTRATION_COLUMNS: { id: EventRegistrationStatus; title: string }[] = [
  { id: EventRegistrationStatus.Pending, title: "Pending" },
  { id: EventRegistrationStatus.Approved, title: "Approved" },
  { id: EventRegistrationStatus.Paid, title: "Paid" },
  { id: EventRegistrationStatus.Confirmed, title: "Confirmed" },
  { id: EventRegistrationStatus.Rejected, title: "Rejected" },
  { id: EventRegistrationStatus.Cancelled, title: "Cancelled" },
];

export function RegistrationsBoardContainer({
  registrations,
}: RegistrationsBoardContainerProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticRegistrations, setOptimisticRegistrations] =
    useOptimistic(registrations);
  const [selectedRegistration, setSelectedRegistration] =
    useState<AdminUserRegistration | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const columns = useMemo((): KanbanColumn<AdminUserRegistration>[] => {
    return REGISTRATION_COLUMNS.map((col) => ({
      id: col.id,
      title: col.title,
      items: optimisticRegistrations.filter((reg) => reg.status === col.id),
      colorClass: getRegistrationStatusColor(col.id),
    }));
  }, [optimisticRegistrations]);

  const handleCardClick = useCallback((registration: AdminUserRegistration) => {
    setSelectedRegistration(registration);
    setDialogOpen(true);
  }, []);

  const handleDialogOpenChange = useCallback((open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedRegistration(null);
    }
  }, []);

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

  return (
    <RegistrationsBoard
      columns={columns}
      isLoading={isPending}
      selectedRegistration={selectedRegistration}
      dialogOpen={dialogOpen}
      onMove={handleMove}
      onCardClick={handleCardClick}
      onDialogOpenChange={handleDialogOpenChange}
    />
  );
}
