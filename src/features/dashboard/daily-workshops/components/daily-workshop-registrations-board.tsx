"use client";

import { CalendarIcon, Clock3Icon, UsersIcon } from "lucide-react";
import { useCallback } from "react";

import { KanbanBoard } from "@/components/dashboard/kanban-board";
import { Badge } from "@/components/ui/badge";

import { DailyWorkshopRegistrationDetailDialogContainer } from "../containers/daily-workshop-registration-detail-dialog-container";
import type {
  AdminUserDailyWorkshopRegistration,
  DailyWorkshopRegistrationCardProps,
  DailyWorkshopRegistrationsBoardProps,
} from "../types";
import { buildDailyWorkshopRegistrationCardViewModel } from "../types";

function DailyWorkshopRegistrationCard({
  viewModel,
  isDragging,
  onClick,
}: DailyWorkshopRegistrationCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-white p-4 shadow-sm transition-shadow ${
        isDragging ? "shadow-lg" : "hover:shadow-md"
      } cursor-pointer`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="truncate font-mono text-xs text-neutral-400">
          #{viewModel.id}
        </p>
        <Badge variant="outline" className="text-[10px]">
          {viewModel.status}
        </Badge>
      </div>

      <div className="mb-3 flex items-baseline gap-2">
        <p className="text-primary text-lg font-bold">
          ₹{viewModel.finalAmount.toLocaleString("en-IN")}
        </p>
        {viewModel.discount > 0 && (
          <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-600">
            -₹{viewModel.discount.toLocaleString("en-IN")}
          </span>
        )}
      </div>

      <div className="space-y-1.5 text-xs text-neutral-600">
        <p className="flex items-center gap-1.5">
          <UsersIcon className="size-3.5" />
          {viewModel.participants} participant
          {viewModel.participants !== 1 ? "s" : ""}
        </p>
        <p className="flex items-center gap-1.5">
          <Clock3Icon className="size-3.5" />
          {viewModel.totalHours} hour{viewModel.totalHours !== 1 ? "s" : ""} •{" "}
          {viewModel.slotsCount} slot
          {viewModel.slotsCount !== 1 ? "s" : ""}
        </p>
        <p className="flex items-center gap-1.5" suppressHydrationWarning>
          <CalendarIcon className="size-3.5" />
          {viewModel.firstSlotStartAt
            ? new Date(viewModel.firstSlotStartAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "No slots selected"}
        </p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-neutral-50 py-12">
      <CalendarIcon className="mb-3 size-12 text-neutral-300" />
      <p className="text-neutral-500">No daily workshop bookings yet</p>
    </div>
  );
}

export function DailyWorkshopRegistrationsBoard({
  columns,
  isLoading,
  selectedRegistration,
  dialogOpen,
  onMove,
  onCardClick,
  onDialogOpenChange,
  onRegistrationUpdated,
}: DailyWorkshopRegistrationsBoardProps) {
  const renderCard = useCallback(
    (
      registration: AdminUserDailyWorkshopRegistration,
      isDragging?: boolean,
    ) => {
      const viewModel =
        buildDailyWorkshopRegistrationCardViewModel(registration);
      return (
        <DailyWorkshopRegistrationCard
          viewModel={viewModel}
          isDragging={isDragging}
          onClick={() => onCardClick(registration)}
        />
      );
    },
    [onCardClick],
  );

  const isEmpty = columns.every((column) => column.items.length === 0);
  if (isEmpty && !isLoading) {
    return <EmptyState />;
  }

  return (
    <div>
      <KanbanBoard
        columns={columns}
        onMove={onMove}
        renderCard={renderCard}
        isLoading={isLoading}
      />
      <DailyWorkshopRegistrationDetailDialogContainer
        registration={selectedRegistration}
        open={dialogOpen}
        onOpenChange={onDialogOpenChange}
        onRegistrationUpdated={onRegistrationUpdated}
      />
    </div>
  );
}
