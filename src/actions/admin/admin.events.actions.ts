"use server";

import {
  EventLevel,
  EventRegistrationStatus,
  EventStatus,
} from "@/prisma/generated/enums";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

// ============================================================================
// Types
// ============================================================================

export interface AdminEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  starts_at: Date;
  ends_at: Date;
  location: string;
  total_seats: number;
  available_seats: number;
  instructor: string;
  price: number;
  image: string;
  status: EventStatus;
  level: EventLevel;
  created_at: Date;
  _count: {
    event_registrations: number;
    reviews: number;
  };
}

export interface GetEventsParams {
  search?: string;
  status?: EventStatus;
  level?: EventLevel;
  upcoming?: boolean;
  page?: number;
  limit?: number;
}

export interface GetEventsResult {
  events: AdminEvent[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface EventDetail {
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
  status: EventStatus;
  level: EventLevel;
  created_at: Date;
  updated_at: Date;
  _count: {
    event_registrations: number;
    reviews: number;
  };
}

export interface CreateEventParams {
  title: string;
  slug: string;
  description: string;
  starts_at: Date;
  ends_at: Date;
  location: string;
  full_location: string;
  total_seats: number;
  available_seats: number;
  instructor: string;
  includes?: string[];
  price: number;
  image: string;
  highlights?: string[];
  gallery?: string[];
  status?: EventStatus;
  level?: EventLevel;
}

export interface UpdateEventParams {
  id: string;
  title?: string;
  slug?: string;
  description?: string;
  starts_at?: Date;
  ends_at?: Date;
  location?: string;
  full_location?: string;
  total_seats?: number;
  available_seats?: number;
  instructor?: string;
  includes?: string[];
  price?: number;
  image?: string;
  highlights?: string[];
  gallery?: string[];
  status?: EventStatus;
  level?: EventLevel;
}

export interface ActionResult {
  success: boolean;
  error?: string;
}

export interface CreateEventResult extends ActionResult {
  eventId?: string;
}

export interface EventRegistration {
  id: string;
  status: EventRegistrationStatus;
  seats_reserved: number;
  price: number;
  discount: number;
  created_at: Date;
  request_at: Date | null;
  approved_at: Date | null;
  paid_at: Date | null;
  confirmed_at: Date | null;
  cancelled_at: Date | null;
  user: {
    id: number;
    name: string | null;
    email: string;
    image: string | null;
    phone: string | null;
  };
}

export interface GetEventRegistrationsResult {
  registrations: EventRegistration[];
  total: number;
  statusCounts: Record<EventRegistrationStatus, number>;
}

export interface EventReview {
  id: number;
  rating: number;
  review: string | null;
  image_urls: string[];
  created_at: Date;
  user: {
    id: number;
    name: string | null;
    email: string;
    image: string | null;
  };
}

export interface GetEventReviewsResult {
  reviews: EventReview[];
  total: number;
  averageRating: number;
}

// ============================================================================
// Actions
// ============================================================================

/**
 * Get paginated list of events with search and filters.
 */
export async function getEvents(
  params: GetEventsParams = {},
): Promise<GetEventsResult> {
  await requireAdmin();

  const { search = "", status, level, upcoming, page = 1, limit = 20 } = params;
  const skip = (page - 1) * limit;

  const where = {
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" as const } },
        { description: { contains: search, mode: "insensitive" as const } },
        { slug: { contains: search, mode: "insensitive" as const } },
        { instructor: { contains: search, mode: "insensitive" as const } },
        { location: { contains: search, mode: "insensitive" as const } },
      ],
    }),
    ...(status && { status }),
    ...(level && { level }),
    ...(upcoming && { starts_at: { gte: new Date() } }),
  };

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
    events,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Get a single event by ID.
 */
export async function getEventById(
  eventId: string,
): Promise<EventDetail | null> {
  await requireAdmin();

  const event = await prisma.event.findUnique({
    where: { id: eventId },
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

  return event;
}

/**
 * Create a new event.
 */
export async function createEvent(
  params: CreateEventParams,
): Promise<CreateEventResult> {
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
    status = EventStatus.UPCOMING,
    level = EventLevel.BEGINNER,
  } = params;

  // Validate slug uniqueness
  const existingEvent = await prisma.event.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existingEvent) {
    return { success: false, error: "An event with this slug already exists" };
  }

  // Validate dates
  if (new Date(starts_at) >= new Date(ends_at)) {
    return { success: false, error: "End date must be after start date" };
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
        includes,
        price,
        image,
        highlights,
        gallery,
        status,
        level,
      },
    });

    revalidatePath("/dashboard/events");
    revalidatePath("/events");

    return { success: true, eventId: event.id };
  } catch (error) {
    console.error("Failed to create event:", error);
    return { success: false, error: "Failed to create event" };
  }
}

/**
 * Update an existing event.
 */
export async function updateEvent(
  params: UpdateEventParams,
): Promise<ActionResult> {
  await requireAdmin();

  const { id, ...data } = params;

  // If slug is being updated, validate uniqueness
  if (data.slug) {
    const existingEvent = await prisma.event.findFirst({
      where: { slug: data.slug, NOT: { id } },
      select: { id: true },
    });

    if (existingEvent) {
      return {
        success: false,
        error: "An event with this slug already exists",
      };
    }
  }

  // Validate dates if both are provided
  if (data.starts_at && data.ends_at) {
    if (new Date(data.starts_at) >= new Date(data.ends_at)) {
      return { success: false, error: "End date must be after start date" };
    }
  }

  try {
    await prisma.event.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard/events");
    revalidatePath(`/dashboard/events/${id}`);
    revalidatePath("/events");

    return { success: true };
  } catch (error) {
    console.error("Failed to update event:", error);
    return { success: false, error: "Failed to update event" };
  }
}

/**
 * Delete an event (or cancel if it has registrations).
 */
export async function deleteEvent(eventId: string): Promise<ActionResult> {
  await requireAdmin();

  try {
    // Check if event has registrations
    const registrationCount = await prisma.eventRegistration.count({
      where: { event_id: eventId },
    });

    if (registrationCount > 0) {
      // Has registrations - cancel instead of delete
      await prisma.event.update({
        where: { id: eventId },
        data: { status: EventStatus.CANCELLED },
      });

      revalidatePath("/dashboard/events");
      revalidatePath("/events");

      return {
        success: true,
        error:
          "Event has registrations and was cancelled instead of deleted. This keeps registration history intact.",
      };
    }

    // No registrations - safe to delete
    await prisma.event.delete({
      where: { id: eventId },
    });

    revalidatePath("/dashboard/events");
    revalidatePath("/events");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete event:", error);
    return { success: false, error: "Failed to delete event" };
  }
}

/**
 * Update event status.
 */
export async function updateEventStatus(
  eventId: string,
  status: EventStatus,
): Promise<ActionResult> {
  await requireAdmin();

  try {
    await prisma.event.update({
      where: { id: eventId },
      data: { status },
    });

    revalidatePath("/dashboard/events");
    revalidatePath(`/dashboard/events/${eventId}`);
    revalidatePath("/events");

    return { success: true };
  } catch (error) {
    console.error("Failed to update event status:", error);
    return { success: false, error: "Failed to update event status" };
  }
}

/**
 * Get registrations for an event.
 */
export async function getEventRegistrations(
  eventId: string,
): Promise<GetEventRegistrationsResult> {
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

  // Calculate status counts
  const statusCounts = registrations.reduce(
    (acc, reg) => {
      acc[reg.status] = (acc[reg.status] || 0) + 1;
      return acc;
    },
    {} as Record<EventRegistrationStatus, number>,
  );

  // Ensure all statuses have a count
  for (const status of Object.values(EventRegistrationStatus)) {
    if (!(status in statusCounts)) {
      statusCounts[status] = 0;
    }
  }

  return {
    registrations,
    total: registrations.length,
    statusCounts,
  };
}

/**
 * Get reviews for an event.
 */
export async function getEventReviews(
  eventId: string,
): Promise<GetEventReviewsResult> {
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
    reviews,
    total: aggregation._count,
    averageRating: aggregation._avg.rating || 0,
  };
}

/**
 * Delete an event review.
 */
export async function deleteEventReview(
  reviewId: number,
): Promise<ActionResult> {
  await requireAdmin();

  try {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      select: { event_id: true },
    });

    if (!review) {
      return { success: false, error: "Review not found" };
    }

    await prisma.review.delete({
      where: { id: reviewId },
    });

    if (review.event_id) {
      revalidatePath(`/dashboard/events/${review.event_id}`);
      revalidatePath(`/events`);
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to delete review:", error);
    return { success: false, error: "Failed to delete review" };
  }
}

/**
 * Get event status options.
 */
export async function getEventStatusOptions(): Promise<
  { value: EventStatus; label: string }[]
> {
  return [
    { value: EventStatus.UPCOMING, label: "Upcoming" },
    { value: EventStatus.ACTIVE, label: "Active" },
    { value: EventStatus.INACTIVE, label: "Inactive" },
    { value: EventStatus.COMPLETED, label: "Completed" },
    { value: EventStatus.CANCELLED, label: "Cancelled" },
  ];
}

/**
 * Get event level options.
 */
export async function getEventLevelOptions(): Promise<
  { value: EventLevel; label: string }[]
> {
  return [
    { value: EventLevel.BEGINNER, label: "Beginner" },
    { value: EventLevel.INTERMEDIATE, label: "Intermediate" },
    { value: EventLevel.ADVANCED, label: "Advanced" },
  ];
}

/**
 * Get event status color.
 */
export async function getEventStatusColor(
  status: EventStatus,
): Promise<string> {
  const colors: Record<EventStatus, string> = {
    [EventStatus.UPCOMING]: "bg-blue-100 text-blue-700 border-blue-200",
    [EventStatus.ACTIVE]: "bg-emerald-100 text-emerald-700 border-emerald-200",
    [EventStatus.INACTIVE]:
      "bg-neutral-100 text-neutral-700 border-neutral-200",
    [EventStatus.COMPLETED]: "bg-primary/10 text-primary border-primary/20",
    [EventStatus.CANCELLED]: "bg-red-100 text-red-700 border-red-200",
  };
  return colors[status];
}

/**
 * Get event level color.
 */
export async function getEventLevelColor(level: EventLevel): Promise<string> {
  const colors: Record<EventLevel, string> = {
    [EventLevel.BEGINNER]: "bg-green-100 text-green-700 border-green-200",
    [EventLevel.INTERMEDIATE]: "bg-amber-100 text-amber-700 border-amber-200",
    [EventLevel.ADVANCED]: "bg-purple-100 text-purple-700 border-purple-200",
  };
  return colors[level];
}
