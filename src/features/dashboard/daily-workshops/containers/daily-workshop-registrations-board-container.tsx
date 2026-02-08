"use client";

import { updateUserDailyWorkshopRegistrationStatus } from "@/data/admin/users/gateway/server";
import {
  useCallback,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";

import type { KanbanColumn } from "@/components/dashboard/kanban-board";

import { getDailyWorkshopRegistrationStatusColor } from "@/lib/status-utils";

import { DailyWorkshopRegistrationStatus } from "@/graphql/generated/types";

import { DailyWorkshopRegistrationsBoard } from "../components/daily-workshop-registrations-board";
import type {
  AdminUserDailyWorkshopRegistration,
  DailyWorkshopRegistrationsBoardContainerProps,
} from "../types";

const DAILY_WORKSHOP_COLUMNS: {
  id: DailyWorkshopRegistrationStatus;
  title: string;
}[] = [
  { id: DailyWorkshopRegistrationStatus.Pending, title: "Pending" },
  { id: DailyWorkshopRegistrationStatus.Approved, title: "Approved" },
  { id: DailyWorkshopRegistrationStatus.Paid, title: "Paid" },
  { id: DailyWorkshopRegistrationStatus.Confirmed, title: "Confirmed" },
  { id: DailyWorkshopRegistrationStatus.Cancelled, title: "Cancelled" },
  { id: DailyWorkshopRegistrationStatus.Rejected, title: "Rejected" },
];

type DailyWorkshopOptimisticAction = {
  type: "status";
  registrationId: string;
  status: DailyWorkshopRegistrationStatus;
};

function applyDailyWorkshopOptimisticAction(
  state: AdminUserDailyWorkshopRegistration[],
  action: DailyWorkshopOptimisticAction,
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

export function DailyWorkshopRegistrationsBoardContainer({
  registrations,
}: DailyWorkshopRegistrationsBoardContainerProps) {
  const [, startTransition] = useTransition();
  const [registrationsState, setRegistrationsState] = useState(registrations);
  const [optimisticRegistrations, setOptimisticRegistrations] = useOptimistic(
    registrationsState,
    (
      state: AdminUserDailyWorkshopRegistration[],
      action: DailyWorkshopOptimisticAction,
    ) => applyDailyWorkshopOptimisticAction(state, action),
  );
  const [selectedRegistration, setSelectedRegistration] =
    useState<AdminUserDailyWorkshopRegistration | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setRegistrationsState(registrations);
  }, [registrations]);

  const columns = useMemo(
    (): KanbanColumn<AdminUserDailyWorkshopRegistration>[] =>
      DAILY_WORKSHOP_COLUMNS.map((column) => ({
        id: column.id,
        title: column.title,
        items: optimisticRegistrations.filter(
          (registration) => registration.status === column.id,
        ),
        colorClass: getDailyWorkshopRegistrationStatusColor(column.id),
      })),
    [optimisticRegistrations],
  );

  const handleMove = useCallback(
    async (registrationId: string, fromColumn: string, toColumn: string) => {
      const nextStatus = toColumn as DailyWorkshopRegistrationStatus;
      const previousStatus = fromColumn as DailyWorkshopRegistrationStatus;
      const optimisticAction: DailyWorkshopOptimisticAction = {
        type: "status",
        registrationId,
        status: nextStatus,
      };

      setOptimisticRegistrations(optimisticAction);

      startTransition(async () => {
        try {
          const result = await updateUserDailyWorkshopRegistrationStatus(
            registrationId,
            nextStatus,
          );

          if (!result.success) {
            setOptimisticRegistrations({
              type: "status",
              registrationId,
              status: previousStatus,
            });
            setRegistrationsState((previous) =>
              applyDailyWorkshopOptimisticAction(previous, {
                type: "status",
                registrationId,
                status: previousStatus,
              }),
            );
            return;
          }

          setRegistrationsState((previous) =>
            applyDailyWorkshopOptimisticAction(previous, optimisticAction),
          );
          if (selectedRegistration?.id === registrationId) {
            setSelectedRegistration((previous) =>
              previous ? { ...previous, status: nextStatus } : previous,
            );
          }
        } catch (error) {
          console.error("Failed to update daily workshop status:", error);
          setOptimisticRegistrations({
            type: "status",
            registrationId,
            status: previousStatus,
          });
          setRegistrationsState((previous) =>
            applyDailyWorkshopOptimisticAction(previous, {
              type: "status",
              registrationId,
              status: previousStatus,
            }),
          );
        }
      });
    },
    [selectedRegistration?.id, setOptimisticRegistrations, startTransition],
  );

  const handleCardClick = useCallback(
    (registration: AdminUserDailyWorkshopRegistration) => {
      setSelectedRegistration(registration);
      setDialogOpen(true);
    },
    [],
  );

  const handleDialogOpenChange = useCallback((open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedRegistration(null);
    }
  }, []);

  const handleRegistrationUpdated = useCallback(
    (updatedRegistration: AdminUserDailyWorkshopRegistration) => {
      setRegistrationsState((previous) =>
        previous.map((registration) =>
          registration.id === updatedRegistration.id
            ? updatedRegistration
            : registration,
        ),
      );
      setSelectedRegistration(updatedRegistration);
    },
    [],
  );

  return (
    <DailyWorkshopRegistrationsBoard
      columns={columns}
      isLoading={false}
      selectedRegistration={selectedRegistration}
      dialogOpen={dialogOpen}
      onMove={handleMove}
      onCardClick={handleCardClick}
      onDialogOpenChange={handleDialogOpenChange}
      onRegistrationUpdated={handleRegistrationUpdated}
    />
  );
}
