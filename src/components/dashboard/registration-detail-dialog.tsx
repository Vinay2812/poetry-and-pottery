"use client";

import { updateRegistrationDetails } from "@/data/admin/registrations/gateway/server";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  TagIcon,
  UsersIcon,
} from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";

import { OptimizedImage } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { AdminUserRegistration } from "@/graphql/generated/types";

import { EditableNumber } from "./editable-number";
import { EditablePrice } from "./editable-price";

interface RegistrationDetailDialogProps {
  registration: AdminUserRegistration | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegistrationDetailDialog({
  registration,
  open,
  onOpenChange,
}: RegistrationDetailDialogProps) {
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

  if (!registration) return null;

  const eventDate = new Date(registration.event.starts_at);
  const formattedDate = eventDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col gap-0 p-0 sm:max-w-lg">
        {/* Fixed Header */}
        <DialogHeader className="shrink-0 border-b px-4 py-3">
          <DialogTitle className="text-base">Registration Details</DialogTitle>
          <p className="font-mono text-xs text-neutral-400">
            #{registration.id}
          </p>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Event Image */}
          {registration.event.image ? (
            <div className="relative aspect-video w-full bg-neutral-100">
              <OptimizedImage
                src={registration.event.image}
                alt={registration.event.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex aspect-video w-full items-center justify-center bg-neutral-100">
              <CalendarIcon className="size-12 text-neutral-300" />
            </div>
          )}

          {/* Event Info */}
          <div className="border-b px-4 py-4">
            <h3 className="mb-2 text-lg font-semibold text-neutral-900">
              {registration.event.title}
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <CalendarIcon className="size-4 text-neutral-400" />
                <span suppressHydrationWarning>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="size-4 text-neutral-400" />
                <span suppressHydrationWarning>{formattedTime}</span>
              </div>
              {registration.event.location && (
                <div className="col-span-2 flex items-center gap-2">
                  <MapPinIcon className="size-4 text-neutral-400" />
                  <span>{registration.event.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Registration Summary */}
          <div className="bg-neutral-50 px-4 py-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-neutral-500">
                  <UsersIcon className="size-4" />
                  Seats Reserved
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">
                    @ ₹{registration.event.price.toLocaleString("en-IN")}/seat
                  </span>
                  <EditableNumber
                    value={editedSeats}
                    onChange={handleSeatsChange}
                    min={1}
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Total Price</span>
                <EditablePrice
                  price={editedPrice}
                  onChange={handlePriceChange}
                  disabled={isPending}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-neutral-500">
                  <TagIcon className="size-4" />
                  Discount
                </span>
                <EditablePrice
                  price={editedDiscount}
                  onChange={handleDiscountChange}
                  disabled={isPending}
                />
              </div>

              {/* Final Amount */}
              <div className="flex items-center justify-between border-t border-neutral-200 pt-3">
                <span className="font-medium text-neutral-900">
                  Final Amount
                </span>
                <span className="text-primary text-lg font-bold">
                  ₹
                  {Math.max(0, editedPrice - editedDiscount).toLocaleString(
                    "en-IN",
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Registration Info */}
          <div
            className="border-t px-4 py-2 text-xs text-neutral-400"
            suppressHydrationWarning
          >
            Registered:{" "}
            {new Date(registration.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {/* Footer with Done and Cancel Buttons */}
        <div className="shrink-0 border-t bg-white px-4 py-3">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
              size="lg"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1"
              size="lg"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Done"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
