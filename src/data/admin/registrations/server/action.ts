"use server";

import { EventRegistrationStatus } from "@/prisma/generated/enums";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

import type {
  AdminRegistrationMutationResponse,
  UpdateRegistrationDetailsInput,
} from "@/graphql/generated/types";

type TimestampField =
  | "request_at"
  | "approved_at"
  | "paid_at"
  | "confirmed_at"
  | "cancelled_at";

const STATUS_TIMESTAMP_FIELDS: Record<
  EventRegistrationStatus,
  TimestampField | null
> = {
  [EventRegistrationStatus.PENDING]: "request_at",
  [EventRegistrationStatus.APPROVED]: "approved_at",
  [EventRegistrationStatus.REJECTED]: null,
  [EventRegistrationStatus.PAID]: "paid_at",
  [EventRegistrationStatus.CONFIRMED]: "confirmed_at",
  [EventRegistrationStatus.CANCELLED]: "cancelled_at",
};

const MAIN_FLOW: EventRegistrationStatus[] = [
  EventRegistrationStatus.PENDING,
  EventRegistrationStatus.APPROVED,
  EventRegistrationStatus.PAID,
  EventRegistrationStatus.CONFIRMED,
];

function getLaterStatuses(
  status: EventRegistrationStatus,
): EventRegistrationStatus[] {
  const statusIndex = MAIN_FLOW.indexOf(status);
  if (statusIndex === -1) return [];
  return MAIN_FLOW.slice(statusIndex + 1);
}

function getIntermediateStatuses(
  currentStatus: EventRegistrationStatus,
  newStatus: EventRegistrationStatus,
): EventRegistrationStatus[] {
  const currentIndex = MAIN_FLOW.indexOf(currentStatus);
  const newIndex = MAIN_FLOW.indexOf(newStatus);

  if (currentIndex === -1 || newIndex === -1 || newIndex <= currentIndex) {
    return [];
  }

  return MAIN_FLOW.slice(currentIndex + 1, newIndex + 1);
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
  newStatusStr: string,
): Promise<AdminRegistrationMutationResponse> {
  await requireAdmin();

  const newStatus = newStatusStr as EventRegistrationStatus;

  const registration = await prisma.eventRegistration.findUnique({
    where: { id: registrationId },
    select: {
      id: true,
      status: true,
      event_id: true,
      seats_reserved: true,
    },
  });

  if (!registration) {
    return { success: false, error: "Registration not found" };
  }

  if (registration.status === newStatus) {
    return { success: true };
  }

  const now = new Date();
  const currentMainIndex = MAIN_FLOW.indexOf(registration.status);
  const newMainIndex = MAIN_FLOW.indexOf(newStatus);

  const updateData: RegistrationUpdateData = { status: newStatus };

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

  if (newMainIndex !== -1) {
    if (registration.status === EventRegistrationStatus.CANCELLED) {
      updateData.cancelled_at = null;
    }
    if (registration.status === EventRegistrationStatus.REJECTED) {
      updateData.approved_at = null;
      updateData.paid_at = null;
      updateData.confirmed_at = null;
    }
  }

  const wasConfirmed =
    registration.status === EventRegistrationStatus.CONFIRMED ||
    registration.status === EventRegistrationStatus.PAID;
  const willBeConfirmed =
    newStatus === EventRegistrationStatus.CONFIRMED ||
    newStatus === EventRegistrationStatus.PAID;

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

  return { success: true };
}

export async function updateRegistrationPrice(
  registrationId: string,
  newPrice: number,
): Promise<AdminRegistrationMutationResponse> {
  await requireAdmin();

  if (newPrice < 0) {
    return { success: false, error: "Price cannot be negative" };
  }

  const registration = await prisma.eventRegistration.findUnique({
    where: { id: registrationId },
    select: { id: true },
  });

  if (!registration) {
    return { success: false, error: "Registration not found" };
  }

  await prisma.eventRegistration.update({
    where: { id: registrationId },
    data: { price: newPrice },
  });

  return { success: true };
}

export async function updateRegistrationDetails(
  registrationId: string,
  input: UpdateRegistrationDetailsInput,
): Promise<AdminRegistrationMutationResponse> {
  await requireAdmin();

  if (input.price < 0) {
    return { success: false, error: "Price cannot be negative" };
  }

  if (input.discount < 0) {
    return { success: false, error: "Discount cannot be negative" };
  }

  if (input.seatsReserved < 1) {
    return { success: false, error: "Must reserve at least 1 seat" };
  }

  const registration = await prisma.eventRegistration.findUnique({
    where: { id: registrationId },
    select: {
      id: true,
      event_id: true,
      seats_reserved: true,
      status: true,
    },
  });

  if (!registration) {
    return { success: false, error: "Registration not found" };
  }

  const seatsDiff = input.seatsReserved - registration.seats_reserved;
  const isConfirmedOrPaid =
    registration.status === EventRegistrationStatus.CONFIRMED ||
    registration.status === EventRegistrationStatus.PAID;

  if (seatsDiff !== 0 && isConfirmedOrPaid) {
    if (seatsDiff > 0) {
      const event = await prisma.event.findUnique({
        where: { id: registration.event_id },
        select: { available_seats: true },
      });

      if (!event || event.available_seats < seatsDiff) {
        return { success: false, error: "Not enough available seats" };
      }
    }

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
      price: input.price,
      discount: input.discount,
      seats_reserved: input.seatsReserved,
    },
  });

  return { success: true };
}
