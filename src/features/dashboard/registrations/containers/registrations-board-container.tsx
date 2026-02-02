"use client";

import { updateRegistrationStatus } from "@/data/admin/registrations/gateway/server";
import {
  useCallback,
  useEffect,
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

type RegistrationsOptimisticAction = {
  type: "status";
  registrationId: string;
  status: EventRegistrationStatus;
};

function applyRegistrationsOptimisticAction(
  state: AdminUserRegistration[],
  action: RegistrationsOptimisticAction,
) {
  switch (action.type) {
    case "status":
      return state.map((registration) =>
        registration.id === action.registrationId
          ? { ...registration, status: action.status }
          : registration,
      );
    default:
      return state;
  }
}

export function RegistrationsBoardContainer({
  registrations,
}: RegistrationsBoardContainerProps) {
  const [, startTransition] = useTransition();
  const [registrationsState, setRegistrationsState] = useState(registrations);
  const [optimisticRegistrations, setOptimisticRegistrations] = useOptimistic(
    registrationsState,
    (state: AdminUserRegistration[], action: RegistrationsOptimisticAction) =>
      applyRegistrationsOptimisticAction(state, action),
  );
  const [selectedRegistration, setSelectedRegistration] =
    useState<AdminUserRegistration | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setRegistrationsState(registrations);
  }, [registrations]);

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
      const optimisticAction: RegistrationsOptimisticAction = {
        type: "status",
        registrationId,
        status: newStatus,
      };

      // Optimistic update (instant UI)
      setOptimisticRegistrations(optimisticAction);

      startTransition(async () => {
        try {
          const result = await updateRegistrationStatus(
            registrationId,
            newStatus,
          );

          if (!result.success) {
            console.error(
              "Failed to update registration status:",
              result.error,
            );
            setOptimisticRegistrations({
              type: "status",
              registrationId,
              status: fromColumn as EventRegistrationStatus,
            });
            setRegistrationsState((prev) =>
              applyRegistrationsOptimisticAction(prev, {
                type: "status",
                registrationId,
                status: fromColumn as EventRegistrationStatus,
              }),
            );
            return;
          }

          setRegistrationsState((prev) =>
            applyRegistrationsOptimisticAction(prev, optimisticAction),
          );
        } catch (error) {
          console.error("Failed to update registration status:", error);
          setOptimisticRegistrations({
            type: "status",
            registrationId,
            status: fromColumn as EventRegistrationStatus,
          });
          setRegistrationsState((prev) =>
            applyRegistrationsOptimisticAction(prev, {
              type: "status",
              registrationId,
              status: fromColumn as EventRegistrationStatus,
            }),
          );
        }
      });
    },
    [setOptimisticRegistrations, startTransition],
  );

  return (
    <RegistrationsBoard
      columns={columns}
      isLoading={false}
      selectedRegistration={selectedRegistration}
      dialogOpen={dialogOpen}
      onMove={handleMove}
      onCardClick={handleCardClick}
      onDialogOpenChange={handleDialogOpenChange}
    />
  );
}
