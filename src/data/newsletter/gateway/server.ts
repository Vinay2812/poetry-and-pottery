"use server";

import { isGraphQL } from "@/consts/env";

import type { NewsletterStatus } from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

// Result types for gateway functions
export type NewsletterStatusResult = {
  isSubscribed: boolean;
  subscribedAt: Date | string | null;
};

export type NewsletterMutationResult =
  | { success: true; status?: NewsletterStatus }
  | { success: false; error: string };

export async function getNewsletterSubscriptionStatus(): Promise<NewsletterStatusResult> {
  try {
    if (isGraphQL) {
      const status = await graphqlImpl.getNewsletterStatus();
      return {
        isSubscribed: status.subscribed,
        subscribedAt: status.subscribed_at ?? null,
      };
    }
    const status = await actionImpl.getNewsletterStatus();
    return {
      isSubscribed: status.subscribed,
      subscribedAt: status.subscribed_at ?? null,
    };
  } catch (error) {
    console.error("Failed to get newsletter status:", error);
    return { isSubscribed: false, subscribedAt: null };
  }
}

export async function subscribeToNewsletter(): Promise<NewsletterMutationResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.subscribeToNewsletter();
      if (result.success) {
        return { success: true, status: result.status ?? undefined };
      }
      return { success: false, error: result.error ?? "Failed to subscribe" };
    }
    const result = await actionImpl.subscribeToNewsletter();
    if (result.success) {
      return { success: true, status: result.status ?? undefined };
    }
    return { success: false, error: result.error ?? "Failed to subscribe" };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to subscribe",
    };
  }
}

export async function unsubscribeFromNewsletter(): Promise<NewsletterMutationResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.unsubscribeFromNewsletter();
      if (result.success) {
        return { success: true, status: result.status ?? undefined };
      }
      return { success: false, error: result.error ?? "Failed to unsubscribe" };
    }
    const result = await actionImpl.unsubscribeFromNewsletter();
    if (result.success) {
      return { success: true, status: result.status ?? undefined };
    }
    return { success: false, error: result.error ?? "Failed to unsubscribe" };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to unsubscribe",
    };
  }
}
