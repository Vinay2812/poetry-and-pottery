import { gql } from "@apollo/client";

export const ADMIN_CREATE_EVENT_MUTATION = gql`
  mutation AdminCreateEvent($input: CreateEventInput!) {
    adminCreateEvent(input: $input) {
      success
      eventId
      error
    }
  }
`;

export const ADMIN_UPDATE_EVENT_MUTATION = gql`
  mutation AdminUpdateEvent($id: String!, $input: UpdateEventInput!) {
    adminUpdateEvent(id: $id, input: $input) {
      success
      eventId
      error
    }
  }
`;

export const ADMIN_DELETE_EVENT_MUTATION = gql`
  mutation AdminDeleteEvent($id: String!) {
    adminDeleteEvent(id: $id) {
      success
      eventId
      error
    }
  }
`;

export const ADMIN_UPDATE_EVENT_STATUS_MUTATION = gql`
  mutation AdminUpdateEventStatus($id: String!, $status: String!) {
    adminUpdateEventStatus(id: $id, status: $status) {
      success
      eventId
      error
    }
  }
`;

export const ADMIN_BULK_DELETE_EVENTS_MUTATION = gql`
  mutation AdminBulkDeleteEvents($input: BulkDeleteEventsInput!) {
    adminBulkDeleteEvents(input: $input) {
      success
      totalRequested
      deletedCount
      cancelledCount
      failedCount
      results {
        id
        success
        action
        error
      }
      error
    }
  }
`;
