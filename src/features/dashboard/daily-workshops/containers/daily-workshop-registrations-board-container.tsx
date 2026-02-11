"use client";

import { updateUserDailyWorkshopRegistrationStatus } from "@/data/admin/users/gateway/server";
import { useKanbanOptimisticBoard } from "@/hooks";
import { useCallback } from "react";

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

export function DailyWorkshopRegistrationsBoardContainer({
  registrations,
}: DailyWorkshopRegistrationsBoardContainerProps) {
  const handleUpdateStatus = useCallback(
    async (registrationId: string, status: DailyWorkshopRegistrationStatus) => {
      return updateUserDailyWorkshopRegistrationStatus(registrationId, status);
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
    updateSelectedItem: handleRegistrationUpdated,
  } = useKanbanOptimisticBoard({
    items: registrations,
    columns: DAILY_WORKSHOP_COLUMNS,
    getItemId: (reg) => reg.id,
    getItemStatus: (reg) => reg.status,
    getStatusColor: getDailyWorkshopRegistrationStatusColor,
    updateStatus: handleUpdateStatus,
  });

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
