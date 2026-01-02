import { gql } from "@apollo/client";

export const ADMIN_DASHBOARD_STATS_QUERY = gql`
  query AdminDashboardStats {
    adminDashboardStats {
      orders {
        total
        pending
        processing
      }
      registrations {
        total
        pending
      }
      products {
        total
        outOfStock
        lowStock
      }
      events {
        total
        upcoming
        upcomingIn7Days
      }
      users {
        total
        newThisMonth
      }
      revenue {
        totalOrders
        totalRegistrations
      }
      newsletter {
        totalSubscribers
        newThisMonth
      }
    }
  }
`;

export const ADMIN_RECENT_ORDERS_QUERY = gql`
  query AdminRecentOrders($limit: Int) {
    adminRecentOrders(limit: $limit) {
      id
      status
      total
      created_at
      user {
        name
        email
      }
    }
  }
`;

export const ADMIN_RECENT_REGISTRATIONS_QUERY = gql`
  query AdminRecentRegistrations($limit: Int) {
    adminRecentRegistrations(limit: $limit) {
      id
      status
      seats_reserved
      price
      created_at
      user {
        name
        email
      }
      event {
        title
      }
    }
  }
`;

export const ADMIN_LOW_STOCK_PRODUCTS_QUERY = gql`
  query AdminLowStockProducts($limit: Int) {
    adminLowStockProducts(limit: $limit) {
      id
      name
      slug
      available_quantity
      total_quantity
      price
    }
  }
`;

export const ADMIN_UPCOMING_EVENTS_QUERY = gql`
  query AdminUpcomingEvents($limit: Int) {
    adminUpcomingEvents(limit: $limit) {
      id
      title
      slug
      starts_at
      available_seats
      total_seats
      _count {
        event_registrations
      }
    }
  }
`;

export const ADMIN_NEWSLETTER_SUBSCRIBERS_QUERY = gql`
  query AdminNewsletterSubscribers($limit: Int) {
    adminNewsletterSubscribers(limit: $limit) {
      id
      email
      name
      image
      newsletter_subscribed_at
    }
  }
`;
