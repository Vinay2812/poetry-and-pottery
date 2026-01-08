"use server";

import { isGraphQL } from "@/consts/env";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

// Result types for gateway functions
export type NewsletterStatusResult = {
  isSubscribed: boolean;
  subscribedAt: Date | string | null;
};

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
