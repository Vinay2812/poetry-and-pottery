"use client";

import { isGraphQL } from "@/consts/env";
import { useCallback, useState } from "react";

import { useAdminGetPresignedUploadUrlMutation } from "@/graphql/generated/graphql";
import type {
  GetPresignedUploadUrlInput,
  PresignedUploadUrlResponse,
} from "@/graphql/generated/types";

import * as actionImpl from "../server/action";

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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminGetPresignedUploadUrlMutation();

  const mutate = useCallback(
    async (
      input: GetPresignedUploadUrlInput,
    ): Promise<GetPresignedUploadUrlResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.getPresignedUploadUrl(input);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to get upload URL",
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
