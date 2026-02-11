"use client";

import { updateRegistrationStatus } from "@/data/admin/registrations/gateway/server";
import { useKanbanOptimisticBoard } from "@/hooks";
import { useCallback } from "react";

import { getRegistrationStatusColor } from "@/lib/status-utils";

import { EventRegistrationStatus } from "@/graphql/generated/types";
import type { AdminUserRegistration } from "@/graphql/generated/types";

import { RegistrationsBoard } from "../components/registrations-board";
import type { RegistrationsBoardContainerProps } from "../types";

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
  const handleUpdateStatus = useCallback(
    async (registrationId: string, status: EventRegistrationStatus) => {
      return updateRegistrationStatus(registrationId, status);
    },
    [],
  );

  const {
    columns,
    selectedItem: selectedRegistration,
    dialogOpen,
    handleMove,
    handleCardClick,
    handleDialogOpenChange,
  } = useKanbanOptimisticBoard({
    items: registrations,
    columns: REGISTRATION_COLUMNS,
    getItemId: (reg) => reg.id,
    getItemStatus: (reg) => reg.status,
    getStatusColor: getRegistrationStatusColor,
    updateStatus: handleUpdateStatus,
  });

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
