"use server";

import { isGraphQL } from "@/consts/env";

import type {
  DashboardStats,
  LowStockProduct,
  NewsletterSubscriber,
  RecentOrder,
  RecentRegistration,
  UpcomingEvent,
} from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

export async function getDashboardStats(): Promise<DashboardStats> {
  if (isGraphQL) {
    return graphqlImpl.getDashboardStats();
  }
  return actionImpl.getDashboardStats() as Promise<DashboardStats>;
}

export async function getRecentOrders(limit = 5): Promise<RecentOrder[]> {
  if (isGraphQL) {
    return graphqlImpl.getRecentOrders(limit);
  }
  return actionImpl.getRecentOrders(limit) as Promise<RecentOrder[]>;
}

export async function getRecentRegistrations(
  limit = 5,
): Promise<RecentRegistration[]> {
  if (isGraphQL) {
    return graphqlImpl.getRecentRegistrations(limit);
  }
  return actionImpl.getRecentRegistrations(limit) as Promise<
    RecentRegistration[]
  >;
}

export async function getLowStockProducts(
  limit = 10,
): Promise<LowStockProduct[]> {
  if (isGraphQL) {
    return graphqlImpl.getLowStockProducts(limit);
  }
  return actionImpl.getLowStockProducts(limit) as Promise<LowStockProduct[]>;
}

export async function getUpcomingEvents(limit = 5): Promise<UpcomingEvent[]> {
  if (isGraphQL) {
    return graphqlImpl.getUpcomingEvents(limit);
  }
  return actionImpl.getUpcomingEvents(limit) as Promise<UpcomingEvent[]>;
}

export async function getNewsletterSubscribers(
  limit = 10,
): Promise<NewsletterSubscriber[]> {
  if (isGraphQL) {
    return graphqlImpl.getNewsletterSubscribers(limit);
  }
  return actionImpl.getNewsletterSubscribers(limit) as Promise<
    NewsletterSubscriber[]
  >;
}
