import { gql } from "@apollo/client";

export const ORDERS_QUERY = gql`
  query Orders($filter: OrdersFilterInput) {
    orders(filter: $filter) {
      data {
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
          custom_data {
            options {
              type
              optionId
              name
              value
              priceModifier
            }
            totalModifier
          }
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
      total
      page
      total_pages
    }
  }
`;

export const ORDER_QUERY = gql`
  query Order($id: String!) {
    order(id: $id) {
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
        custom_data {
          options {
            type
            optionId
            name
            value
            priceModifier
          }
          totalModifier
        }
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
