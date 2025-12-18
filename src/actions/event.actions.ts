"use server";

import { EventService } from "@/services/event.service";
import { UserService } from "@/services/user.service";
import type { EventFilterParams } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

async function getCurrentUserId(): Promise<number | null> {
  const { userId: authId } = await auth();
  if (!authId) return null;

  const user = await UserService.getUserByAuthId(authId);
  return user?.id ?? null;
}

export async function getEvents(params: EventFilterParams = {}) {
  return EventService.getEvents(params);
}

export async function getUpcomingEvents(limit?: number) {
  return EventService.getUpcomingEvents(limit);
}

export async function getPastEvents(page?: number, limit?: number) {
  return EventService.getPastEvents(page, limit);
}

export async function getEventBySlug(slug: string) {
  return EventService.getEventBySlug(slug);
}

export async function getEventById(id: string) {
  return EventService.getEventById(id);
}

export async function getFeaturedEvents(limit?: number) {
  return EventService.getFeaturedEvents(limit);
}

export async function registerForEvent(eventId: string, seats: number = 1) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    // Check if already registered
    const isRegistered = await EventService.isUserRegistered(eventId, userId);
    if (isRegistered) {
      return { success: false, error: "Already registered for this event" };
    }

    // Check available seats
    const availableSeats = await EventService.getAvailableSeats(eventId);
    if (availableSeats < seats) {
      return { success: false, error: "Not enough seats available" };
    }

    // Get event to get price
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { price: true, available_seats: true },
    });

    if (!event) {
      return { success: false, error: "Event not found" };
    }

    // Create registration and update available seats in transaction
    const [registration] = await prisma.$transaction([
      prisma.eventRegistration.create({
        data: {
          event_id: eventId,
          user_id: userId,
          seats_reserved: seats,
          price: event.price * seats,
        },
        include: { event: true },
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
    revalidatePath(`/events/upcoming/${eventId}`);

    return { success: true, data: registration };
  } catch (error) {
    console.error("Failed to register for event:", error);
    return { success: false, error: "Failed to register for event" };
  }
}

export async function cancelRegistration(registrationId: string) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    // Get registration
    const registration = await prisma.eventRegistration.findFirst({
      where: {
        id: registrationId,
        user_id: userId,
      },
    });

    if (!registration) {
      return { success: false, error: "Registration not found" };
    }

    // Delete registration and restore seats in transaction
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

    return { success: true };
  } catch (error) {
    console.error("Failed to cancel registration:", error);
    return { success: false, error: "Failed to cancel registration" };
  }
}

export async function getUserRegistrations() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated", data: [] };
  }

  try {
    const registrations = await prisma.eventRegistration.findMany({
      where: { user_id: userId },
      include: { event: true },
      orderBy: { created_at: "desc" },
    });

    return { success: true, data: registrations };
  } catch (error) {
    console.error("Failed to get registrations:", error);
    return { success: false, error: "Failed to get registrations", data: [] };
  }
}

export async function getRegistrationById(registrationId: string) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const registration = await prisma.eventRegistration.findFirst({
      where: {
        id: registrationId,
        user_id: userId,
      },
      include: { event: true, user: true },
    });

    if (!registration) {
      return { success: false, error: "Registration not found" };
    }

    return { success: true, data: registration };
  } catch (error) {
    console.error("Failed to get registration:", error);
    return { success: false, error: "Failed to get registration" };
  }
}
