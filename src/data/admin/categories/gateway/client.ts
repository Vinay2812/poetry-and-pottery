"use client";

import { isGraphQL } from "@/consts/env";
import { useCallback, useState } from "react";

import {
  useAdminAddCategoryMutation,
  useAdminDeleteCategoryMutation,
  useAdminRenameCategoryMutation,
  useAdminUpdateCategoryIconMutation,
} from "@/graphql/generated/graphql";
import type { AdminCategoryMutationResponse } from "@/graphql/generated/types";

import * as actionImpl from "../server/action";

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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminUpdateCategoryIconMutation();

  const mutate = useCallback(
    async (
      categoryName: string,
      icon: string,
    ): Promise<UpdateCategoryIconResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.updateCategoryIcon(
            categoryName,
            icon,
          );
          if (result.success) {
            return {
              success: true,
              data: result as AdminCategoryMutationResponse,
            };
          }
          return {
            success: false,
            error: result.error ?? "Failed to update category icon",
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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminAddCategoryMutation();

  const mutate = useCallback(
    async (name: string, icon: string = "tag"): Promise<AddCategoryResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.addCategory(name, icon);
          if (result.success) {
            return {
              success: true,
              data: result as AdminCategoryMutationResponse,
            };
          }
          return {
            success: false,
            error: result.error ?? "Failed to add category",
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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminRenameCategoryMutation();

  const mutate = useCallback(
    async (oldName: string, newName: string): Promise<RenameCategoryResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.renameCategory(oldName, newName);
          if (result.success) {
            return {
              success: true,
              data: result as AdminCategoryMutationResponse,
            };
          }
          return {
            success: false,
            error: result.error ?? "Failed to rename category",
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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminDeleteCategoryMutation();

  const mutate = useCallback(
    async (name: string): Promise<DeleteCategoryResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.deleteCategory(name);
          if (result.success) {
            return {
              success: true,
              data: result as AdminCategoryMutationResponse,
            };
          }
          return {
            success: false,
            error: result.error ?? "Failed to delete category",
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
