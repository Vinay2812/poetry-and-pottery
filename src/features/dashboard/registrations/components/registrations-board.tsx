"use client";

import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { useCallback } from "react";

import { KanbanBoard } from "@/components/dashboard/kanban-board";
import { OptimizedImage } from "@/components/shared";

import { createDate } from "@/lib/date";

import type { AdminUserRegistration } from "@/graphql/generated/types";

import { RegistrationDetailDialogContainer } from "../containers/registration-detail-dialog-container";
import type { RegistrationCardProps, RegistrationsBoardProps } from "../types";
import { buildRegistrationCardViewModel } from "../types";

function RegistrationCard({
  viewModel,
  isDragging,
  onClick,
}: RegistrationCardProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl bg-white p-4 shadow-sm transition-shadow ${
        isDragging ? "shadow-lg" : "hover:shadow-md"
      }`}
    >
      {/* Event Image */}
      {viewModel.eventImage ? (
        <div className="relative mb-3 aspect-4/3 w-full overflow-hidden rounded-xl bg-neutral-100">
          <OptimizedImage
            src={viewModel.eventImage}
            alt={viewModel.eventTitle}
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
          {viewModel.eventTitle}
        </p>
        {viewModel.eventLocation && (
          <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
            <MapPinIcon className="size-3" />
            <span className="truncate">{viewModel.eventLocation}</span>
          </p>
        )}
      </div>

      {/* Price with discount */}
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

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-500">
        <span className="flex items-center gap-1">
          <UsersIcon className="size-3.5" />
          {viewModel.seatsReserved} seat
          {viewModel.seatsReserved !== 1 ? "s" : ""}
        </span>
        <span className="flex items-center gap-1" suppressHydrationWarning>
          <CalendarIcon className="size-3.5" />
          {createDate(viewModel.eventStartsAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}
        </span>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-neutral-50 py-12">
      <CalendarIcon className="mb-3 size-12 text-neutral-300" />
      <p className="text-neutral-500">No event registrations yet</p>
    </div>
  );
}

export function RegistrationsBoard({
  columns,
  isLoading,
  selectedRegistration,
  dialogOpen,
  onMove,
  onCardClick,
  onDialogOpenChange,
}: RegistrationsBoardProps) {
  const renderRegistrationCard = useCallback(
    (registration: AdminUserRegistration, isDragging?: boolean) => {
      const viewModel = buildRegistrationCardViewModel(registration);
      return (
        <RegistrationCard
          viewModel={viewModel}
          isDragging={isDragging}
          onClick={() => onCardClick(registration)}
        />
      );
    },
    [onCardClick],
  );

  // Check if all columns are empty
  const isEmpty = columns.every((col) => col.items.length === 0);

  if (isEmpty && !isLoading) {
    return <EmptyState />;
  }

  return (
    <div>
      <KanbanBoard
        columns={columns}
        onMove={onMove}
        renderCard={renderRegistrationCard}
        isLoading={isLoading}
      />
      <RegistrationDetailDialogContainer
        registration={selectedRegistration}
        open={dialogOpen}
        onOpenChange={onDialogOpenChange}
      />
    </div>
  );
}
