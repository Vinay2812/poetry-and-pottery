"use server";

import * as graphqlImpl from "../server/graphql";

// Result types for gateway functions
export type NewsletterStatusResult = {
  isSubscribed: boolean;
  subscribedAt: Date | string | null;
};

export async function getNewsletterSubscriptionStatus(): Promise<NewsletterStatusResult> {
  try {
    const status = await graphqlImpl.getNewsletterStatus();
    return {
      isSubscribed: status.subscribed,
      subscribedAt: status.subscribed_at ?? null,
    };
  } catch (error) {
    console.error("Failed to get newsletter status:", error);
    return { isSubscribed: false, subscribedAt: null };
  }
}
