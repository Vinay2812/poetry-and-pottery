"use server";

import { DEFAULT_PAGE_SIZE } from "@/consts/performance";
import { EventRegistration, Prisma } from "@/prisma/generated/client";
import {
  type EventFilterParams,
  EventLevel,
  EventStatus,
  type EventWithDetails,
  type EventWithRegistrationCount,
  type EventsResponse,
  type PaginatedResponse,
  type RegistrationWithEvent,
} from "@/types";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { getAuthenticatedUserId } from "./auth.action";

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
          select: { event_registrations: true, reviews: true },
        },
        reviews: { select: { rating: true } },
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

  // Calculate average rating for each event
  const eventsWithRating = events.map((event) => {
    const { reviews, ...rest } = event;
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : null;
    return { ...rest, averageRating };
  });

  return {
    data: eventsWithRating as EventWithRegistrationCount[],
    total,
    page,
    totalPages: Math.ceil(total / limit),
    levels: levelsResult.map((l) => l.level as EventLevel),
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
  page: number = 1,
  limit: number = 12,
  search?: string,
): Promise<PaginatedResponse<EventWithRegistrationCount>> {
  const userId = await getAuthenticatedUserId();

  let userEventRegistrations: EventRegistration[] = [];
  if (userId) {
    userEventRegistrations = await prisma.eventRegistration.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  const userEventRegistrationIds = userEventRegistrations.map(
    (r) => r.event_id,
  );

  const where: Prisma.EventWhereInput = {
    starts_at: { gte: new Date() },
    status: { in: [EventStatus.UPCOMING, EventStatus.ACTIVE] },
    id: { notIn: userEventRegistrationIds },
  };

  // Add search filter
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      // { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      include: {
        _count: {
          select: { event_registrations: true, reviews: true },
        },
      },
      orderBy: { starts_at: "asc" },
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

export async function getPastEvents(
  page: number = 1,
  limit: number = 12,
  search?: string,
): Promise<PaginatedResponse<EventWithRegistrationCount>> {
  const where: Prisma.EventWhereInput = {
    OR: [{ status: EventStatus.COMPLETED }, { ends_at: { lt: new Date() } }],
  };

  // Add search filter
  if (search) {
    where.AND = [
      {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          // { description: { contains: search, mode: "insensitive" } },
        ],
      },
    ];
  }

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      include: {
        _count: {
          select: { event_registrations: true, reviews: true },
        },
        reviews: { select: { rating: true } },
      },
      orderBy: { starts_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.event.count({ where }),
  ]);

  // Calculate average rating for each event
  const eventsWithRating = events.map((event) => {
    const { reviews, ...rest } = event;
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : null;
    return { ...rest, averageRating };
  });

  return {
    data: eventsWithRating as EventWithRegistrationCount[],
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
  const userId = await getAuthenticatedUserId();
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

    // Create registration with PENDING status and request_at timestamp
    const [registration] = await prisma.$transaction([
      prisma.eventRegistration.create({
        data: {
          event_id: eventId,
          user_id: userId,
          seats_reserved: seats,
          price: event.price * seats,
          status: "PENDING",
          request_at: new Date(),
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
  const userId = await getAuthenticatedUserId();
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
  const userId = await getAuthenticatedUserId();
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
  const userId = await getAuthenticatedUserId();
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
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return 0;
  }

  return prisma.eventRegistration.count({ where: { user_id: userId } });
}

export interface EventWithUserContext {
  event: EventWithDetails;
  registration: RegistrationWithEvent | null;
  isPastEvent: boolean;
  currentUserId: number | null;
}

export async function getEventWithUserContext(
  eventId: string,
): Promise<EventWithUserContext | null> {
  const userId = await getAuthenticatedUserId();

  const event = await prisma.event.findUnique({
    where: { id: eventId },
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
  });

  if (!event) {
    return null;
  }

  // Check if event is past
  const now = new Date();
  const isPastEvent =
    event.status === EventStatus.COMPLETED || event.ends_at < now;

  // Get user's registration for this event if authenticated
  let registration: RegistrationWithEvent | null = null;
  if (userId) {
    registration = (await prisma.eventRegistration.findFirst({
      where: {
        event_id: eventId,
        user_id: userId,
      },
      include: { event: true, user: true },
    })) as RegistrationWithEvent | null;
  }

  return {
    event: event as EventWithDetails,
    registration,
    isPastEvent,
    currentUserId: userId,
  };
}

export type RegistrationWithReviewStatus = RegistrationWithEvent & {
  hasReviewed: boolean;
};

export async function getUpcomingRegistrations(
  page: number = 1,
  limit: number = DEFAULT_PAGE_SIZE,
  search?: string,
): Promise<
  | { success: true; data: PaginatedResponse<RegistrationWithEvent> }
  | { success: false; error: string }
> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  const now = new Date();

  const where: Prisma.EventRegistrationWhereInput = {
    user_id: userId,
    event: {
      ends_at: { gt: now },
    },
  };

  // Add search filter
  if (search) {
    where.AND = [
      {
        OR: [
          { event: { title: { contains: search, mode: "insensitive" } } },
          // { event: { description: { contains: search, mode: "insensitive" } } },
        ],
      },
    ];
  }

  const [registrations, total] = await Promise.all([
    prisma.eventRegistration.findMany({
      where,
      include: { event: true, user: true },
      orderBy: { event: { starts_at: "asc" } },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.eventRegistration.count({ where }),
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

export async function getCompletedRegistrations(
  page: number = 1,
  limit: number = 12,
): Promise<
  | { success: true; data: PaginatedResponse<RegistrationWithReviewStatus> }
  | { success: false; error: string }
> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  const now = new Date();

  const where = {
    user_id: userId,
    event: {
      ends_at: { lte: now },
    },
  };

  const [registrations, total] = await Promise.all([
    prisma.eventRegistration.findMany({
      where,
      include: { event: true, user: true },
      orderBy: { event: { ends_at: "desc" } },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.eventRegistration.count({ where }),
  ]);

  // If no registrations, return early
  if (registrations.length === 0) {
    return {
      success: true,
      data: { data: [], total: 0, page, totalPages: 0 },
    };
  }

  // Check if user has reviewed each event
  const eventIds = registrations.map((r) => r.event_id);
  const userReviews = await prisma.review.findMany({
    where: {
      user_id: userId,
      event_id: { in: eventIds },
    },
    select: { event_id: true },
  });

  // Create a Set of event IDs that have been reviewed
  const reviewedEventIds = new Set<string>();
  for (const review of userReviews) {
    if (review.event_id) {
      reviewedEventIds.add(review.event_id);
    }
  }

  const registrationsWithReviewStatus = registrations.map((reg) => ({
    ...reg,
    hasReviewed: reviewedEventIds.has(reg.event_id),
  }));

  return {
    success: true,
    data: {
      data: registrationsWithReviewStatus as RegistrationWithReviewStatus[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
    },
  };
}
