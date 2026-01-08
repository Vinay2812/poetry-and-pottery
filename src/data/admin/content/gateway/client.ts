"use client";

import { isGraphQL } from "@/consts/env";
import { useCallback, useState } from "react";

import {
  useAdminToggleContentPageActiveMutation,
  useAdminUpdateContentPageMutation,
} from "@/graphql/generated/graphql";
import type { AdminContentMutationResponse } from "@/graphql/generated/types";

import * as actionImpl from "../server/action";

// ============ UPDATE CONTENT PAGE ============

type UpdateContentPageResult =
  | { success: true; data: AdminContentMutationResponse }
  | { success: false; error: string };

interface UseAdminUpdateContentPageReturn {
  mutate: (slug: string, content: object) => Promise<UpdateContentPageResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminUpdateContentPage(): UseAdminUpdateContentPageReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminUpdateContentPageMutation();

  const mutate = useCallback(
    async (slug: string, content: object): Promise<UpdateContentPageResult> => {
      if (isGraphQL) {
        try {
          const { data } = await graphqlMutate({
            variables: { slug, input: { content } },
          });
          if (data?.adminUpdateContentPage) {
            return { success: true, data: data.adminUpdateContentPage };
          }
          return { success: false, error: "Failed to update content page" };
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
          const result = await actionImpl.updateContentPage(slug, content);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to update content page",
          };
        } catch (e) {
          const error = e instanceof Error ? e : new Error("Unknown error");
          setActionError(error);
          return { success: false, error: error.message };
        } finally {
          setActionLoading(false);
        }
      }
    },
    [graphqlMutate],
  );

  return {
    mutate,
    loading: isGraphQL ? graphqlLoading : actionLoading,
    error: isGraphQL ? graphqlError : actionError,
  };
}

// ============ TOGGLE CONTENT PAGE ACTIVE ============

type ToggleContentPageActiveResult =
  | { success: true; data: AdminContentMutationResponse }
  | { success: false; error: string };

interface UseAdminToggleContentPageActiveReturn {
  mutate: (slug: string) => Promise<ToggleContentPageActiveResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminToggleContentPageActive(): UseAdminToggleContentPageActiveReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminToggleContentPageActiveMutation();

  const mutate = useCallback(
    async (slug: string): Promise<ToggleContentPageActiveResult> => {
      if (isGraphQL) {
        try {
          const { data } = await graphqlMutate({ variables: { slug } });
          if (data?.adminToggleContentPageActive) {
            return { success: true, data: data.adminToggleContentPageActive };
          }
          return { success: false, error: "Failed to toggle content page" };
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
          const result = await actionImpl.toggleContentPageActive(slug);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to toggle content page",
          };
        } catch (e) {
          const error = e instanceof Error ? e : new Error("Unknown error");
          setActionError(error);
          return { success: false, error: error.message };
        } finally {
          setActionLoading(false);
        }
      }
    },
    [graphqlMutate],
  );

  return {
    mutate,
    loading: isGraphQL ? graphqlLoading : actionLoading,
    error: isGraphQL ? graphqlError : actionError,
  };
}
