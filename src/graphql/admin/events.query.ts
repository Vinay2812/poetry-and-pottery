import { gql } from "@apollo/client";

export const ADMIN_EVENTS_QUERY = gql`
  query AdminEvents($filter: AdminEventsFilterInput) {
    adminEvents(filter: $filter) {
      events {
        id
        title
        slug
        description
        event_type
        status
        level
        starts_at
        ends_at
        location
        price
        available_seats
        total_seats
        instructor
        image
        performers
        lineup_notes
        created_at
        _count {
          event_registrations
          reviews
        }
      }
      total
      page
      limit
      totalPages
    }
  }
`;

export const ADMIN_EVENT_BY_ID_QUERY = gql`
  query AdminEventById($id: String!) {
    adminEventById(id: $id) {
      id
      title
      slug
      description
      event_type
      status
      level
      starts_at
      ends_at
      location
      full_location
      instructor
      includes
      price
      available_seats
      total_seats
      image
      highlights
      gallery
      performers
      lineup_notes
      created_at
      updated_at
      _count {
        event_registrations
        reviews
      }
    }
  }
`;

export const ADMIN_EVENT_REGISTRATIONS_QUERY = gql`
  query AdminEventRegistrations($eventId: String!) {
    adminEventRegistrations(eventId: $eventId) {
      registrations {
        id
        status
        seats_reserved
        price
        discount
        created_at
        request_at
        approved_at
        paid_at
        confirmed_at
        cancelled_at
        user {
          id
          name
          email
          phone
          image
        }
      }
      total
      statusCounts {
        PENDING
        APPROVED
        REJECTED
        PAID
        CONFIRMED
        CANCELLED
      }
    }
  }
`;

export const ADMIN_EVENT_REVIEWS_QUERY = gql`
  query AdminEventReviews($eventId: String!) {
    adminEventReviews(eventId: $eventId) {
      reviews {
        id
        rating
        review
        image_urls
        created_at
        user {
          id
          name
          email
          image
        }
      }
      total
      averageRating
    }
  }
`;

export const ADMIN_EVENT_STATUS_OPTIONS_QUERY = gql`
  query AdminEventStatusOptions {
    adminEventStatusOptions {
      value
      label
    }
  }
`;

export const ADMIN_EVENT_LEVEL_OPTIONS_QUERY = gql`
  query AdminEventLevelOptions {
    adminEventLevelOptions {
      value
      label
    }
  }
`;
