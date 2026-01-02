import { gql } from "@apollo/client";

export const ADMIN_UPDATE_REGISTRATION_STATUS_MUTATION = gql`
  mutation AdminUpdateRegistrationStatus(
    $registrationId: String!
    $status: String!
  ) {
    adminUpdateRegistrationStatus(
      registrationId: $registrationId
      status: $status
    ) {
      success
      error
    }
  }
`;

export const ADMIN_UPDATE_REGISTRATION_PRICE_MUTATION = gql`
  mutation AdminUpdateRegistrationPrice(
    $registrationId: String!
    $price: Float!
  ) {
    adminUpdateRegistrationPrice(
      registrationId: $registrationId
      price: $price
    ) {
      success
      error
    }
  }
`;

export const ADMIN_UPDATE_REGISTRATION_DETAILS_MUTATION = gql`
  mutation AdminUpdateRegistrationDetails(
    $registrationId: String!
    $input: UpdateRegistrationDetailsInput!
  ) {
    adminUpdateRegistrationDetails(
      registrationId: $registrationId
      input: $input
    ) {
      success
      error
    }
  }
`;
