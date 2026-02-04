"use server";

import { cacheLife, cacheTag } from "next/cache";

import type {
  EventDetail,
  EventsFilterInput,
  EventsResponse,
  RegistrationsFilterInput,
  RegistrationsResponse,
} from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

// Result types for consistent error handling
export type GetEventsResult =
  | { success: true; data: EventsResponse }
  | { success: false; error: string };

export type GetEventResult =
  | { success: true; data: EventDetail }
  | { success: false; error: string };

export type GetRegistrationsResult =
  | { success: true; data: RegistrationsResponse }
  | { success: false; error: string };

// ============ EVENT QUERIES ============

export async function getEvents(
  filter?: EventsFilterInput,
): Promise<GetEventsResult> {
  "use cache";
  cacheTag("events", "events:list");
  cacheLife("events");
  try {
    const result = await graphqlImpl.getEvents(filter);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get events",
    };
  }
}

export async function getEventById(id: string): Promise<GetEventResult> {
  "use cache";
  cacheTag("events", `event:${id}`);
  cacheLife("events");
  try {
    const result = await graphqlImpl.getEventById(id);
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
  "use cache";
  cacheTag("events", "events:upcoming");
  cacheLife("events");
  try {
    const result = await graphqlImpl.getUpcomingEvents(filter);
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
  "use cache";
  cacheTag("events", "events:past");
  cacheLife("events");
  try {
    const result = await graphqlImpl.getPastEvents(filter);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to get past events",
    };
  }
}

// ============ REGISTRATION QUERIES ============

export async function getUserRegistrations(
  filter?: RegistrationsFilterInput,
): Promise<GetRegistrationsResult> {
  try {
    const result = await graphqlImpl.getUserRegistrations(filter);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to get registrations",
    };
  }
}

export async function getUpcomingRegistrations(
  filter?: RegistrationsFilterInput,
): Promise<GetRegistrationsResult> {
  try {
    const result = await graphqlImpl.getUpcomingRegistrations(filter);
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
    const result = await graphqlImpl.getCompletedRegistrations(filter);
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
