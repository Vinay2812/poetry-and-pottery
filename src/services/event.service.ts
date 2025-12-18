import { Prisma } from "@/prisma/generated/client";
import type {
  EventFilterParams,
  EventWithDetails,
  EventWithRegistrationCount,
  EventsResponse,
  RegistrationWithEvent,
} from "@/types";

import { prisma } from "@/lib/prisma";

export class EventService {
  /**
   * Get events with filtering and pagination
   */
  static async getEvents(
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
        where: { level: { not: null } },
      }),
    ]);

    return {
      data: events as EventWithRegistrationCount[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
      levels: levelsResult
        .map((l) => l.level)
        .filter((l): l is string => l !== null),
    };
  }

  /**
   * Get upcoming events
   */
  static async getUpcomingEvents(
    limit: number = 10,
  ): Promise<EventWithRegistrationCount[]> {
    return prisma.event.findMany({
      where: {
        starts_at: { gte: new Date() },
        status: { in: ["upcoming", "active"] },
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

  /**
   * Get past events
   */
  static async getPastEvents(
    page: number = 1,
    limit: number = 10,
  ): Promise<EventsResponse> {
    const where = {
      OR: [{ ends_at: { lt: new Date() } }, { status: "completed" }],
    };

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: {
          _count: {
            select: { event_registrations: true },
          },
        },
        orderBy: { ends_at: "desc" },
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
      levels: [],
    };
  }

  /**
   * Get single event by slug with full details
   */
  static async getEventBySlug(slug: string): Promise<EventWithDetails | null> {
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

  /**
   * Get single event by ID
   */
  static async getEventById(id: string): Promise<EventWithDetails | null> {
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

  /**
   * Get featured events for homepage
   */
  static async getFeaturedEvents(
    limit: number = 3,
  ): Promise<EventWithRegistrationCount[]> {
    return prisma.event.findMany({
      where: {
        starts_at: { gte: new Date() },
        status: { in: ["upcoming", "active"] },
        available_seats: { gt: 0 },
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

  /**
   * Check if user is registered for an event
   */
  static async isUserRegistered(
    eventId: string,
    userId: number,
  ): Promise<boolean> {
    const registration = await prisma.eventRegistration.findUnique({
      where: {
        event_id_user_id: {
          event_id: eventId,
          user_id: userId,
        },
      },
    });
    return !!registration;
  }

  /**
   * Get available seats for an event
   */
  static async getAvailableSeats(eventId: string): Promise<number> {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { available_seats: true },
    });
    return event?.available_seats ?? 0;
  }

  /**
   * Get user registrations by auth ID
   */
  static async getRegistrationsByAuthId(
    authId: string,
  ): Promise<RegistrationWithEvent[]> {
    const user = await prisma.user.findUnique({
      where: { auth_id: authId },
      select: { id: true },
    });

    if (!user) return [];

    return prisma.eventRegistration.findMany({
      where: { user_id: user.id },
      include: {
        event: true,
        user: true,
      },
      orderBy: { created_at: "desc" },
    }) as Promise<RegistrationWithEvent[]>;
  }

  /**
   * Get single registration by ID with event details
   */
  static async getRegistrationById(
    registrationId: string,
    authId: string,
  ): Promise<RegistrationWithEvent | null> {
    const user = await prisma.user.findUnique({
      where: { auth_id: authId },
      select: { id: true },
    });

    if (!user) return null;

    return prisma.eventRegistration.findFirst({
      where: {
        id: registrationId,
        user_id: user.id,
      },
      include: {
        event: true,
        user: true,
      },
    }) as Promise<RegistrationWithEvent | null>;
  }
}
