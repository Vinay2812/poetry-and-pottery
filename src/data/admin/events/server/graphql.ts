"use server";

import { getClient } from "@/lib/apollo";

import {
  ADMIN_BULK_DELETE_EVENTS_MUTATION,
  ADMIN_CREATE_EVENT_MUTATION,
  ADMIN_DELETE_EVENT_MUTATION,
  ADMIN_UPDATE_EVENT_MUTATION,
  ADMIN_UPDATE_EVENT_STATUS_MUTATION,
} from "@/graphql/admin/events.mutation";
import {
  ADMIN_EVENTS_QUERY,
  ADMIN_EVENT_BY_ID_QUERY,
  ADMIN_EVENT_LEVEL_OPTIONS_QUERY,
  ADMIN_EVENT_REGISTRATIONS_QUERY,
  ADMIN_EVENT_REVIEWS_QUERY,
  ADMIN_EVENT_STATUS_OPTIONS_QUERY,
} from "@/graphql/admin/events.query";
import type {
  AdminCreateEventMutation,
  AdminCreateEventMutationVariables,
  AdminDeleteEventMutation,
  AdminDeleteEventMutationVariables,
  AdminEventByIdQuery,
  AdminEventByIdQueryVariables,
  AdminEventDetail,
  AdminEventLevelOptionsQuery,
  AdminEventMutationResponse,
  AdminEventRegistrationsQuery,
  AdminEventRegistrationsQueryVariables,
  AdminEventRegistrationsResponse,
  AdminEventReviewsQuery,
  AdminEventReviewsQueryVariables,
  AdminEventReviewsResponse,
  AdminEventStatusOptionsQuery,
  AdminEventsFilterInput,
  AdminEventsQuery,
  AdminEventsQueryVariables,
  AdminEventsResponse,
  AdminLevelOption,
  AdminStatusOption,
  AdminUpdateEventMutation,
  AdminUpdateEventMutationVariables,
  AdminUpdateEventStatusMutation,
  AdminUpdateEventStatusMutationVariables,
  CreateEventInput,
  UpdateEventInput,
} from "@/graphql/generated/types";

export async function getEvents(
  filter?: AdminEventsFilterInput,
): Promise<AdminEventsResponse> {
  const client = getClient();

  const result = await client.query<
    AdminEventsQuery,
    AdminEventsQueryVariables
  >({
    query: ADMIN_EVENTS_QUERY,
    variables: { filter },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminEvents;
}

export async function getEventById(
  id: string,
): Promise<AdminEventDetail | null> {
  const client = getClient();

  const result = await client.query<
    AdminEventByIdQuery,
    AdminEventByIdQueryVariables
  >({
    query: ADMIN_EVENT_BY_ID_QUERY,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminEventById ?? null;
}

export async function getEventRegistrations(
  eventId: string,
): Promise<AdminEventRegistrationsResponse> {
  const client = getClient();

  const result = await client.query<
    AdminEventRegistrationsQuery,
    AdminEventRegistrationsQueryVariables
  >({
    query: ADMIN_EVENT_REGISTRATIONS_QUERY,
    variables: { eventId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminEventRegistrations;
}

export async function getEventReviews(
  eventId: string,
): Promise<AdminEventReviewsResponse> {
  const client = getClient();

  const result = await client.query<
    AdminEventReviewsQuery,
    AdminEventReviewsQueryVariables
  >({
    query: ADMIN_EVENT_REVIEWS_QUERY,
    variables: { eventId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminEventReviews;
}

export async function getEventStatusOptions(): Promise<AdminStatusOption[]> {
  const client = getClient();

  const result = await client.query<AdminEventStatusOptionsQuery>({
    query: ADMIN_EVENT_STATUS_OPTIONS_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminEventStatusOptions;
}

export async function getEventLevelOptions(): Promise<AdminLevelOption[]> {
  const client = getClient();

  const result = await client.query<AdminEventLevelOptionsQuery>({
    query: ADMIN_EVENT_LEVEL_OPTIONS_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminEventLevelOptions;
}

export async function createEvent(
  input: CreateEventInput,
): Promise<AdminEventMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminCreateEventMutation,
    AdminCreateEventMutationVariables
  >({
    mutation: ADMIN_CREATE_EVENT_MUTATION,
    variables: { input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminCreateEvent;
}

export async function updateEvent(
  id: string,
  input: UpdateEventInput,
): Promise<AdminEventMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateEventMutation,
    AdminUpdateEventMutationVariables
  >({
    mutation: ADMIN_UPDATE_EVENT_MUTATION,
    variables: { id, input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateEvent;
}

export async function deleteEvent(
  id: string,
): Promise<AdminEventMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminDeleteEventMutation,
    AdminDeleteEventMutationVariables
  >({
    mutation: ADMIN_DELETE_EVENT_MUTATION,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminDeleteEvent;
}

export async function updateEventStatus(
  id: string,
  status: string,
): Promise<AdminEventMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateEventStatusMutation,
    AdminUpdateEventStatusMutationVariables
  >({
    mutation: ADMIN_UPDATE_EVENT_STATUS_MUTATION,
    variables: { id, status },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateEventStatus;
}

export interface BulkDeleteEventResult {
  id: string;
  success: boolean;
  action: string;
  error: string | null;
}

export interface AdminBulkDeleteEventsResponse {
  success: boolean;
  totalRequested: number;
  deletedCount: number;
  cancelledCount: number;
  failedCount: number;
  results: BulkDeleteEventResult[];
  error: string | null;
}

export async function bulkDeleteEvents(
  ids: string[],
): Promise<AdminBulkDeleteEventsResponse> {
  const client = getClient();

  const result = await client.mutate<{
    adminBulkDeleteEvents: AdminBulkDeleteEventsResponse;
  }>({
    mutation: ADMIN_BULK_DELETE_EVENTS_MUTATION,
    variables: { input: { ids } },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminBulkDeleteEvents;
}
