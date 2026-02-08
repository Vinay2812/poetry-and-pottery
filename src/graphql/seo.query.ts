import { gql } from "@apollo/client";

export const SITEMAP_PRODUCTS_QUERY = gql`
  query SitemapProducts($filter: ProductsFilterInput!) {
    products(filter: $filter) {
      products {
        id
        is_active
      }
      total_products
    }
  }
`;

export const SITEMAP_EVENTS_QUERY = gql`
  query SitemapEvents($filter: EventsFilterInput) {
    events(filter: $filter) {
      data {
        id
        status
        updated_at
      }
      total
    }
  }
`;
