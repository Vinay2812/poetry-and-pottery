"use server";

import { EventLevel, EventStatus, Prisma } from "@/prisma/generated/client";
import type {
  EventFilterParams,
  EventWithDetails,
  EventWithRegistrationCount,
  EventsResponse,
  PaginatedResponse,
  RegistrationWithEvent,
} from "@/types";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { getCurrentUserId } from "./auth.action";

const DEFAULT_PAGE_SIZE = 10;

export async function getEvents(
  params: EventFilterParams = {},
): Promise<EventsResponse> {
  const { status, level, page = 1, limit = 12 } = params;

  const where: Prisma.EventWhereInput = {};

  if (status) {
    where.status = status;
  }

  if (level) {
    where.level = level;
  }

  const [events, total, levelsResult] = await Promise.all([
    prisma.event.findMany({
      where,
      include: {
        _count: {
          select: { event_registrations: true },
        },
      },
      orderBy: { starts_at: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.event.count({ where }),
    prisma.event.findMany({
      distinct: ["level"],
      select: { level: true },
    }),
  ]);

  return {
    data: events as EventWithRegistrationCount[],
    total,
    page,
    totalPages: Math.ceil(total / limit),
    levels: levelsResult.map((l) => l.level),
  };
}

export async function getEventBySlug(
  slug: string,
): Promise<EventWithDetails | null> {
  return prisma.event.findUnique({
    where: { slug },
    include: {
      reviews: {
        include: {
          user: true,
          likes: true,
        },
        orderBy: { created_at: "desc" },
        take: 10,
      },
      event_registrations: true,
      _count: {
        select: { reviews: true, event_registrations: true },
      },
    },
  }) as Promise<EventWithDetails | null>;
}

export async function getUpcomingEvents(
  limit: number = 10,
): Promise<EventWithRegistrationCount[]> {
  return prisma.event.findMany({
    where: {
      starts_at: { gte: new Date() },
      status: { in: [EventStatus.UPCOMING, EventStatus.ACTIVE] },
    },
    include: {
      _count: {
        select: { event_registrations: true },
      },
    },
    orderBy: { starts_at: "asc" },
    take: limit,
  }) as Promise<EventWithRegistrationCount[]>;
}

export async function getPastEvents(
  page: number = 1,
  limit: number = 12,
): Promise<PaginatedResponse<EventWithRegistrationCount>> {
  const where: Prisma.EventWhereInput = {
    OR: [{ status: EventStatus.COMPLETED }, { ends_at: { lt: new Date() } }],
  };

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      include: {
        _count: {
          select: { event_registrations: true },
        },
      },
      orderBy: { starts_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.event.count({ where }),
  ]);

  return {
    data: events as EventWithRegistrationCount[],
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getEventById(
  id: string,
): Promise<EventWithDetails | null> {
  return prisma.event.findUnique({
    where: { id },
    include: {
      reviews: {
        include: {
          user: true,
          likes: true,
        },
        orderBy: { created_at: "desc" },
        take: 10,
      },
      event_registrations: true,
      _count: {
        select: { reviews: true, event_registrations: true },
      },
    },
  }) as Promise<EventWithDetails | null>;
}

export async function registerForEvent(eventId: string, seats: number = 1) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated" };
  }

  try {
    // Check if already registered
    const existing = await prisma.eventRegistration.findUnique({
      where: {
        event_id_user_id: {
          event_id: eventId,
          user_id: userId,
        },
      },
    });

    if (existing) {
      return {
        success: false as const,
        error: "Already registered for this event",
      };
    }

    // Get event details
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { price: true, available_seats: true },
    });

    if (!event) {
      return { success: false as const, error: "Event not found" };
    }

    if (event.available_seats < seats) {
      return { success: false as const, error: "Not enough seats available" };
    }

    // Create registration and update seats in transaction
    const [registration] = await prisma.$transaction([
      prisma.eventRegistration.create({
        data: {
          event_id: eventId,
          user_id: userId,
          seats_reserved: seats,
          price: event.price * seats,
        },
        include: { event: true, user: true },
      }),
      prisma.event.update({
        where: { id: eventId },
        data: {
          available_seats: { decrement: seats },
        },
      }),
    ]);

    revalidatePath("/events");
    revalidatePath("/events/registrations");

    return {
      success: true as const,
      data: registration as RegistrationWithEvent,
    };
  } catch (error) {
    console.error("Failed to register for event:", error);
    return { success: false as const, error: "Failed to register for event" };
  }
}

export async function cancelRegistration(registrationId: string) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated" };
  }

  try {
    const registration = await prisma.eventRegistration.findFirst({
      where: {
        id: registrationId,
        user_id: userId,
      },
    });

    if (!registration) {
      return { success: false as const, error: "Registration not found" };
    }

    await prisma.$transaction([
      prisma.eventRegistration.delete({
        where: { id: registrationId },
      }),
      prisma.event.update({
        where: { id: registration.event_id },
        data: {
          available_seats: { increment: registration.seats_reserved },
        },
      }),
    ]);

    revalidatePath("/events");
    revalidatePath("/events/registrations");

    return { success: true as const };
  } catch (error) {
    console.error("Failed to cancel registration:", error);
    return { success: false as const, error: "Failed to cancel registration" };
  }
}

export async function getUserRegistrations(
  page: number = 1,
  limit: number = DEFAULT_PAGE_SIZE,
): Promise<
  | { success: true; data: PaginatedResponse<RegistrationWithEvent> }
  | { success: false; error: string }
> {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  const [registrations, total] = await Promise.all([
    prisma.eventRegistration.findMany({
      where: { user_id: userId },
      include: { event: true, user: true },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.eventRegistration.count({ where: { user_id: userId } }),
  ]);

  return {
    success: true,
    data: {
      data: registrations as RegistrationWithEvent[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getRegistrationById(
  registrationId: string,
): Promise<RegistrationWithEvent | null> {
  const userId = await getCurrentUserId();
  if (!userId) {
    return null;
  }

  return prisma.eventRegistration.findFirst({
    where: {
      id: registrationId,
      user_id: userId,
    },
    include: { event: true, user: true },
  }) as Promise<RegistrationWithEvent | null>;
}

export async function getRegistrationCount(): Promise<number> {
  const userId = await getCurrentUserId();
  if (!userId) {
    return 0;
  }

  return prisma.eventRegistration.count({ where: { user_id: userId } });
}
