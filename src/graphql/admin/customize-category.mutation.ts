import { gql } from "@apollo/client";

export const ADMIN_CREATE_CUSTOMIZE_CATEGORY_MUTATION = gql`
  mutation AdminCreateCustomizeCategory($input: CreateCustomizeCategoryInput!) {
    adminCreateCustomizeCategory(input: $input) {
      success
      categoryId
      error
    }
  }
`;

export const ADMIN_UPDATE_CUSTOMIZE_CATEGORY_MUTATION = gql`
  mutation AdminUpdateCustomizeCategory(
    $id: Int!
    $input: UpdateCustomizeCategoryInput!
  ) {
    adminUpdateCustomizeCategory(id: $id, input: $input) {
      success
      categoryId
      error
    }
  }
`;

export const ADMIN_DELETE_CUSTOMIZE_CATEGORY_MUTATION = gql`
  mutation AdminDeleteCustomizeCategory($id: Int!) {
    adminDeleteCustomizeCategory(id: $id) {
      success
      categoryId
      error
    }
  }
`;

export const ADMIN_TOGGLE_CUSTOMIZE_CATEGORY_ACTIVE_MUTATION = gql`
  mutation AdminToggleCustomizeCategoryActive($id: Int!) {
    adminToggleCustomizeCategoryActive(id: $id) {
      success
      categoryId
      error
    }
  }
`;
