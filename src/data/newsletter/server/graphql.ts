"use server";

import { getClient } from "@/lib/apollo";

import type {
  NewsletterMutationResponse,
  NewsletterStatus,
  NewsletterStatusQuery,
  SubscribeToNewsletterMutation,
} from "@/graphql/generated/types";
import { SUBSCRIBE_TO_NEWSLETTER_MUTATION } from "@/graphql/newsletter.mutation";
import { NEWSLETTER_STATUS_QUERY } from "@/graphql/newsletter.query";

export async function getNewsletterStatus(): Promise<NewsletterStatus> {
  const client = getClient();

  const result = await client.query<NewsletterStatusQuery>({
    query: NEWSLETTER_STATUS_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.newsletterStatus ?? { subscribed: false, subscribed_at: null }
  );
}

export async function subscribeToNewsletter(): Promise<NewsletterMutationResponse> {
  const client = getClient();

  const result = await client.mutate<SubscribeToNewsletterMutation>({
    mutation: SUBSCRIBE_TO_NEWSLETTER_MUTATION,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.subscribeToNewsletter ?? {
      success: false,
      error: "Unknown error",
    }
  );
}
