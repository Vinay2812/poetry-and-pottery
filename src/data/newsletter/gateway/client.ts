"use client";

import { isGraphQL } from "@/consts/env";
import { useCallback, useState } from "react";

import type { NewsletterStatus } from "@/graphql/generated/graphql";
import {
  useSubscribeToNewsletterMutation as useSubscribeToNewsletterGraphQL,
  useUnsubscribeFromNewsletterMutation as useUnsubscribeFromNewsletterGraphQL,
} from "@/graphql/generated/graphql";

import {
  subscribeToNewsletter as subscribeToNewsletterAction,
  unsubscribeFromNewsletter as unsubscribeFromNewsletterAction,
} from "../server/action";

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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useSubscribeToNewsletterGraphQL();

  const mutate = useCallback(async (): Promise<NewsletterMutationResult> => {
    if (isGraphQL) {
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
    } else {
      setActionLoading(true);
      setActionError(undefined);
      try {
        const result = await subscribeToNewsletterAction();
        if (result.success && result.status) {
          return { success: true, status: result.status };
        }
        return {
          success: false,
          error: result.error ?? "Failed to subscribe",
        };
      } catch (e) {
        const error = e instanceof Error ? e : new Error("Unknown error");
        setActionError(error);
        return { success: false, error: error.message };
      } finally {
        setActionLoading(false);
      }
    }
  }, [graphqlMutate]);

  return {
    mutate,
    loading: isGraphQL ? graphqlLoading : actionLoading,
    error: isGraphQL ? graphqlError : actionError,
  };
}

export function useUnsubscribeFromNewsletter(): UseUnsubscribeFromNewsletterReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useUnsubscribeFromNewsletterGraphQL();

  const mutate = useCallback(async (): Promise<NewsletterMutationResult> => {
    if (isGraphQL) {
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
          error:
            data?.unsubscribeFromNewsletter.error ?? "Failed to unsubscribe",
        };
      } catch (e) {
        return {
          success: false,
          error: e instanceof Error ? e.message : "Unknown error",
        };
      }
    } else {
      setActionLoading(true);
      setActionError(undefined);
      try {
        const result = await unsubscribeFromNewsletterAction();
        if (result.success && result.status) {
          return { success: true, status: result.status };
        }
        return {
          success: false,
          error: result.error ?? "Failed to unsubscribe",
        };
      } catch (e) {
        const error = e instanceof Error ? e : new Error("Unknown error");
        setActionError(error);
        return { success: false, error: error.message };
      } finally {
        setActionLoading(false);
      }
    }
  }, [graphqlMutate]);

  return {
    mutate,
    loading: isGraphQL ? graphqlLoading : actionLoading,
    error: isGraphQL ? graphqlError : actionError,
  };
}
