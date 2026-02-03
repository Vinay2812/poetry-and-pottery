import { gql } from "@apollo/client";

export const ADMIN_UPDATE_ORDER_STATUS_MUTATION = gql`
  mutation AdminUpdateOrderStatus($orderId: String!, $status: String!) {
    adminUpdateOrderStatus(orderId: $orderId, status: $status) {
      success
      error
    }
  }
`;

export const ADMIN_UPDATE_ORDER_DISCOUNT_MUTATION = gql`
  mutation AdminUpdateOrderDiscount($orderId: String!, $discount: Float!) {
    adminUpdateOrderDiscount(orderId: $orderId, discount: $discount) {
      success
      error
    }
  }
`;

export const ADMIN_UPDATE_ORDER_ITEM_DISCOUNT_MUTATION = gql`
  mutation AdminUpdateOrderItemDiscount($itemId: Int!, $discount: Float!) {
    adminUpdateOrderItemDiscount(itemId: $itemId, discount: $discount) {
      success
      error
    }
  }
`;

export const ADMIN_UPDATE_ORDER_ITEM_QUANTITY_MUTATION = gql`
  mutation AdminUpdateOrderItemQuantity($itemId: Int!, $quantity: Int!) {
    adminUpdateOrderItemQuantity(itemId: $itemId, quantity: $quantity) {
      success
      error
    }
  }
`;
