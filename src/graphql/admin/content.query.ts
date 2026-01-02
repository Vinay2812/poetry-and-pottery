import { gql } from "@apollo/client";

export const ADMIN_CONTENT_PAGES_QUERY = gql`
  query AdminContentPages {
    adminContentPages {
      slug
      title
      is_active
      updated_at
    }
  }
`;

export const ADMIN_CONTENT_PAGE_BY_SLUG_QUERY = gql`
  query AdminContentPageBySlug($slug: String!) {
    adminContentPageBySlug(slug: $slug) {
      id
      slug
      title
      content
      is_active
      created_at
      updated_at
    }
  }
`;
