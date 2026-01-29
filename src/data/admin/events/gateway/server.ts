"use server";

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

import * as graphqlImpl from "../server/graphql";

export async function getEvents(
  filter?: AdminEventsFilterInput,
): Promise<AdminEventsResponse> {
  return graphqlImpl.getEvents(filter);
}

export async function getEventById(
  id: string,
): Promise<AdminEventDetail | null> {
  return graphqlImpl.getEventById(id);
}

export async function getEventRegistrations(
  eventId: string,
): Promise<AdminEventRegistrationsResponse> {
  return graphqlImpl.getEventRegistrations(eventId);
}

export async function getEventReviews(
  eventId: string,
): Promise<AdminEventReviewsResponse> {
  return graphqlImpl.getEventReviews(eventId);
}

export async function getEventStatusOptions(): Promise<AdminStatusOption[]> {
  return graphqlImpl.getEventStatusOptions();
}

export async function getEventLevelOptions(): Promise<AdminLevelOption[]> {
  return graphqlImpl.getEventLevelOptions();
}

export async function createEvent(
  input: CreateEventInput,
): Promise<AdminEventMutationResponse> {
  return graphqlImpl.createEvent(input);
}

export async function updateEvent(
  id: string,
  input: UpdateEventInput,
): Promise<AdminEventMutationResponse> {
  return graphqlImpl.updateEvent(id, input);
}

export async function deleteEvent(
  id: string,
): Promise<AdminEventMutationResponse> {
  return graphqlImpl.deleteEvent(id);
}

export async function updateEventStatus(
  id: string,
  status: string,
): Promise<AdminEventMutationResponse> {
  return graphqlImpl.updateEventStatus(id, status);
}

export async function deleteEventReview(
  reviewId: number,
): Promise<AdminEventMutationResponse> {
  return graphqlImpl.deleteEventReview(reviewId);
}
