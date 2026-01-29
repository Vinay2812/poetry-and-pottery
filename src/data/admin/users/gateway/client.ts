"use client";

import { useCallback } from "react";

import { useAdminUpdateUserRoleMutation } from "@/graphql/generated/graphql";
import type { AdminUserMutationResponse } from "@/graphql/generated/types";

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
  const [graphqlMutate, { loading, error }] = useAdminUpdateUserRoleMutation();

  const mutate = useCallback(
    async (userId: number, role: string): Promise<UpdateUserRoleResult> => {
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
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}
