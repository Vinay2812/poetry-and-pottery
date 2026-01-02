"use server";

import { getClient } from "@/lib/apollo";

import {
  ADMIN_DASHBOARD_STATS_QUERY,
  ADMIN_LOW_STOCK_PRODUCTS_QUERY,
  ADMIN_NEWSLETTER_SUBSCRIBERS_QUERY,
  ADMIN_RECENT_ORDERS_QUERY,
  ADMIN_RECENT_REGISTRATIONS_QUERY,
  ADMIN_UPCOMING_EVENTS_QUERY,
} from "@/graphql/admin/analytics.query";
import type {
  AdminDashboardStatsQuery,
  AdminLowStockProductsQuery,
  AdminLowStockProductsQueryVariables,
  AdminNewsletterSubscribersQuery,
  AdminNewsletterSubscribersQueryVariables,
  AdminRecentOrdersQuery,
  AdminRecentOrdersQueryVariables,
  AdminRecentRegistrationsQuery,
  AdminRecentRegistrationsQueryVariables,
  AdminUpcomingEventsQuery,
  AdminUpcomingEventsQueryVariables,
  DashboardStats,
  LowStockProduct,
  NewsletterSubscriber,
  RecentOrder,
  RecentRegistration,
  UpcomingEvent,
} from "@/graphql/generated/types";

export async function getDashboardStats(): Promise<DashboardStats> {
  const client = getClient();

  const result = await client.query<AdminDashboardStatsQuery>({
    query: ADMIN_DASHBOARD_STATS_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminDashboardStats;
}

export async function getRecentOrders(limit = 5): Promise<RecentOrder[]> {
  const client = getClient();

  const result = await client.query<
    AdminRecentOrdersQuery,
    AdminRecentOrdersQueryVariables
  >({
    query: ADMIN_RECENT_ORDERS_QUERY,
    variables: { limit },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminRecentOrders;
}

export async function getRecentRegistrations(
  limit = 5,
): Promise<RecentRegistration[]> {
  const client = getClient();

  const result = await client.query<
    AdminRecentRegistrationsQuery,
    AdminRecentRegistrationsQueryVariables
  >({
    query: ADMIN_RECENT_REGISTRATIONS_QUERY,
    variables: { limit },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminRecentRegistrations;
}

export async function getLowStockProducts(
  limit = 10,
): Promise<LowStockProduct[]> {
  const client = getClient();

  const result = await client.query<
    AdminLowStockProductsQuery,
    AdminLowStockProductsQueryVariables
  >({
    query: ADMIN_LOW_STOCK_PRODUCTS_QUERY,
    variables: { limit },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminLowStockProducts;
}

export async function getUpcomingEvents(limit = 5): Promise<UpcomingEvent[]> {
  const client = getClient();

  const result = await client.query<
    AdminUpcomingEventsQuery,
    AdminUpcomingEventsQueryVariables
  >({
    query: ADMIN_UPCOMING_EVENTS_QUERY,
    variables: { limit },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpcomingEvents;
}

export async function getNewsletterSubscribers(
  limit = 10,
): Promise<NewsletterSubscriber[]> {
  const client = getClient();

  const result = await client.query<
    AdminNewsletterSubscribersQuery,
    AdminNewsletterSubscribersQueryVariables
  >({
    query: ADMIN_NEWSLETTER_SUBSCRIBERS_QUERY,
    variables: { limit },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminNewsletterSubscribers;
}
