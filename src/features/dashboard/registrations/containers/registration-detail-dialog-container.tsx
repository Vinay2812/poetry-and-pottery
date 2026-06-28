"use client";

import { useUIStore } from "@/store/ui.store";
import { useCallback, useEffect, useState, useTransition } from "react";

import { formatCreatedAt, formatDateShort, formatTime } from "@/lib/date";
import { getRegistrationStatusOptions } from "@/lib/status-utils";

import {
  useAdminUpdateRegistrationDetailsMutation,
  useAdminUpdateRegistrationStatusMutation,
} from "@/graphql/generated/graphql";

import { RegistrationDetailDialog } from "../components/registration-detail-dialog";
import type {
  RegistrationDetailDialogContainerProps,
  RegistrationViewModel,
} from "../types";

const REGISTRATION_STATUS_OPTIONS = getRegistrationStatusOptions();

export function RegistrationDetailDialogContainer({
  registration,
  open,
  onOpenChange,
  onStatusChanged,
}: RegistrationDetailDialogContainerProps) {
  const { addToast } = useUIStore();
  const [isPending, startTransition] = useTransition();
  const [updateRegistrationDetailsMutation] =
    useAdminUpdateRegistrationDetailsMutation();
  const [updateRegistrationStatusMutation] =
    useAdminUpdateRegistrationStatusMutation();
  const [editedPrice, setEditedPrice] = useState<number>(0);
  const [editedDiscount, setEditedDiscount] = useState<number>(0);
  const [editedSeats, setEditedSeats] = useState<number>(1);
  const [status, setStatus] = useState<string>(registration?.status ?? "");
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);

  // Initialize edited values when registration changes
  useEffect(() => {
    if (registration) {
      setStatus(registration.status);
      startTransition(() => {
        setEditedPrice(registration.price);
        setEditedDiscount(registration.discount);
        setEditedSeats(registration.seats_reserved);
      });
    }
  }, [registration]);

  const handleStatusChange = useCallback(
    async (nextStatus: string) => {
      if (!registration || nextStatus === status) return;

      const previousStatus = status;
      setStatus(nextStatus);
      setIsStatusUpdating(true);
      try {
        const { data } = await updateRegistrationStatusMutation({
          variables: { registrationId: registration.id, status: nextStatus },
        });
        if (data?.adminUpdateRegistrationStatus?.success) {
          onStatusChanged(registration.id, nextStatus);
          addToast({
            type: "success",
            message: "Registration status updated.",
          });
        } else {
          setStatus(previousStatus);
          addToast({
            type: "error",
            message:
              data?.adminUpdateRegistrationStatus?.error ||
              "Failed to update registration status.",
          });
        }
      } catch {
        setStatus(previousStatus);
        addToast({
          type: "error",
          message: "Something went wrong. Please try again.",
        });
      } finally {
        setIsStatusUpdating(false);
      }
    },
    [
      registration,
      status,
      updateRegistrationStatusMutation,
      onStatusChanged,
      addToast,
    ],
  );

  const handlePriceChange = useCallback((newPrice: number) => {
    setEditedPrice(newPrice);
  }, []);

  const handleDiscountChange = useCallback((newDiscount: number) => {
    setEditedDiscount(newDiscount);
  }, []);

  const handleSeatsChange = useCallback(
    (newSeats: number) => {
      setEditedSeats(newSeats);
      // Auto-update price based on event's per-seat price
      if (registration) {
        setEditedPrice(registration.event.price * newSeats);
      }
    },
    [registration],
  );

  const handleSave = useCallback(async () => {
    if (!registration) return;

    startTransition(async () => {
      try {
        // Check if any values changed
        const hasChanges =
          editedPrice !== registration.price ||
          editedDiscount !== registration.discount ||
          editedSeats !== registration.seats_reserved;

        if (hasChanges) {
          await updateRegistrationDetailsMutation({
            variables: {
              registrationId: registration.id,
              input: {
                price: editedPrice,
                discount: editedDiscount,
                seatsReserved: editedSeats,
              },
            },
          });
        }
        onOpenChange(false);
      } catch (error) {
        console.error("Failed to update registration details:", error);
      }
    });
  }, [
    editedDiscount,
    editedPrice,
    editedSeats,
    onOpenChange,
    registration,
    updateRegistrationDetailsMutation,
  ]);

  const handleCancel = useCallback(() => {
    // Reset to original values
    if (registration) {
      setEditedPrice(registration.price);
      setEditedDiscount(registration.discount);
      setEditedSeats(registration.seats_reserved);
    }
    onOpenChange(false);
  }, [registration, onOpenChange]);

  // Build view model from state
  const viewModel: RegistrationViewModel | null = registration
    ? {
        id: registration.id,
        eventTitle: registration.event.title,
        eventImage: registration.event.image || null,
        eventLocation: registration.event.location || null,
        eventPricePerSeat: registration.event.price,
        formattedDate: formatDateShort(registration.event.starts_at),
        formattedTime: formatTime(registration.event.starts_at),
        formattedCreatedAt: formatCreatedAt(registration.created_at),
        editedPrice,
        editedDiscount,
        editedSeats,
        finalAmount: Math.max(0, editedPrice - editedDiscount),
        isPending,
      }
    : null;

  return (
    <RegistrationDetailDialog
      open={open}
      viewModel={viewModel}
      statusValue={status}
      statusOptions={REGISTRATION_STATUS_OPTIONS}
      isStatusUpdating={isStatusUpdating}
      onStatusChange={handleStatusChange}
      onOpenChange={onOpenChange}
      onPriceChange={handlePriceChange}
      onDiscountChange={handleDiscountChange}
      onSeatsChange={handleSeatsChange}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
