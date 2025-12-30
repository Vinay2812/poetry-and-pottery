import { gql } from "@apollo/client";

export const ADD_TO_WISHLIST_MUTATION = gql`
  mutation AddToWishlist($productId: Int!) {
    addToWishlist(productId: $productId) {
      success
      item {
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
          available_quantity
          total_quantity
          color_code
          color_name
        }
      }
    }
  }
`;

export const REMOVE_FROM_WISHLIST_MUTATION = gql`
  mutation RemoveFromWishlist($productId: Int!) {
    removeFromWishlist(productId: $productId)
  }
`;

export const TOGGLE_WISHLIST_MUTATION = gql`
  mutation ToggleWishlist($productId: Int!) {
    toggleWishlist(productId: $productId) {
      success
      action
      item {
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
          available_quantity
          total_quantity
          color_code
          color_name
        }
      }
    }
  }
`;

export const MOVE_TO_CART_MUTATION = gql`
  mutation MoveToCart($productId: Int!) {
    moveToCart(productId: $productId)
  }
`;
