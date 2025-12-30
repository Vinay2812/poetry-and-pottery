import { gql } from "@apollo/client";

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      success
      error
      order {
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
  }
`;

export const CANCEL_ORDER_MUTATION = gql`
  mutation CancelOrder($orderId: String!) {
    cancelOrder(orderId: $orderId) {
      success
      error
      order {
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
  }
`;
