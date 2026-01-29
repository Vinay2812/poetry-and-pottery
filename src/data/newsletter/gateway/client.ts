"use client";

import { useCallback } from "react";

import type { NewsletterStatus } from "@/graphql/generated/graphql";
import {
  useSubscribeToNewsletterMutation as useSubscribeToNewsletterGraphQL,
  useUnsubscribeFromNewsletterMutation as useUnsubscribeFromNewsletterGraphQL,
} from "@/graphql/generated/graphql";

// Result types
export type NewsletterMutationResult =
  | { success: true; status: NewsletterStatus }
  | { success: false; error: string };

// Hook return types
interface UseSubscribeToNewsletterReturn {
  mutate: () => Promise<NewsletterMutationResult>;
  loading: boolean;
  error: Error | undefined;
}

interface UseUnsubscribeFromNewsletterReturn {
  mutate: () => Promise<NewsletterMutationResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useSubscribeToNewsletter(): UseSubscribeToNewsletterReturn {
  const [graphqlMutate, { loading, error }] = useSubscribeToNewsletterGraphQL();

  const mutate = useCallback(async (): Promise<NewsletterMutationResult> => {
    try {
      const { data } = await graphqlMutate();
      if (
        data?.subscribeToNewsletter.success &&
        data.subscribeToNewsletter.status
      ) {
        return { success: true, status: data.subscribeToNewsletter.status };
      }
      return {
        success: false,
        error: data?.subscribeToNewsletter.error ?? "Failed to subscribe",
      };
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : "Unknown error",
      };
    }
  }, [graphqlMutate]);

  return { mutate, loading, error };
}

export function useUnsubscribeFromNewsletter(): UseUnsubscribeFromNewsletterReturn {
  const [graphqlMutate, { loading, error }] =
    useUnsubscribeFromNewsletterGraphQL();

  const mutate = useCallback(async (): Promise<NewsletterMutationResult> => {
    try {
      const { data } = await graphqlMutate();
      if (
        data?.unsubscribeFromNewsletter.success &&
        data.unsubscribeFromNewsletter.status
      ) {
        return {
          success: true,
          status: data.unsubscribeFromNewsletter.status,
        };
      }
      return {
        success: false,
        error: data?.unsubscribeFromNewsletter.error ?? "Failed to unsubscribe",
      };
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : "Unknown error",
      };
    }
  }, [graphqlMutate]);

  return { mutate, loading, error };
}
