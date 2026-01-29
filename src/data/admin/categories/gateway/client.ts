"use client";

import { useCallback } from "react";

import {
  useAdminAddCategoryMutation,
  useAdminDeleteCategoryMutation,
  useAdminRenameCategoryMutation,
  useAdminUpdateCategoryIconMutation,
} from "@/graphql/generated/graphql";
import type { AdminCategoryMutationResponse } from "@/graphql/generated/types";

// ============ UPDATE CATEGORY ICON ============

type UpdateCategoryIconResult =
  | { success: true; data: AdminCategoryMutationResponse }
  | { success: false; error: string };

interface UseAdminUpdateCategoryIconReturn {
  mutate: (
    categoryName: string,
    icon: string,
  ) => Promise<UpdateCategoryIconResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminUpdateCategoryIcon(): UseAdminUpdateCategoryIconReturn {
  const [graphqlMutate, { loading, error }] =
    useAdminUpdateCategoryIconMutation();

  const mutate = useCallback(
    async (
      categoryName: string,
      icon: string,
    ): Promise<UpdateCategoryIconResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: { category: categoryName, icon },
        });
        if (data?.adminUpdateCategoryIcon) {
          return { success: true, data: data.adminUpdateCategoryIcon };
        }
        return { success: false, error: "Failed to update category icon" };
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

// ============ ADD CATEGORY ============

type AddCategoryResult =
  | { success: true; data: AdminCategoryMutationResponse }
  | { success: false; error: string };

interface UseAdminAddCategoryReturn {
  mutate: (name: string, icon?: string) => Promise<AddCategoryResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminAddCategory(): UseAdminAddCategoryReturn {
  const [graphqlMutate, { loading, error }] = useAdminAddCategoryMutation();

  const mutate = useCallback(
    async (name: string, icon: string = "tag"): Promise<AddCategoryResult> => {
      try {
        const { data } = await graphqlMutate({ variables: { name, icon } });
        if (data?.adminAddCategory) {
          return { success: true, data: data.adminAddCategory };
        }
        return { success: false, error: "Failed to add category" };
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

// ============ RENAME CATEGORY ============

type RenameCategoryResult =
  | { success: true; data: AdminCategoryMutationResponse }
  | { success: false; error: string };

interface UseAdminRenameCategoryReturn {
  mutate: (oldName: string, newName: string) => Promise<RenameCategoryResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminRenameCategory(): UseAdminRenameCategoryReturn {
  const [graphqlMutate, { loading, error }] = useAdminRenameCategoryMutation();

  const mutate = useCallback(
    async (oldName: string, newName: string): Promise<RenameCategoryResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: { oldName, newName },
        });
        if (data?.adminRenameCategory) {
          return { success: true, data: data.adminRenameCategory };
        }
        return { success: false, error: "Failed to rename category" };
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

// ============ DELETE CATEGORY ============

type DeleteCategoryResult =
  | { success: true; data: AdminCategoryMutationResponse }
  | { success: false; error: string };

interface UseAdminDeleteCategoryReturn {
  mutate: (name: string) => Promise<DeleteCategoryResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminDeleteCategory(): UseAdminDeleteCategoryReturn {
  const [graphqlMutate, { loading, error }] = useAdminDeleteCategoryMutation();

  const mutate = useCallback(
    async (name: string): Promise<DeleteCategoryResult> => {
      try {
        const { data } = await graphqlMutate({ variables: { name } });
        if (data?.adminDeleteCategory) {
          return { success: true, data: data.adminDeleteCategory };
        }
        return { success: false, error: "Failed to delete category" };
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
