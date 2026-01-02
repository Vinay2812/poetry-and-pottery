"use server";

import { getClient } from "@/lib/apollo";

import {
  CANCEL_REGISTRATION_MUTATION,
  REGISTER_FOR_EVENT_MUTATION,
} from "@/graphql/events.mutation";
import {
  COMPLETED_REGISTRATIONS_QUERY,
  EVENTS_QUERY,
  EVENT_BY_ID_QUERY,
  EVENT_BY_SLUG_QUERY,
  EVENT_WITH_USER_CONTEXT_QUERY,
  PAST_EVENTS_QUERY,
  REGISTRATION_BY_ID_QUERY,
  UPCOMING_EVENTS_QUERY,
  UPCOMING_REGISTRATIONS_QUERY,
  USER_REGISTRATIONS_QUERY,
} from "@/graphql/events.query";
import type {
  CancelRegistrationMutation,
  CancelRegistrationMutationVariables,
  CancelRegistrationResponse,
  CompletedRegistrationsQuery,
  CompletedRegistrationsQueryVariables,
  EventByIdQuery,
  EventByIdQueryVariables,
  EventBySlugQuery,
  EventBySlugQueryVariables,
  EventDetail,
  EventRegistration,
  EventWithUserContext,
  EventWithUserContextQuery,
  EventWithUserContextQueryVariables,
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
  RegistrationByIdQuery,
  RegistrationByIdQueryVariables,
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
  const client = getClient();

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
    }
  );
}

export async function getEventBySlug(
  slug: string,
): Promise<EventDetail | null> {
  const client = getClient();

  const result = await client.query<
    EventBySlugQuery,
    EventBySlugQueryVariables
  >({
    query: EVENT_BY_SLUG_QUERY,
    variables: { slug },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.eventBySlug ?? null;
}

export async function getEventById(id: string): Promise<EventDetail | null> {
  const client = getClient();

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
  const client = getClient();

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
    }
  );
}

export async function getPastEvents(
  filter?: EventsFilterInput,
): Promise<EventsResponse> {
  const client = getClient();

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
    }
  );
}

export async function getEventWithUserContext(
  eventId: string,
): Promise<EventWithUserContext | null> {
  const client = getClient();

  const result = await client.query<
    EventWithUserContextQuery,
    EventWithUserContextQueryVariables
  >({
    query: EVENT_WITH_USER_CONTEXT_QUERY,
    variables: { eventId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.eventWithUserContext ?? null;
}

// ============ USER CONTEXT QUERIES ============

export interface UserEventContext {
  registration: EventRegistration | null;
  currentUserId: number | null;
  isPastEvent: boolean;
}

export async function getUserEventContext(
  eventId: string,
): Promise<UserEventContext | null> {
  const client = getClient();

  // Reuse eventWithUserContext query but only extract user context
  const result = await client.query<
    EventWithUserContextQuery,
    EventWithUserContextQueryVariables
  >({
    query: EVENT_WITH_USER_CONTEXT_QUERY,
    variables: { eventId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  const context = result.data?.eventWithUserContext;
  if (!context) {
    return null;
  }

  return {
    registration: context.registration ?? null,
    currentUserId: context.current_user_id ?? null,
    isPastEvent: context.is_past_event,
  };
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

export async function getRegistrationById(
  registrationId: string,
): Promise<EventRegistration | null> {
  const client = getClient();

  const result = await client.query<
    RegistrationByIdQuery,
    RegistrationByIdQueryVariables
  >({
    query: REGISTRATION_BY_ID_QUERY,
    variables: { registrationId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.registrationById ?? null;
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

export async function cancelRegistration(
  registrationId: string,
): Promise<CancelRegistrationResponse> {
  const client = getClient();

  const result = await client.mutate<
    CancelRegistrationMutation,
    CancelRegistrationMutationVariables
  >({
    mutation: CANCEL_REGISTRATION_MUTATION,
    variables: { registrationId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.cancelRegistration ?? {
      success: false,
      error: "Failed to cancel registration",
    }
  );
}
