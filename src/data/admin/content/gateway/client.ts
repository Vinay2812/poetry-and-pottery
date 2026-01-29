"use client";

import { useCallback } from "react";

import {
  useAdminToggleContentPageActiveMutation,
  useAdminUpdateContentPageMutation,
} from "@/graphql/generated/graphql";
import type { AdminContentMutationResponse } from "@/graphql/generated/types";

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
  const [graphqlMutate, { loading, error }] =
    useAdminUpdateContentPageMutation();

  const mutate = useCallback(
    async (slug: string, content: object): Promise<UpdateContentPageResult> => {
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
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
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
  const [graphqlMutate, { loading, error }] =
    useAdminToggleContentPageActiveMutation();

  const mutate = useCallback(
    async (slug: string): Promise<ToggleContentPageActiveResult> => {
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
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}
