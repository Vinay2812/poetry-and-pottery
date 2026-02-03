import { gql } from "@apollo/client";

// Fragment for registration event fields
const REGISTRATION_EVENT_FIELDS = gql`
  fragment MutationRegistrationEventFields on RegistrationEvent {
    id
    slug
    title
    description
    event_type
    starts_at
    ends_at
    location
    full_location
    total_seats
    available_seats
    instructor
    includes
    price
    image
    highlights
    gallery
    status
    level
    performers
    lineup_notes
    created_at
    updated_at
  }
`;

// Fragment for registration fields
const EVENT_REGISTRATION_FIELDS = gql`
  fragment MutationEventRegistrationFields on EventRegistration {
    id
    event_id
    user_id
    seats_reserved
    price
    discount
    status
    request_at
    approved_at
    paid_at
    confirmed_at
    cancelled_at
    created_at
    updated_at
    has_reviewed
    event {
      ...MutationRegistrationEventFields
    }
    user {
      id
      email
      name
      image
    }
  }
  ${REGISTRATION_EVENT_FIELDS}
`;

export const REGISTER_FOR_EVENT_MUTATION = gql`
  mutation RegisterForEvent($input: RegisterForEventInput!) {
    registerForEvent(input: $input) {
      success
      error
      registration {
        ...MutationEventRegistrationFields
      }
    }
  }
  ${EVENT_REGISTRATION_FIELDS}
`;
