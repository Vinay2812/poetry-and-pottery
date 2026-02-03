import { gql } from "@apollo/client";

export const CREATE_PRODUCT_REVIEW_MUTATION = gql`
  mutation CreateProductReview($input: CreateProductReviewInput!) {
    createProductReview(input: $input) {
      success
      error
      review {
        id
        user_id
        rating
        review
        image_urls
        product_id
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
    }
  }
`;

export const CREATE_EVENT_REVIEW_MUTATION = gql`
  mutation CreateEventReview($input: CreateEventReviewInput!) {
    createEventReview(input: $input) {
      success
      error
      review {
        id
        user_id
        rating
        review
        image_urls
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
    }
  }
`;

export const TOGGLE_REVIEW_LIKE_MUTATION = gql`
  mutation ToggleReviewLike($reviewId: Int!) {
    toggleReviewLike(reviewId: $reviewId) {
      success
      action
      likes_count
      error
    }
  }
`;
