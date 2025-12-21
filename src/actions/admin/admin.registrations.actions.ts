"use server";

import { EventRegistrationStatus } from "@/prisma/generated/enums";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

type TimestampField =
  | "request_at"
  | "approved_at"
  | "paid_at"
  | "confirmed_at"
  | "cancelled_at";

// Map status to timestamp field
const STATUS_TIMESTAMP_FIELDS: Record<
  EventRegistrationStatus,
  TimestampField | null
> = {
  [EventRegistrationStatus.PENDING]: "request_at",
  [EventRegistrationStatus.APPROVED]: "approved_at",
  [EventRegistrationStatus.REJECTED]: null, // No specific timestamp for rejected
  [EventRegistrationStatus.PAID]: "paid_at",
  [EventRegistrationStatus.CONFIRMED]: "confirmed_at",
  [EventRegistrationStatus.CANCELLED]: "cancelled_at",
};

// Define main flow for status progression
const MAIN_FLOW: EventRegistrationStatus[] = [
  EventRegistrationStatus.PENDING,
  EventRegistrationStatus.APPROVED,
  EventRegistrationStatus.PAID,
  EventRegistrationStatus.CONFIRMED,
];

// Get statuses that come after the given status in main flow
function getLaterStatuses(
  status: EventRegistrationStatus,
): EventRegistrationStatus[] {
  const statusIndex = MAIN_FLOW.indexOf(status);
  if (statusIndex === -1) return [];
  return MAIN_FLOW.slice(statusIndex + 1);
}

// Get statuses between current and new status (exclusive of current, inclusive of new)
function getIntermediateStatuses(
  currentStatus: EventRegistrationStatus,
  newStatus: EventRegistrationStatus,
): EventRegistrationStatus[] {
  const currentIndex = MAIN_FLOW.indexOf(currentStatus);
  const newIndex = MAIN_FLOW.indexOf(newStatus);

  if (currentIndex === -1 || newIndex === -1 || newIndex <= currentIndex) {
    return [];
  }

  // Return statuses from current+1 to new (inclusive)
  return MAIN_FLOW.slice(currentIndex + 1, newIndex + 1);
}

export interface UpdateRegistrationStatusResult {
  success: boolean;
  error?: string;
}

interface RegistrationUpdateData {
  status: EventRegistrationStatus;
  request_at?: Date | null;
  approved_at?: Date | null;
  paid_at?: Date | null;
  confirmed_at?: Date | null;
  cancelled_at?: Date | null;
}

export async function updateRegistrationStatus(
  registrationId: string,
  newStatus: EventRegistrationStatus,
): Promise<UpdateRegistrationStatusResult> {
  await requireAdmin();

  const registration = await prisma.eventRegistration.findUnique({
    where: { id: registrationId },
    select: {
      id: true,
      status: true,
      user_id: true,
      event_id: true,
      seats_reserved: true,
    },
  });

  if (!registration) {
    return { success: false, error: "Registration not found" };
  }

  if (registration.status === newStatus) {
    return { success: true }; // No change needed
  }

  const now = new Date();
  const currentMainIndex = MAIN_FLOW.indexOf(registration.status);
  const newMainIndex = MAIN_FLOW.indexOf(newStatus);

  const updateData: RegistrationUpdateData = { status: newStatus };

  // If moving forward, set all intermediate timestamps
  if (newMainIndex > currentMainIndex && currentMainIndex !== -1) {
    const intermediateStatuses = getIntermediateStatuses(
      registration.status,
      newStatus,
    );
    for (const status of intermediateStatuses) {
      const field = STATUS_TIMESTAMP_FIELDS[status];
      if (field) {
        updateData[field] = now;
      }
    }
  }

  // Set the timestamp for the new status (in case it's a terminal status not in main flow)
  const timestampField = STATUS_TIMESTAMP_FIELDS[newStatus];
  if (timestampField && !updateData[timestampField]) {
    updateData[timestampField] = now;
  }

  if (
    newMainIndex !== -1 &&
    currentMainIndex !== -1 &&
    newMainIndex < currentMainIndex
  ) {
    const laterStatuses = getLaterStatuses(newStatus);
    for (const laterStatus of laterStatuses) {
      const laterField = STATUS_TIMESTAMP_FIELDS[laterStatus];
      if (laterField) {
        updateData[laterField] = null;
      }
    }
  }

  // If going back to main flow from terminal states, clear terminal timestamps
  if (newMainIndex !== -1) {
    if (registration.status === EventRegistrationStatus.CANCELLED) {
      updateData.cancelled_at = null;
    }
    if (registration.status === EventRegistrationStatus.REJECTED) {
      // Clear from approved onwards when unrejecting
      updateData.approved_at = null;
      updateData.paid_at = null;
      updateData.confirmed_at = null;
    }
  }

  // Handle seat availability for cancellation and confirmation changes
  const wasConfirmed =
    registration.status === EventRegistrationStatus.CONFIRMED ||
    registration.status === EventRegistrationStatus.PAID;
  const willBeConfirmed =
    newStatus === EventRegistrationStatus.CONFIRMED ||
    newStatus === EventRegistrationStatus.PAID;

  // If going from confirmed to cancelled, return seats
  if (
    wasConfirmed &&
    (newStatus === EventRegistrationStatus.CANCELLED ||
      newStatus === EventRegistrationStatus.REJECTED)
  ) {
    await prisma.event.update({
      where: { id: registration.event_id },
      data: {
        available_seats: { increment: registration.seats_reserved },
      },
    });
  }

  // If going from cancelled/rejected to confirmed, deduct seats
  if (
    !wasConfirmed &&
    willBeConfirmed &&
    (registration.status === EventRegistrationStatus.CANCELLED ||
      registration.status === EventRegistrationStatus.REJECTED)
  ) {
    await prisma.event.update({
      where: { id: registration.event_id },
      data: {
        available_seats: { decrement: registration.seats_reserved },
      },
    });
  }

  await prisma.eventRegistration.update({
    where: { id: registrationId },
    data: updateData,
  });

  revalidatePath(`/dashboard/users/${registration.user_id}`);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/events");

  return { success: true };
}

export interface UpdateRegistrationPriceResult {
  success: boolean;
  error?: string;
}

export async function updateRegistrationPrice(
  registrationId: string,
  newPrice: number,
): Promise<UpdateRegistrationPriceResult> {
  await requireAdmin();

  if (newPrice < 0) {
    return { success: false, error: "Price cannot be negative" };
  }

  const registration = await prisma.eventRegistration.findUnique({
    where: { id: registrationId },
    select: { id: true, user_id: true },
  });

  if (!registration) {
    return { success: false, error: "Registration not found" };
  }

  await prisma.eventRegistration.update({
    where: { id: registrationId },
    data: { price: newPrice },
  });

  revalidatePath(`/dashboard/users/${registration.user_id}`);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/events");

  return { success: true };
}

export interface UpdateRegistrationDetailsResult {
  success: boolean;
  error?: string;
}

export interface RegistrationDetailsInput {
  price: number;
  discount: number;
  seatsReserved: number;
}

export async function updateRegistrationDetails(
  registrationId: string,
  details: RegistrationDetailsInput,
): Promise<UpdateRegistrationDetailsResult> {
  await requireAdmin();

  if (details.price < 0) {
    return { success: false, error: "Price cannot be negative" };
  }

  if (details.discount < 0) {
    return { success: false, error: "Discount cannot be negative" };
  }

  if (details.seatsReserved < 1) {
    return { success: false, error: "Must reserve at least 1 seat" };
  }

  const registration = await prisma.eventRegistration.findUnique({
    where: { id: registrationId },
    select: {
      id: true,
      user_id: true,
      event_id: true,
      seats_reserved: true,
      status: true,
    },
  });

  if (!registration) {
    return { success: false, error: "Registration not found" };
  }

  // Handle seat changes for confirmed/paid registrations
  const seatsDiff = details.seatsReserved - registration.seats_reserved;
  const isConfirmedOrPaid =
    registration.status === EventRegistrationStatus.CONFIRMED ||
    registration.status === EventRegistrationStatus.PAID;

  if (seatsDiff !== 0 && isConfirmedOrPaid) {
    // Check if event has enough seats when increasing
    if (seatsDiff > 0) {
      const event = await prisma.event.findUnique({
        where: { id: registration.event_id },
        select: { available_seats: true },
      });

      if (!event || event.available_seats < seatsDiff) {
        return { success: false, error: "Not enough available seats" };
      }
    }

    // Update event available seats
    await prisma.event.update({
      where: { id: registration.event_id },
      data: {
        available_seats: { decrement: seatsDiff },
      },
    });
  }

  await prisma.eventRegistration.update({
    where: { id: registrationId },
    data: {
      price: details.price,
      discount: details.discount,
      seats_reserved: details.seatsReserved,
    },
  });

  revalidatePath(`/dashboard/users/${registration.user_id}`);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/events");

  return { success: true };
}
