"use client";

import { useCallback } from "react";

import { useAdminGetPresignedUploadUrlMutation } from "@/graphql/generated/graphql";
import type {
  GetPresignedUploadUrlInput,
  PresignedUploadUrlResponse,
} from "@/graphql/generated/types";

// ============ GET PRESIGNED UPLOAD URL ============

type GetPresignedUploadUrlResult =
  | { success: true; data: PresignedUploadUrlResponse }
  | { success: false; error: string };

interface UseAdminGetPresignedUploadUrlReturn {
  mutate: (
    input: GetPresignedUploadUrlInput,
  ) => Promise<GetPresignedUploadUrlResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminGetPresignedUploadUrl(): UseAdminGetPresignedUploadUrlReturn {
  const [graphqlMutate, { loading, error }] =
    useAdminGetPresignedUploadUrlMutation();

  const mutate = useCallback(
    async (
      input: GetPresignedUploadUrlInput,
    ): Promise<GetPresignedUploadUrlResult> => {
      try {
        const { data } = await graphqlMutate({ variables: { input } });
        if (data?.adminGetPresignedUploadUrl) {
          return { success: true, data: data.adminGetPresignedUploadUrl };
        }
        return { success: false, error: "Failed to get upload URL" };
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
