import { gql } from "@apollo/client";

export const ADMIN_CREATE_CUSTOMIZATION_OPTION_MUTATION = gql`
  mutation AdminCreateCustomizationOption(
    $input: CreateCustomizationOptionInput!
  ) {
    adminCreateCustomizationOption(input: $input) {
      success
      optionId
      error
    }
  }
`;

export const ADMIN_UPDATE_CUSTOMIZATION_OPTION_MUTATION = gql`
  mutation AdminUpdateCustomizationOption(
    $id: Int!
    $input: UpdateCustomizationOptionInput!
  ) {
    adminUpdateCustomizationOption(id: $id, input: $input) {
      success
      optionId
      error
    }
  }
`;

export const ADMIN_DELETE_CUSTOMIZATION_OPTION_MUTATION = gql`
  mutation AdminDeleteCustomizationOption($id: Int!) {
    adminDeleteCustomizationOption(id: $id) {
      success
      optionId
      error
    }
  }
`;

export const ADMIN_TOGGLE_CUSTOMIZATION_OPTION_ACTIVE_MUTATION = gql`
  mutation AdminToggleCustomizationOptionActive($id: Int!) {
    adminToggleCustomizationOptionActive(id: $id) {
      success
      optionId
      error
    }
  }
`;
