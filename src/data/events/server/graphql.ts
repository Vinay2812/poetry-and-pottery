"use server";

import { getClient, getPublicClient } from "@/lib/apollo";

import { REGISTER_FOR_EVENT_MUTATION } from "@/graphql/events.mutation";
import {
  COMPLETED_REGISTRATIONS_QUERY,
  EVENTS_QUERY,
  EVENT_BY_ID_QUERY,
  PAST_EVENTS_QUERY,
  UPCOMING_EVENTS_QUERY,
  UPCOMING_REGISTRATIONS_QUERY,
  USER_REGISTRATIONS_QUERY,
} from "@/graphql/events.query";
import type {
  CompletedRegistrationsQuery,
  CompletedRegistrationsQueryVariables,
  EventByIdQuery,
  EventByIdQueryVariables,
  EventDetail,
  EventsFilterInput,
  EventsQuery,
  EventsQueryVariables,
  EventsResponse,
  PastEventsQuery,
  PastEventsQueryVariables,
  RegisterForEventInput,
  RegisterForEventMutation,
  RegisterForEventMutationVariables,
  RegisterForEventResponse,
  RegistrationsFilterInput,
  RegistrationsResponse,
  UpcomingEventsQuery,
  UpcomingEventsQueryVariables,
  UpcomingRegistrationsQuery,
  UpcomingRegistrationsQueryVariables,
  UserRegistrationsQuery,
  UserRegistrationsQueryVariables,
} from "@/graphql/generated/types";

export async function getEvents(
  filter?: EventsFilterInput,
): Promise<EventsResponse> {
  const client = getPublicClient();

  const result = await client.query<EventsQuery, EventsQueryVariables>({
    query: EVENTS_QUERY,
    variables: { filter },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.events ?? {
      data: [],
      total: 0,
      page: 1,
      total_pages: 0,
      levels: [],
      event_types: [],
    }
  );
}

export async function getEventById(id: string): Promise<EventDetail | null> {
  const client = getPublicClient();

  const result = await client.query<EventByIdQuery, EventByIdQueryVariables>({
    query: EVENT_BY_ID_QUERY,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.eventById ?? null;
}

export async function getUpcomingEvents(
  filter?: EventsFilterInput,
): Promise<EventsResponse> {
  const client = getPublicClient();

  const result = await client.query<
    UpcomingEventsQuery,
    UpcomingEventsQueryVariables
  >({
    query: UPCOMING_EVENTS_QUERY,
    variables: { filter },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.upcomingEvents ?? {
      data: [],
      total: 0,
      page: 1,
      total_pages: 0,
      levels: [],
      event_types: [],
    }
  );
}

export async function getPastEvents(
  filter?: EventsFilterInput,
): Promise<EventsResponse> {
  const client = getPublicClient();

  const result = await client.query<PastEventsQuery, PastEventsQueryVariables>({
    query: PAST_EVENTS_QUERY,
    variables: { filter },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.pastEvents ?? {
      data: [],
      total: 0,
      page: 1,
      total_pages: 0,
      levels: [],
      event_types: [],
    }
  );
}

// ============ REGISTRATION QUERIES ============

export async function getUserRegistrations(
  filter?: RegistrationsFilterInput,
): Promise<RegistrationsResponse> {
  const client = getClient();

  const result = await client.query<
    UserRegistrationsQuery,
    UserRegistrationsQueryVariables
  >({
    query: USER_REGISTRATIONS_QUERY,
    variables: { filter },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.userRegistrations ?? {
      data: [],
      total: 0,
      page: 1,
      total_pages: 0,
    }
  );
}

export async function getUpcomingRegistrations(
  filter?: RegistrationsFilterInput,
): Promise<RegistrationsResponse> {
  const client = getClient();

  const result = await client.query<
    UpcomingRegistrationsQuery,
    UpcomingRegistrationsQueryVariables
  >({
    query: UPCOMING_REGISTRATIONS_QUERY,
    variables: { filter },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.upcomingRegistrations ?? {
      data: [],
      total: 0,
      page: 1,
      total_pages: 0,
    }
  );
}

export async function getCompletedRegistrations(
  filter?: RegistrationsFilterInput,
): Promise<RegistrationsResponse> {
  const client = getClient();

  const result = await client.query<
    CompletedRegistrationsQuery,
    CompletedRegistrationsQueryVariables
  >({
    query: COMPLETED_REGISTRATIONS_QUERY,
    variables: { filter },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.completedRegistrations ?? {
      data: [],
      total: 0,
      page: 1,
      total_pages: 0,
    }
  );
}

// ============ MUTATIONS ============

export async function registerForEvent(
  input: RegisterForEventInput,
): Promise<RegisterForEventResponse> {
  const client = getClient();

  const result = await client.mutate<
    RegisterForEventMutation,
    RegisterForEventMutationVariables
  >({
    mutation: REGISTER_FOR_EVENT_MUTATION,
    variables: { input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.registerForEvent ?? {
      success: false,
      registration: null,
      error: "Failed to register for event",
    }
  );
}
