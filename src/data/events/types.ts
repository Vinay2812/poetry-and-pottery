// Re-export GraphQL generated types for events
export type {
  // Event types
  EventBase,
  EventDetail,
  EventsResponse,
  EventsFilterInput,
  EventWithUserContext,
  // Review types
  EventReview,
  EventReviewLike,
  EventReviewUser,
  // Registration types
  EventRegistration,
  RegistrationEvent,
  RegistrationUser,
  RegistrationsResponse,
  RegistrationsFilterInput,
  // Mutation types
  RegisterForEventInput,
  RegisterForEventResponse,
  CancelRegistrationResponse,
} from "@/graphql/generated/types";

// Re-export enums as values (not types) so they can be used at runtime
export {
  EventLevel,
  EventStatus,
  EventType,
  EventRegistrationStatus,
} from "@/graphql/generated/types";
