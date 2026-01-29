"use server";

import type {
  DashboardStats,
  LowStockProduct,
  NewsletterSubscriber,
  RecentOrder,
  RecentRegistration,
  UpcomingEvent,
} from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export async function getDashboardStats(): Promise<DashboardStats> {
  return graphqlImpl.getDashboardStats();
}

export async function getRecentOrders(limit = 5): Promise<RecentOrder[]> {
  return graphqlImpl.getRecentOrders(limit);
}

export async function getRecentRegistrations(
  limit = 5,
): Promise<RecentRegistration[]> {
  return graphqlImpl.getRecentRegistrations(limit);
}

export async function getLowStockProducts(
  limit = 10,
): Promise<LowStockProduct[]> {
  return graphqlImpl.getLowStockProducts(limit);
}

export async function getUpcomingEvents(limit = 5): Promise<UpcomingEvent[]> {
  return graphqlImpl.getUpcomingEvents(limit);
}

export async function getNewsletterSubscribers(
  limit = 10,
): Promise<NewsletterSubscriber[]> {
  return graphqlImpl.getNewsletterSubscribers(limit);
}
