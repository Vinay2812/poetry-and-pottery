import { gql } from "@apollo/client";

// Fragment for event base fields
const EVENT_BASE_FIELDS = gql`
  fragment EventBaseFields on EventBase {
    id
    slug
    title
    description
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
    created_at
    updated_at
    registrations_count
    reviews_count
    avg_rating
  }
`;

// Fragment for event detail fields (includes reviews)
const EVENT_DETAIL_FIELDS = gql`
  fragment EventDetailFields on EventDetail {
    id
    slug
    title
    description
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
    created_at
    updated_at
    registrations_count
    reviews_count
    avg_rating
    is_registered
    reviews {
      id
      user_id
      rating
      review
      image_urls
      event_id
      created_at
      updated_at
      user {
        id
        email
        name
        image
      }
      likes {
        id
        review_id
        user_id
      }
    }
  }
`;

// Fragment for registration event fields
const REGISTRATION_EVENT_FIELDS = gql`
  fragment RegistrationEventFields on RegistrationEvent {
    id
    slug
    title
    description
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
    created_at
    updated_at
  }
`;

// Fragment for registration fields
const EVENT_REGISTRATION_FIELDS = gql`
  fragment EventRegistrationFields on EventRegistration {
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
      ...RegistrationEventFields
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

export const EVENTS_QUERY = gql`
  query Events($filter: EventsFilterInput) {
    events(filter: $filter) {
      data {
        ...EventBaseFields
      }
      total
      page
      total_pages
      levels
    }
  }
  ${EVENT_BASE_FIELDS}
`;

export const EVENT_BY_SLUG_QUERY = gql`
  query EventBySlug($slug: String!) {
    eventBySlug(slug: $slug) {
      ...EventDetailFields
    }
  }
  ${EVENT_DETAIL_FIELDS}
`;

export const EVENT_BY_ID_QUERY = gql`
  query EventById($id: String!) {
    eventById(id: $id) {
      ...EventDetailFields
    }
  }
  ${EVENT_DETAIL_FIELDS}
`;

export const UPCOMING_EVENTS_QUERY = gql`
  query UpcomingEvents($filter: EventsFilterInput) {
    upcomingEvents(filter: $filter) {
      data {
        ...EventBaseFields
      }
      total
      page
      total_pages
      levels
    }
  }
  ${EVENT_BASE_FIELDS}
`;

export const PAST_EVENTS_QUERY = gql`
  query PastEvents($filter: EventsFilterInput) {
    pastEvents(filter: $filter) {
      data {
        ...EventBaseFields
      }
      total
      page
      total_pages
      levels
    }
  }
  ${EVENT_BASE_FIELDS}
`;

export const EVENT_WITH_USER_CONTEXT_QUERY = gql`
  query EventWithUserContext($eventId: String!) {
    eventWithUserContext(eventId: $eventId) {
      event {
        ...EventDetailFields
      }
      registration {
        ...EventRegistrationFields
      }
      is_past_event
      current_user_id
    }
  }
  ${EVENT_DETAIL_FIELDS}
  ${EVENT_REGISTRATION_FIELDS}
`;

export const USER_REGISTRATIONS_QUERY = gql`
  query UserRegistrations($filter: RegistrationsFilterInput) {
    userRegistrations(filter: $filter) {
      data {
        ...EventRegistrationFields
      }
      total
      page
      total_pages
    }
  }
  ${EVENT_REGISTRATION_FIELDS}
`;

export const REGISTRATION_BY_ID_QUERY = gql`
  query RegistrationById($registrationId: String!) {
    registrationById(registrationId: $registrationId) {
      ...EventRegistrationFields
    }
  }
  ${EVENT_REGISTRATION_FIELDS}
`;

export const UPCOMING_REGISTRATIONS_QUERY = gql`
  query UpcomingRegistrations($filter: RegistrationsFilterInput) {
    upcomingRegistrations(filter: $filter) {
      data {
        ...EventRegistrationFields
      }
      total
      page
      total_pages
    }
  }
  ${EVENT_REGISTRATION_FIELDS}
`;

export const COMPLETED_REGISTRATIONS_QUERY = gql`
  query CompletedRegistrations($filter: RegistrationsFilterInput) {
    completedRegistrations(filter: $filter) {
      data {
        ...EventRegistrationFields
      }
      total
      page
      total_pages
    }
  }
  ${EVENT_REGISTRATION_FIELDS}
`;
