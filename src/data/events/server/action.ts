"use server";

import { getAuthenticatedUserId } from "@/actions/auth.action";
import {
  Prisma,
  EventLevel as PrismaEventLevel,
  EventStatus as PrismaEventStatus,
} from "@/prisma/generated/client";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import type {
  CancelRegistrationResponse,
  EventBase,
  EventDetail,
  EventLevel,
  EventRegistration,
  EventRegistrationStatus,
  EventReview,
  EventStatus,
  EventWithUserContext,
  EventsFilterInput,
  EventsResponse,
  RegisterForEventInput,
  RegisterForEventResponse,
  RegistrationEvent,
  RegistrationsFilterInput,
  RegistrationsResponse,
} from "@/graphql/generated/types";

function mapEventLevel(level: string): EventLevel {
  return level as EventLevel;
}

function mapEventStatus(status: string): EventStatus {
  return status as EventStatus;
}

function mapRegistrationStatus(status: string): EventRegistrationStatus {
  return status as EventRegistrationStatus;
}

function mapEventBase(event: {
  id: string;
  slug: string;
  title: string;
  description: string;
  starts_at: Date;
  ends_at: Date;
  location: string;
  full_location: string;
  total_seats: number;
  available_seats: number;
  instructor: string;
  includes: string[];
  price: number;
  image: string;
  highlights: string[];
  gallery: string[];
  status: string;
  level: string;
  created_at: Date;
  updated_at: Date;
  _count: {
    event_registrations: number;
    reviews: number;
  };
  averageRating?: number | null;
}): EventBase {
  return {
    id: event.id,
    slug: event.slug,
    title: event.title,
    description: event.description,
    starts_at: event.starts_at,
    ends_at: event.ends_at,
    location: event.location,
    full_location: event.full_location,
    total_seats: event.total_seats,
    available_seats: event.available_seats,
    instructor: event.instructor,
    includes: event.includes,
    price: event.price,
    image: event.image,
    highlights: event.highlights,
    gallery: event.gallery,
    status: mapEventStatus(event.status),
    level: mapEventLevel(event.level),
    created_at: event.created_at,
    updated_at: event.updated_at,
    registrations_count: event._count.event_registrations,
    reviews_count: event._count.reviews,
    avg_rating: event.averageRating ?? null,
  };
}

function mapEventDetail(
  event: {
    id: string;
    slug: string;
    title: string;
    description: string;
    starts_at: Date;
    ends_at: Date;
    location: string;
    full_location: string;
    total_seats: number;
    available_seats: number;
    instructor: string;
    includes: string[];
    price: number;
    image: string;
    highlights: string[];
    gallery: string[];
    status: string;
    level: string;
    created_at: Date;
    updated_at: Date;
    _count: {
      event_registrations: number;
      reviews: number;
    };
    reviews: Array<{
      id: number;
      user_id: number;
      rating: number;
      review: string | null;
      image_urls: string[];
      event_id: string | null;
      created_at: Date;
      updated_at: Date;
      user: {
        id: number;
        email: string;
        name: string | null;
        image: string | null;
      };
      likes: Array<{
        id: number;
        review_id: number;
        user_id: number;
      }>;
    }>;
  },
  isRegistered: boolean = false,
): EventDetail {
  const avgRating =
    event.reviews.length > 0
      ? event.reviews.reduce((sum, r) => sum + r.rating, 0) /
        event.reviews.length
      : null;

  return {
    id: event.id,
    slug: event.slug,
    title: event.title,
    description: event.description,
    starts_at: event.starts_at,
    ends_at: event.ends_at,
    location: event.location,
    full_location: event.full_location,
    total_seats: event.total_seats,
    available_seats: event.available_seats,
    instructor: event.instructor,
    includes: event.includes,
    price: event.price,
    image: event.image,
    highlights: event.highlights,
    gallery: event.gallery,
    status: mapEventStatus(event.status),
    level: mapEventLevel(event.level),
    created_at: event.created_at,
    updated_at: event.updated_at,
    registrations_count: event._count.event_registrations,
    reviews_count: event._count.reviews,
    avg_rating: avgRating,
    is_registered: isRegistered,
    reviews: event.reviews.map(mapReview),
  };
}

function mapReview(review: {
  id: number;
  user_id: number;
  rating: number;
  review: string | null;
  image_urls: string[];
  event_id: string | null;
  created_at: Date;
  updated_at: Date;
  user: {
    id: number;
    email: string;
    name: string | null;
    image: string | null;
  };
  likes: Array<{
    id: number;
    review_id: number;
    user_id: number;
  }>;
}): EventReview {
  return {
    id: review.id,
    user_id: review.user_id,
    rating: review.rating,
    review: review.review,
    image_urls: review.image_urls,
    event_id: review.event_id,
    created_at: review.created_at,
    updated_at: review.updated_at,
    user: {
      id: review.user.id,
      email: review.user.email,
      name: review.user.name,
      image: review.user.image,
    },
    likes: review.likes.map((like) => ({
      id: like.id,
      review_id: like.review_id,
      user_id: like.user_id,
    })),
  };
}

function mapRegistrationEvent(event: {
  id: string;
  slug: string;
  title: string;
  description: string;
  starts_at: Date;
  ends_at: Date;
  location: string;
  full_location: string;
  total_seats: number;
  available_seats: number;
  instructor: string;
  includes: string[];
  price: number;
  image: string;
  highlights: string[];
  gallery: string[];
  status: string;
  level: string;
  created_at: Date;
  updated_at: Date;
}): RegistrationEvent {
  return {
    id: event.id,
    slug: event.slug,
    title: event.title,
    description: event.description,
    starts_at: event.starts_at,
    ends_at: event.ends_at,
    location: event.location,
    full_location: event.full_location,
    total_seats: event.total_seats,
    available_seats: event.available_seats,
    instructor: event.instructor,
    includes: event.includes,
    price: event.price,
    image: event.image,
    highlights: event.highlights,
    gallery: event.gallery,
    status: mapEventStatus(event.status),
    level: mapEventLevel(event.level),
    created_at: event.created_at,
    updated_at: event.updated_at,
  };
}

function mapRegistration(
  registration: {
    id: string;
    event_id: string;
    user_id: number;
    seats_reserved: number;
    price: number;
    discount: number;
    status: string;
    request_at: Date | null;
    approved_at: Date | null;
    paid_at: Date | null;
    confirmed_at: Date | null;
    cancelled_at: Date | null;
    created_at: Date;
    updated_at: Date;
    event: {
      id: string;
      slug: string;
      title: string;
      description: string;
      starts_at: Date;
      ends_at: Date;
      location: string;
      full_location: string;
      total_seats: number;
      available_seats: number;
      instructor: string;
      includes: string[];
      price: number;
      image: string;
      highlights: string[];
      gallery: string[];
      status: string;
      level: string;
      created_at: Date;
      updated_at: Date;
    };
    user: {
      id: number;
      email: string;
      name: string | null;
      image: string | null;
    };
  },
  hasReviewed: boolean = false,
): EventRegistration {
  return {
    id: registration.id,
    event_id: registration.event_id,
    user_id: registration.user_id,
    seats_reserved: registration.seats_reserved,
    price: registration.price,
    discount: registration.discount,
    status: mapRegistrationStatus(registration.status),
    request_at: registration.request_at,
    approved_at: registration.approved_at,
    paid_at: registration.paid_at,
    confirmed_at: registration.confirmed_at,
    cancelled_at: registration.cancelled_at,
    created_at: registration.created_at,
    updated_at: registration.updated_at,
    event: mapRegistrationEvent(registration.event),
    user: {
      id: registration.user.id,
      email: registration.user.email,
      name: registration.user.name,
      image: registration.user.image,
    },
    has_reviewed: hasReviewed,
  };
}

// ============ EVENT QUERIES ============

export async function getEvents(
  filter?: EventsFilterInput,
): Promise<EventsResponse> {
  const page = filter?.page ?? 1;
  const limit = filter?.limit ?? 12;

  const where: Prisma.EventWhereInput = {};

  if (filter?.status) {
    where.status = filter.status as PrismaEventStatus;
  }

  if (filter?.level) {
    where.level = filter.level as PrismaEventLevel;
  }

  if (filter?.search) {
    where.title = { contains: filter.search, mode: "insensitive" };
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
        ? reviews.reduce(
            (sum: number, r: { rating: number }) => sum + r.rating,
            0,
          ) / reviews.length
        : null;
    return mapEventBase({ ...rest, averageRating });
  });

  return {
    data: eventsWithRating,
    total,
    page,
    total_pages: Math.ceil(total / limit),
    levels: levelsResult.map((l) => mapEventLevel(l.level)),
  };
}

export async function getEventBySlug(
  slug: string,
): Promise<EventDetail | null> {
  const userId = await getAuthenticatedUserId();

  const event = await prisma.event.findUnique({
    where: { slug },
    include: {
      reviews: {
        include: {
          user: {
            select: { id: true, email: true, name: true, image: true },
          },
          likes: true,
        },
        orderBy: { created_at: "desc" },
        take: 10,
      },
      _count: {
        select: { reviews: true, event_registrations: true },
      },
    },
  });

  if (!event) {
    return null;
  }

  // Check if user is registered for this event
  let isRegistered = false;
  if (userId) {
    const registration = await prisma.eventRegistration.findUnique({
      where: {
        event_id_user_id: {
          event_id: event.id,
          user_id: userId,
        },
      },
    });
    isRegistered = !!registration;
  }

  return mapEventDetail(event, isRegistered);
}

export async function getEventById(id: string): Promise<EventDetail | null> {
  const userId = await getAuthenticatedUserId();

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      reviews: {
        include: {
          user: {
            select: { id: true, email: true, name: true, image: true },
          },
          likes: true,
        },
        orderBy: { created_at: "desc" },
        take: 10,
      },
      _count: {
        select: { reviews: true, event_registrations: true },
      },
    },
  });

  if (!event) {
    return null;
  }

  // Check if user is registered for this event
  let isRegistered = false;
  if (userId) {
    const registration = await prisma.eventRegistration.findUnique({
      where: {
        event_id_user_id: {
          event_id: event.id,
          user_id: userId,
        },
      },
    });
    isRegistered = !!registration;
  }

  return mapEventDetail(event, isRegistered);
}

export async function getUpcomingEvents(
  filter?: EventsFilterInput,
): Promise<EventsResponse> {
  const userId = await getAuthenticatedUserId();
  const page = filter?.page ?? 1;
  const limit = filter?.limit ?? 12;

  // Get user's registered event IDs
  let userEventRegistrationIds: string[] = [];
  if (userId) {
    const userRegistrations = await prisma.eventRegistration.findMany({
      where: { user_id: userId },
      select: { event_id: true },
    });
    userEventRegistrationIds = userRegistrations.map((r) => r.event_id);
  }

  const where: Prisma.EventWhereInput = {
    starts_at: { gte: new Date() },
    status: { in: [PrismaEventStatus.UPCOMING, PrismaEventStatus.ACTIVE] },
  };

  // Exclude events the user is already registered for
  if (userEventRegistrationIds.length > 0) {
    where.id = { notIn: userEventRegistrationIds };
  }

  if (filter?.search) {
    where.title = { contains: filter.search, mode: "insensitive" };
  }

  const [events, total, levelsResult] = await Promise.all([
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
    prisma.event.findMany({
      distinct: ["level"],
      select: { level: true },
    }),
  ]);

  return {
    data: events.map((event) =>
      mapEventBase({ ...event, averageRating: null }),
    ),
    total,
    page,
    total_pages: Math.ceil(total / limit),
    levels: levelsResult.map((l) => mapEventLevel(l.level)),
  };
}

export async function getPastEvents(
  filter?: EventsFilterInput,
): Promise<EventsResponse> {
  const page = filter?.page ?? 1;
  const limit = filter?.limit ?? 12;

  const baseWhere: Prisma.EventWhereInput = {
    OR: [
      { status: PrismaEventStatus.COMPLETED },
      { ends_at: { lt: new Date() } },
    ],
  };

  const where: Prisma.EventWhereInput = filter?.search
    ? {
        AND: [
          baseWhere,
          { title: { contains: filter.search, mode: "insensitive" } },
        ],
      }
    : baseWhere;

  const [events, total, levelsResult] = await Promise.all([
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
        ? reviews.reduce(
            (sum: number, r: { rating: number }) => sum + r.rating,
            0,
          ) / reviews.length
        : null;
    return mapEventBase({ ...rest, averageRating });
  });

  return {
    data: eventsWithRating,
    total,
    page,
    total_pages: Math.ceil(total / limit),
    levels: levelsResult.map((l) => mapEventLevel(l.level)),
  };
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
          user: {
            select: { id: true, email: true, name: true, image: true },
          },
          likes: true,
        },
        orderBy: { created_at: "desc" },
        take: 10,
      },
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
    event.status === PrismaEventStatus.COMPLETED || event.ends_at < now;

  // Get user's registration for this event if authenticated
  let registration: EventRegistration | null = null;
  let hasReviewed = false;
  if (userId) {
    const reg = await prisma.eventRegistration.findFirst({
      where: {
        event_id: eventId,
        user_id: userId,
      },
      include: {
        event: true,
        user: {
          select: { id: true, email: true, name: true, image: true },
        },
      },
    });

    if (reg) {
      // Check if user has reviewed this event
      const review = await prisma.review.findFirst({
        where: {
          user_id: userId,
          event_id: eventId,
        },
      });
      hasReviewed = !!review;
      registration = mapRegistration(reg, hasReviewed);
    }
  }

  return {
    event: mapEventDetail(event, !!registration),
    registration,
    is_past_event: isPastEvent,
    current_user_id: userId,
  };
}

// ============ REGISTRATION QUERIES ============

export async function getUserRegistrations(
  filter?: RegistrationsFilterInput,
): Promise<RegistrationsResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { data: [], total: 0, page: 1, total_pages: 0 };
  }

  const page = filter?.page ?? 1;
  const limit = filter?.limit ?? 12;

  const where: {
    user_id: number;
    event?: { title: { contains: string; mode: "insensitive" } };
  } = { user_id: userId };

  if (filter?.search) {
    where.event = { title: { contains: filter.search, mode: "insensitive" } };
  }

  const [registrations, total] = await Promise.all([
    prisma.eventRegistration.findMany({
      where,
      include: {
        event: true,
        user: {
          select: { id: true, email: true, name: true, image: true },
        },
      },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.eventRegistration.count({ where }),
  ]);

  return {
    data: registrations.map((reg) => mapRegistration(reg, false)),
    total,
    page,
    total_pages: Math.ceil(total / limit),
  };
}

export async function getRegistrationById(
  registrationId: string,
): Promise<EventRegistration | null> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return null;
  }

  const registration = await prisma.eventRegistration.findFirst({
    where: {
      id: registrationId,
      user_id: userId,
    },
    include: {
      event: true,
      user: {
        select: { id: true, email: true, name: true, image: true },
      },
    },
  });

  if (!registration) {
    return null;
  }

  // Check if user has reviewed this event
  const review = await prisma.review.findFirst({
    where: {
      user_id: userId,
      event_id: registration.event_id,
    },
  });

  return mapRegistration(registration, !!review);
}

export async function getUpcomingRegistrations(
  filter?: RegistrationsFilterInput,
): Promise<RegistrationsResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { data: [], total: 0, page: 1, total_pages: 0 };
  }

  const page = filter?.page ?? 1;
  const limit = filter?.limit ?? 12;
  const now = new Date();

  const baseWhere = {
    user_id: userId,
    event: {
      ends_at: { gt: now },
    },
  };

  const where = filter?.search
    ? {
        ...baseWhere,
        AND: [
          {
            OR: [
              {
                event: {
                  title: {
                    contains: filter.search,
                    mode: "insensitive" as const,
                  },
                },
              },
            ],
          },
        ],
      }
    : baseWhere;

  const [registrations, total] = await Promise.all([
    prisma.eventRegistration.findMany({
      where,
      include: {
        event: true,
        user: {
          select: { id: true, email: true, name: true, image: true },
        },
      },
      orderBy: { event: { starts_at: "asc" } },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.eventRegistration.count({ where }),
  ]);

  return {
    data: registrations.map((reg) => mapRegistration(reg, false)),
    total,
    page,
    total_pages: Math.ceil(total / limit),
  };
}

export async function getCompletedRegistrations(
  filter?: RegistrationsFilterInput,
): Promise<RegistrationsResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { data: [], total: 0, page: 1, total_pages: 0 };
  }

  const page = filter?.page ?? 1;
  const limit = filter?.limit ?? 12;
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
      include: {
        event: true,
        user: {
          select: { id: true, email: true, name: true, image: true },
        },
      },
      orderBy: { event: { ends_at: "desc" } },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.eventRegistration.count({ where }),
  ]);

  // If no registrations, return early
  if (registrations.length === 0) {
    return { data: [], total: 0, page, total_pages: 0 };
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

  return {
    data: registrations.map((reg) =>
      mapRegistration(reg, reviewedEventIds.has(reg.event_id)),
    ),
    total,
    page,
    total_pages: Math.ceil(total / limit),
  };
}

// ============ MUTATIONS ============

export async function registerForEvent(
  input: RegisterForEventInput,
): Promise<RegisterForEventResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return {
      success: false,
      registration: null,
      error: "Not authenticated",
    };
  }

  const seats = input.seats ?? 1;

  try {
    // Check if already registered
    const existing = await prisma.eventRegistration.findUnique({
      where: {
        event_id_user_id: {
          event_id: input.eventId,
          user_id: userId,
        },
      },
    });

    if (existing) {
      return {
        success: false,
        registration: null,
        error: "Already registered for this event",
      };
    }

    // Get event details
    const event = await prisma.event.findUnique({
      where: { id: input.eventId },
      select: { price: true, available_seats: true },
    });

    if (!event) {
      return {
        success: false,
        registration: null,
        error: "Event not found",
      };
    }

    if (event.available_seats < seats) {
      return {
        success: false,
        registration: null,
        error: "Not enough seats available",
      };
    }

    // Create registration with PENDING status and update available seats
    const [registration] = await prisma.$transaction([
      prisma.eventRegistration.create({
        data: {
          event_id: input.eventId,
          user_id: userId,
          seats_reserved: seats,
          price: event.price * seats,
          status: "PENDING",
          request_at: new Date(),
        },
        include: {
          event: true,
          user: {
            select: { id: true, email: true, name: true, image: true },
          },
        },
      }),
      prisma.event.update({
        where: { id: input.eventId },
        data: {
          available_seats: { decrement: seats },
        },
      }),
    ]);

    revalidatePath("/events");
    revalidatePath("/events/registrations");

    return {
      success: true,
      registration: mapRegistration(registration, false),
      error: null,
    };
  } catch (error) {
    console.error("Failed to register for event:", error);
    return {
      success: false,
      registration: null,
      error: "Failed to register for event",
    };
  }
}

export async function cancelRegistration(
  registrationId: string,
): Promise<CancelRegistrationResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }

  try {
    const registration = await prisma.eventRegistration.findFirst({
      where: {
        id: registrationId,
        user_id: userId,
      },
    });

    if (!registration) {
      return {
        success: false,
        error: "Registration not found",
      };
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

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Failed to cancel registration:", error);
    return {
      success: false,
      error: "Failed to cancel registration",
    };
  }
}
