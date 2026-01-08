"use server";

import { isGraphQL } from "@/consts/env";

import type {
  EventDetail,
  EventRegistration,
  EventWithUserContext,
  EventsFilterInput,
  EventsResponse,
  RegistrationsFilterInput,
  RegistrationsResponse,
} from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

// Result types for consistent error handling
export type GetEventsResult =
  | { success: true; data: EventsResponse }
  | { success: false; error: string };

export type GetEventResult =
  | { success: true; data: EventDetail }
  | { success: false; error: string };

export type GetEventWithContextResult =
  | { success: true; data: EventWithUserContext }
  | { success: false; error: string };

export type GetRegistrationsResult =
  | { success: true; data: RegistrationsResponse }
  | { success: false; error: string };

export type GetRegistrationResult =
  | { success: true; data: EventRegistration }
  | { success: false; error: string };

// ============ EVENT QUERIES ============

export async function getEvents(
  filter?: EventsFilterInput,
): Promise<GetEventsResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.getEvents(filter);
      return { success: true, data: result };
    }
    const result = await actionImpl.getEvents(filter);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get events",
    };
  }
}

export async function getEventBySlug(slug: string): Promise<GetEventResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.getEventBySlug(slug);
      if (!result) {
        return { success: false, error: "Event not found" };
      }
      return { success: true, data: result };
    }
    const result = await actionImpl.getEventBySlug(slug);
    if (!result) {
      return { success: false, error: "Event not found" };
    }
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get event",
    };
  }
}

export async function getEventById(id: string): Promise<GetEventResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.getEventById(id);
      if (!result) {
        return { success: false, error: "Event not found" };
      }
      return { success: true, data: result };
    }
    const result = await actionImpl.getEventById(id);
    if (!result) {
      return { success: false, error: "Event not found" };
    }
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get event",
    };
  }
}

export async function getUpcomingEvents(
  filter?: EventsFilterInput,
): Promise<GetEventsResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.getUpcomingEvents(filter);
      return { success: true, data: result };
    }
    const result = await actionImpl.getUpcomingEvents(filter);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to get upcoming events",
    };
  }
}

export async function getPastEvents(
  filter?: EventsFilterInput,
): Promise<GetEventsResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.getPastEvents(filter);
      return { success: true, data: result };
    }
    const result = await actionImpl.getPastEvents(filter);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to get past events",
    };
  }
}

export async function getEventWithUserContext(
  eventId: string,
): Promise<GetEventWithContextResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.getEventWithUserContext(eventId);
      if (!result) {
        return { success: false, error: "Event not found" };
      }
      return { success: true, data: result };
    }
    const result = await actionImpl.getEventWithUserContext(eventId);
    if (!result) {
      return { success: false, error: "Event not found" };
    }
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get event",
    };
  }
}

// ============ USER CONTEXT QUERIES ============

export type { UserEventContext } from "../server/action";

export type GetUserEventContextResult =
  | { success: true; data: actionImpl.UserEventContext }
  | { success: false; error: string };

export async function getUserEventContext(
  eventId: string,
): Promise<GetUserEventContextResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.getUserEventContext(eventId);
      if (!result) {
        return { success: false, error: "Event not found" };
      }
      return { success: true, data: result };
    }
    const result = await actionImpl.getUserEventContext(eventId);
    if (!result) {
      return { success: false, error: "Event not found" };
    }
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to get user context",
    };
  }
}

// ============ REGISTRATION QUERIES ============

export async function getUserRegistrations(
  filter?: RegistrationsFilterInput,
): Promise<GetRegistrationsResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.getUserRegistrations(filter);
      return { success: true, data: result };
    }
    const result = await actionImpl.getUserRegistrations(filter);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to get registrations",
    };
  }
}

export async function getRegistrationById(
  registrationId: string,
): Promise<GetRegistrationResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.getRegistrationById(registrationId);
      if (!result) {
        return { success: false, error: "Registration not found" };
      }
      return { success: true, data: result };
    }
    const result = await actionImpl.getRegistrationById(registrationId);
    if (!result) {
      return { success: false, error: "Registration not found" };
    }
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to get registration",
    };
  }
}

export async function getUpcomingRegistrations(
  filter?: RegistrationsFilterInput,
): Promise<GetRegistrationsResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.getUpcomingRegistrations(filter);
      return { success: true, data: result };
    }
    const result = await actionImpl.getUpcomingRegistrations(filter);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to get upcoming registrations",
    };
  }
}

export async function getCompletedRegistrations(
  filter?: RegistrationsFilterInput,
): Promise<GetRegistrationsResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.getCompletedRegistrations(filter);
      return { success: true, data: result };
    }
    const result = await actionImpl.getCompletedRegistrations(filter);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to get completed registrations",
    };
  }
}
