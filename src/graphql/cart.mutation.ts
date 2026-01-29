import { gql } from "@apollo/client";

export const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      success
      item {
        id
        user_id
        product_id
        quantity
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
        }
      }
    }
  }
`;

export const UPDATE_CART_QUANTITY_MUTATION = gql`
  mutation UpdateCartQuantity($input: UpdateCartQuantityInput!) {
    updateCartQuantity(input: $input) {
      success
      item {
        id
        user_id
        product_id
        quantity
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
        }
      }
    }
  }
`;

export const REMOVE_FROM_CART_MUTATION = gql`
  mutation RemoveFromCart($productId: Int!) {
    removeFromCart(productId: $productId)
  }
`;

export const CLEAR_CART_MUTATION = gql`
  mutation ClearCart {
    clearCart
  }
`;
