import { gql } from "@apollo/client";

export const WISHLIST_QUERY = gql`
  query Wishlist($filter: WishlistFilterInput) {
    wishlist(filter: $filter) {
      data {
        id
        user_id
        product_id
        created_at
        updated_at
        product {
          id
          slug
          name
          price
          image_urls
          reviews_count
          avg_rating
          material
          in_wishlist
          is_active
          available_quantity
          total_quantity
          color_code
          color_name
          collection {
            id
            slug
            name
            description
            image_url
            starts_at
            ends_at
            created_at
            updated_at
            products_count
          }
        }
      }
      total
      page
      total_pages
    }
  }
`;

export const WISHLIST_IDS_QUERY = gql`
  query WishlistIds {
    wishlistIds
  }
`;
