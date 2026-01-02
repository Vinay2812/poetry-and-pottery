"use server";

import {
  EventLevel,
  EventRegistrationStatus,
  EventStatus,
} from "@/prisma/generated/enums";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

import type {
  AdminEventDetail,
  AdminEventMutationResponse,
  AdminEventRegistrationsResponse,
  AdminEventReviewsResponse,
  AdminEventsResponse,
  AdminLevelOption,
  AdminStatusOption,
  CreateEventInput,
  UpdateEventInput,
} from "@/graphql/generated/types";

interface AdminEventsFilterParams {
  search?: string;
  status?: string;
  level?: string;
  upcoming?: boolean;
  page?: number;
  limit?: number;
}

export async function getEvents(
  filter: AdminEventsFilterParams = {},
): Promise<AdminEventsResponse> {
  await requireAdmin();

  const { search = "", status, level, upcoming, page = 1, limit = 20 } = filter;
  const skip = (page - 1) * limit;

  const where: {
    OR?: object[];
    status?: EventStatus;
    level?: EventLevel;
    starts_at?: { gte: Date };
  } = {};

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
      { instructor: { contains: search, mode: "insensitive" } },
      { location: { contains: search, mode: "insensitive" } },
    ];
  }

  if (status) {
    where.status = status as EventStatus;
  }

  if (level) {
    where.level = level as EventLevel;
  }

  if (upcoming) {
    where.starts_at = { gte: new Date() };
  }

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      skip,
      take: limit,
      orderBy: { starts_at: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        starts_at: true,
        ends_at: true,
        location: true,
        total_seats: true,
        available_seats: true,
        instructor: true,
        price: true,
        image: true,
        status: true,
        level: true,
        created_at: true,
        _count: {
          select: {
            event_registrations: true,
            reviews: true,
          },
        },
      },
    }),
    prisma.event.count({ where }),
  ]);

  return {
    events: events as unknown as AdminEventsResponse["events"],
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getEventById(
  id: string,
): Promise<AdminEventDetail | null> {
  await requireAdmin();

  const event = await prisma.event.findUnique({
    where: { id },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      starts_at: true,
      ends_at: true,
      location: true,
      full_location: true,
      total_seats: true,
      available_seats: true,
      instructor: true,
      includes: true,
      price: true,
      image: true,
      highlights: true,
      gallery: true,
      status: true,
      level: true,
      created_at: true,
      updated_at: true,
      _count: {
        select: {
          event_registrations: true,
          reviews: true,
        },
      },
    },
  });

  return event as AdminEventDetail | null;
}

export async function getEventRegistrations(
  eventId: string,
): Promise<AdminEventRegistrationsResponse> {
  await requireAdmin();

  const registrations = await prisma.eventRegistration.findMany({
    where: { event_id: eventId },
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      status: true,
      seats_reserved: true,
      price: true,
      discount: true,
      created_at: true,
      request_at: true,
      approved_at: true,
      paid_at: true,
      confirmed_at: true,
      cancelled_at: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          phone: true,
        },
      },
    },
  });

  const statusCounts = {
    PENDING: 0,
    APPROVED: 0,
    REJECTED: 0,
    PAID: 0,
    CONFIRMED: 0,
    CANCELLED: 0,
  };

  for (const reg of registrations) {
    statusCounts[reg.status] = (statusCounts[reg.status] || 0) + 1;
  }

  return {
    registrations:
      registrations as unknown as AdminEventRegistrationsResponse["registrations"],
    total: registrations.length,
    statusCounts,
  };
}

export async function getEventReviews(
  eventId: string,
): Promise<AdminEventReviewsResponse> {
  await requireAdmin();

  const [reviews, aggregation] = await Promise.all([
    prisma.review.findMany({
      where: { event_id: eventId },
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        rating: true,
        review: true,
        image_urls: true,
        created_at: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    }),
    prisma.review.aggregate({
      where: { event_id: eventId },
      _avg: { rating: true },
      _count: true,
    }),
  ]);

  return {
    reviews: reviews as unknown as AdminEventReviewsResponse["reviews"],
    total: aggregation._count,
    averageRating: aggregation._avg.rating ?? 0,
  };
}

export async function getEventStatusOptions(): Promise<AdminStatusOption[]> {
  return [
    { value: EventStatus.UPCOMING, label: "Upcoming" },
    { value: EventStatus.ACTIVE, label: "Active" },
    { value: EventStatus.INACTIVE, label: "Inactive" },
    { value: EventStatus.COMPLETED, label: "Completed" },
    { value: EventStatus.CANCELLED, label: "Cancelled" },
  ];
}

export async function getEventLevelOptions(): Promise<AdminLevelOption[]> {
  return [
    { value: EventLevel.BEGINNER, label: "Beginner" },
    { value: EventLevel.INTERMEDIATE, label: "Intermediate" },
    { value: EventLevel.ADVANCED, label: "Advanced" },
  ];
}

export async function createEvent(
  input: CreateEventInput,
): Promise<AdminEventMutationResponse> {
  await requireAdmin();

  const {
    title,
    slug,
    description,
    starts_at,
    ends_at,
    location,
    full_location,
    total_seats,
    available_seats,
    instructor,
    includes = [],
    price,
    image,
    highlights = [],
    gallery = [],
    status = EventStatus.UPCOMING as string,
    level = EventLevel.BEGINNER as string,
  } = input;

  const existingEvent = await prisma.event.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existingEvent) {
    return {
      success: false,
      eventId: null,
      error: "An event with this slug already exists",
    };
  }

  if (new Date(starts_at) >= new Date(ends_at)) {
    return {
      success: false,
      eventId: null,
      error: "End date must be after start date",
    };
  }

  try {
    const event = await prisma.event.create({
      data: {
        title,
        slug,
        description,
        starts_at,
        ends_at,
        location,
        full_location,
        total_seats,
        available_seats,
        instructor,
        includes: includes ?? undefined,
        price,
        image,
        highlights: highlights ?? undefined,
        gallery: gallery ?? undefined,
        status: status as EventStatus,
        level: level as EventLevel,
      },
    });

    return {
      success: true,
      eventId: event.id,
      error: null,
    };
  } catch {
    return { success: false, eventId: null, error: "Failed to create event" };
  }
}

export async function updateEvent(
  id: string,
  input: UpdateEventInput,
): Promise<AdminEventMutationResponse> {
  await requireAdmin();

  if (input.slug) {
    const existingEvent = await prisma.event.findFirst({
      where: { slug: input.slug, NOT: { id } },
      select: { id: true },
    });

    if (existingEvent) {
      return {
        success: false,
        eventId: null,
        error: "An event with this slug already exists",
      };
    }
  }

  if (input.starts_at && input.ends_at) {
    if (new Date(input.starts_at) >= new Date(input.ends_at)) {
      return {
        success: false,
        eventId: null,
        error: "End date must be after start date",
      };
    }
  }

  try {
    await prisma.event.update({
      where: { id },
      data: input as object,
    });

    return {
      success: true,
      eventId: id,
      error: null,
    };
  } catch {
    return { success: false, eventId: null, error: "Failed to update event" };
  }
}

export async function deleteEvent(
  id: string,
): Promise<AdminEventMutationResponse> {
  await requireAdmin();

  try {
    const registrationCount = await prisma.eventRegistration.count({
      where: { event_id: id },
    });

    if (registrationCount > 0) {
      await prisma.event.update({
        where: { id },
        data: { status: EventStatus.CANCELLED },
      });

      return {
        success: true,
        eventId: id,
        error:
          "Event has registrations and was cancelled instead of deleted. This keeps registration history intact.",
      };
    }

    await prisma.event.delete({
      where: { id },
    });

    return {
      success: true,
      eventId: null,
      error: null,
    };
  } catch {
    return { success: false, eventId: null, error: "Failed to delete event" };
  }
}

export async function updateEventStatus(
  id: string,
  status: string,
): Promise<AdminEventMutationResponse> {
  await requireAdmin();

  try {
    await prisma.event.update({
      where: { id },
      data: { status: status as EventStatus },
    });

    return {
      success: true,
      eventId: id,
      error: null,
    };
  } catch {
    return {
      success: false,
      eventId: null,
      error: "Failed to update event status",
    };
  }
}

export async function deleteEventReview(
  reviewId: number,
): Promise<AdminEventMutationResponse> {
  await requireAdmin();

  try {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      select: { event_id: true },
    });

    if (!review) {
      return { success: false, eventId: null, error: "Review not found" };
    }

    await prisma.review.delete({
      where: { id: reviewId },
    });

    return {
      success: true,
      eventId: review.event_id,
      error: null,
    };
  } catch {
    return { success: false, eventId: null, error: "Failed to delete review" };
  }
}
