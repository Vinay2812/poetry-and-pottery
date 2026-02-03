import { gql } from "@apollo/client";

export const PRODUCT_REVIEWS_QUERY = gql`
  query ProductReviews($productId: Int!, $filter: ReviewsFilterInput) {
    productReviews(productId: $productId, filter: $filter) {
      data {
        id
        user_id
        rating
        review
        image_urls
        product_id
        event_id
        created_at
        updated_at
        user {
          id
          name
          image
        }
        likes {
          id
          user_id
        }
        likes_count
        is_liked_by_current_user
      }
      total
      page
      total_pages
    }
  }
`;

export const EVENT_REVIEWS_QUERY = gql`
  query EventReviews($eventId: String!, $filter: ReviewsFilterInput) {
    eventReviews(eventId: $eventId, filter: $filter) {
      data {
        id
        user_id
        rating
        review
        image_urls
        product_id
        event_id
        created_at
        updated_at
        user {
          id
          name
          image
        }
        likes {
          id
          user_id
        }
        likes_count
        is_liked_by_current_user
      }
      total
      page
      total_pages
    }
  }
`;
