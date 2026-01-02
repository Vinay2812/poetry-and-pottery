"use server";

import { isGraphQL } from "@/consts/env";

import type {
  AdminEventDetail,
  AdminEventMutationResponse,
  AdminEventRegistrationsResponse,
  AdminEventReviewsResponse,
  AdminEventsFilterInput,
  AdminEventsResponse,
  AdminLevelOption,
  AdminStatusOption,
  CreateEventInput,
  UpdateEventInput,
} from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

export async function getEvents(
  filter?: AdminEventsFilterInput,
): Promise<AdminEventsResponse> {
  if (isGraphQL) {
    return graphqlImpl.getEvents(filter);
  }
  // Convert InputMaybe (null | undefined) to undefined for action
  const normalizedFilter = filter
    ? {
        search: filter.search ?? undefined,
        status: filter.status ?? undefined,
        level: filter.level ?? undefined,
        upcoming: filter.upcoming ?? undefined,
        page: filter.page ?? undefined,
        limit: filter.limit ?? undefined,
      }
    : undefined;
  return actionImpl.getEvents(normalizedFilter);
}

export async function getEventById(
  id: string,
): Promise<AdminEventDetail | null> {
  if (isGraphQL) {
    return graphqlImpl.getEventById(id);
  }
  return actionImpl.getEventById(id);
}

export async function getEventRegistrations(
  eventId: string,
): Promise<AdminEventRegistrationsResponse> {
  if (isGraphQL) {
    return graphqlImpl.getEventRegistrations(eventId);
  }
  return actionImpl.getEventRegistrations(eventId);
}

export async function getEventReviews(
  eventId: string,
): Promise<AdminEventReviewsResponse> {
  if (isGraphQL) {
    return graphqlImpl.getEventReviews(eventId);
  }
  return actionImpl.getEventReviews(eventId);
}

export async function getEventStatusOptions(): Promise<AdminStatusOption[]> {
  if (isGraphQL) {
    return graphqlImpl.getEventStatusOptions();
  }
  return actionImpl.getEventStatusOptions();
}

export async function getEventLevelOptions(): Promise<AdminLevelOption[]> {
  if (isGraphQL) {
    return graphqlImpl.getEventLevelOptions();
  }
  return actionImpl.getEventLevelOptions();
}

export async function createEvent(
  input: CreateEventInput,
): Promise<AdminEventMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.createEvent(input);
  }
  return actionImpl.createEvent(input);
}

export async function updateEvent(
  id: string,
  input: UpdateEventInput,
): Promise<AdminEventMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.updateEvent(id, input);
  }
  return actionImpl.updateEvent(id, input);
}

export async function deleteEvent(
  id: string,
): Promise<AdminEventMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.deleteEvent(id);
  }
  return actionImpl.deleteEvent(id);
}

export async function updateEventStatus(
  id: string,
  status: string,
): Promise<AdminEventMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.updateEventStatus(id, status);
  }
  return actionImpl.updateEventStatus(id, status);
}

export async function deleteEventReview(
  reviewId: number,
): Promise<AdminEventMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.deleteEventReview(reviewId);
  }
  return actionImpl.deleteEventReview(reviewId);
}
