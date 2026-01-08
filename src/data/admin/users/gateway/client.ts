"use client";

import { isGraphQL } from "@/consts/env";
import { useCallback, useState } from "react";

import { useAdminUpdateUserRoleMutation } from "@/graphql/generated/graphql";
import type { AdminUserMutationResponse } from "@/graphql/generated/types";

import * as actionImpl from "../server/action";

// ============ UPDATE USER ROLE ============

type UpdateUserRoleResult =
  | { success: true; data: AdminUserMutationResponse }
  | { success: false; error: string };

interface UseAdminUpdateUserRoleReturn {
  mutate: (userId: number, role: string) => Promise<UpdateUserRoleResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminUpdateUserRole(): UseAdminUpdateUserRoleReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminUpdateUserRoleMutation();

  const mutate = useCallback(
    async (userId: number, role: string): Promise<UpdateUserRoleResult> => {
      if (isGraphQL) {
        try {
          const { data } = await graphqlMutate({ variables: { userId, role } });
          if (data?.adminUpdateUserRole) {
            return { success: true, data: data.adminUpdateUserRole };
          }
          return { success: false, error: "Failed to update user role" };
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
          const result = await actionImpl.updateUserRole(userId, role);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to update user role",
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
