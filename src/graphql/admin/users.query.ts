import { gql } from "@apollo/client";

export const ADMIN_USERS_QUERY = gql`
  query AdminUsers($filter: AdminUsersFilterInput) {
    adminUsers(filter: $filter) {
      users {
        id
        auth_id
        email
        name
        image
        phone
        role
        created_at
        _count {
          product_orders
          event_registrations
        }
        pendingOrdersCount
        pendingRegistrationsCount
      }
      total
      page
      limit
      totalPages
    }
  }
`;

export const ADMIN_USER_BY_ID_QUERY = gql`
  query AdminUserById($id: Int!) {
    adminUserById(id: $id) {
      id
      auth_id
      email
      name
      image
      phone
      role
      created_at
      updated_at
      _count {
        product_orders
        event_registrations
        wishlists
        carts
        reviews
      }
    }
  }
`;

export const ADMIN_USER_ORDERS_QUERY = gql`
  query AdminUserOrders($userId: Int!) {
    adminUserOrders(userId: $userId) {
      id
      status
      total
      subtotal
      discount
      shipping_fee
      created_at
      request_at
      approved_at
      paid_at
      shipped_at
      delivered_at
      cancelled_at
      returned_at
      refunded_at
      ordered_products {
        id
        quantity
        price
        discount
        product {
          id
          name
          slug
          image_urls
        }
      }
    }
  }
`;

export const ADMIN_USER_REGISTRATIONS_QUERY = gql`
  query AdminUserRegistrations($userId: Int!) {
    adminUserRegistrations(userId: $userId) {
      id
      status
      seats_reserved
      price
      discount
      created_at
      request_at
      approved_at
      paid_at
      confirmed_at
      cancelled_at
      event {
        id
        title
        slug
        starts_at
        ends_at
        location
        image
        price
      }
    }
  }
`;

export const ADMIN_USER_CART_QUERY = gql`
  query AdminUserCart($userId: Int!) {
    adminUserCart(userId: $userId) {
      id
      quantity
      created_at
      product {
        id
        name
        slug
        price
        available_quantity
        image_urls
      }
    }
  }
`;

export const ADMIN_USER_WISHLIST_QUERY = gql`
  query AdminUserWishlist($userId: Int!, $page: Int, $limit: Int) {
    adminUserWishlist(userId: $userId, page: $page, limit: $limit) {
      data {
        id
        created_at
        product {
          id
          name
          slug
          price
          available_quantity
          image_urls
        }
      }
      total
      page
      totalPages
    }
  }
`;
