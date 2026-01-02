import { gql } from "@apollo/client";

export const GLOBAL_SEARCH_QUERY = gql`
  query GlobalSearch($input: GlobalSearchInput!) {
    globalSearch(input: $input) {
      products {
        id
        slug
        name
        image_urls
        price
        reviews_count
        avg_rating
        material
        total_quantity
        available_quantity
        color_code
        color_name
        in_wishlist
      }
      events {
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
      orders {
        id
        user_id
        user {
          id
          email
          name
        }
        shipping_fee
        subtotal
        discount
        total
        status
        request_at
        approved_at
        paid_at
        shipped_at
        delivered_at
        cancelled_at
        returned_at
        refunded_at
        shipping_address
        created_at
        updated_at
        ordered_products {
          id
          order_id
          product_id
          quantity
          discount
          price
          created_at
          updated_at
          has_reviewed
          product {
            id
            slug
            name
            image_urls
            price
            reviews_count
            avg_rating
            material
            total_quantity
            available_quantity
            color_code
            color_name
            in_wishlist
          }
        }
      }
      counts {
        products
        events
        orders
      }
    }
  }
`;
