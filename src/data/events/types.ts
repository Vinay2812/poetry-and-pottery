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
  // Event types
  EventLevel,
  EventStatus,
  EventRegistrationStatus,
} from "@/graphql/generated/types";
