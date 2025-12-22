"use client";

import { updateRegistrationDetails } from "@/actions/admin";
import { useCallback, useEffect, useState, useTransition } from "react";

import { RegistrationDetailDialog } from "../components/registration-detail-dialog";
import type {
  RegistrationDetailDialogContainerProps,
  RegistrationViewModel,
} from "../types";

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatCreatedAt(date: Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function RegistrationDetailDialogContainer({
  registration,
  open,
  onOpenChange,
}: RegistrationDetailDialogContainerProps) {
  const [isPending, startTransition] = useTransition();
  const [editedPrice, setEditedPrice] = useState<number>(0);
  const [editedDiscount, setEditedDiscount] = useState<number>(0);
  const [editedSeats, setEditedSeats] = useState<number>(1);

  // Initialize edited values when registration changes
  useEffect(() => {
    if (registration) {
      startTransition(() => {
        setEditedPrice(registration.price);
        setEditedDiscount(registration.discount);
        setEditedSeats(registration.seats_reserved);
      });
    }
  }, [registration]);

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
      // Check if any values changed
      const hasChanges =
        editedPrice !== registration.price ||
        editedDiscount !== registration.discount ||
        editedSeats !== registration.seats_reserved;

      if (hasChanges) {
        await updateRegistrationDetails(registration.id, {
          price: editedPrice,
          discount: editedDiscount,
          seatsReserved: editedSeats,
        });
      }
      onOpenChange(false);
    });
  }, [registration, editedPrice, editedDiscount, editedSeats, onOpenChange]);

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
        formattedDate: formatDate(registration.event.starts_at),
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
      onOpenChange={onOpenChange}
      onPriceChange={handlePriceChange}
      onDiscountChange={handleDiscountChange}
      onSeatsChange={handleSeatsChange}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
