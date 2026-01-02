import { gql } from "@apollo/client";

export const ADMIN_UPDATE_CONTENT_PAGE_MUTATION = gql`
  mutation AdminUpdateContentPage(
    $slug: String!
    $input: UpdateContentPageInput!
  ) {
    adminUpdateContentPage(slug: $slug, input: $input) {
      success
      error
    }
  }
`;

export const ADMIN_TOGGLE_CONTENT_PAGE_ACTIVE_MUTATION = gql`
  mutation AdminToggleContentPageActive($slug: String!) {
    adminToggleContentPageActive(slug: $slug) {
      success
      error
    }
  }
`;
