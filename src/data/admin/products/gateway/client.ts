"use client";

import { isGraphQL } from "@/consts/env";
import { useCallback, useState } from "react";

import {
  useAdminCreateProductMutation,
  useAdminDeleteProductMutation,
  useAdminDeleteProductReviewMutation,
  useAdminToggleProductActiveMutation,
  useAdminUpdateProductMutation,
} from "@/graphql/generated/graphql";
import type {
  AdminProductMutationResponse,
  CreateProductInput,
  UpdateProductInput,
} from "@/graphql/generated/types";

import * as actionImpl from "../server/action";

// ============ CREATE PRODUCT ============

type CreateProductResult =
  | { success: true; data: AdminProductMutationResponse }
  | { success: false; error: string };

interface UseAdminCreateProductReturn {
  mutate: (input: CreateProductInput) => Promise<CreateProductResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminCreateProduct(): UseAdminCreateProductReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminCreateProductMutation();

  const mutate = useCallback(
    async (input: CreateProductInput): Promise<CreateProductResult> => {
      if (isGraphQL) {
        try {
          const { data } = await graphqlMutate({ variables: { input } });
          if (data?.adminCreateProduct) {
            return { success: true, data: data.adminCreateProduct };
          }
          return { success: false, error: "Failed to create product" };
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
          const result = await actionImpl.createProduct(input);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to create product",
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

// ============ UPDATE PRODUCT ============

type UpdateProductResult =
  | { success: true; data: AdminProductMutationResponse }
  | { success: false; error: string };

interface UseAdminUpdateProductReturn {
  mutate: (
    id: number,
    input: UpdateProductInput,
  ) => Promise<UpdateProductResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminUpdateProduct(): UseAdminUpdateProductReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminUpdateProductMutation();

  const mutate = useCallback(
    async (
      id: number,
      input: UpdateProductInput,
    ): Promise<UpdateProductResult> => {
      if (isGraphQL) {
        try {
          const { data } = await graphqlMutate({ variables: { id, input } });
          if (data?.adminUpdateProduct) {
            return { success: true, data: data.adminUpdateProduct };
          }
          return { success: false, error: "Failed to update product" };
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
          const result = await actionImpl.updateProduct(id, input);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to update product",
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

// ============ DELETE PRODUCT ============

type DeleteProductResult =
  | { success: true; data: AdminProductMutationResponse }
  | { success: false; error: string };

interface UseAdminDeleteProductReturn {
  mutate: (id: number) => Promise<DeleteProductResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminDeleteProduct(): UseAdminDeleteProductReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminDeleteProductMutation();

  const mutate = useCallback(
    async (id: number): Promise<DeleteProductResult> => {
      if (isGraphQL) {
        try {
          const { data } = await graphqlMutate({ variables: { id } });
          if (data?.adminDeleteProduct) {
            return { success: true, data: data.adminDeleteProduct };
          }
          return { success: false, error: "Failed to delete product" };
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
          const result = await actionImpl.deleteProduct(id);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to delete product",
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

// ============ TOGGLE PRODUCT ACTIVE ============

type ToggleProductActiveResult =
  | { success: true; data: AdminProductMutationResponse }
  | { success: false; error: string };

interface UseAdminToggleProductActiveReturn {
  mutate: (id: number) => Promise<ToggleProductActiveResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminToggleProductActive(): UseAdminToggleProductActiveReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminToggleProductActiveMutation();

  const mutate = useCallback(
    async (id: number): Promise<ToggleProductActiveResult> => {
      if (isGraphQL) {
        try {
          const { data } = await graphqlMutate({ variables: { id } });
          if (data?.adminToggleProductActive) {
            return { success: true, data: data.adminToggleProductActive };
          }
          return { success: false, error: "Failed to toggle product status" };
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
          const result = await actionImpl.toggleProductActive(id);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to toggle product status",
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

// ============ DELETE PRODUCT REVIEW ============

type DeleteProductReviewResult =
  | { success: true; data: AdminProductMutationResponse }
  | { success: false; error: string };

interface UseAdminDeleteProductReviewReturn {
  mutate: (reviewId: number) => Promise<DeleteProductReviewResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminDeleteProductReview(): UseAdminDeleteProductReviewReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminDeleteProductReviewMutation();

  const mutate = useCallback(
    async (reviewId: number): Promise<DeleteProductReviewResult> => {
      if (isGraphQL) {
        try {
          const { data } = await graphqlMutate({ variables: { reviewId } });
          if (data?.adminDeleteProductReview) {
            return { success: true, data: data.adminDeleteProductReview };
          }
          return { success: false, error: "Failed to delete review" };
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
          const result = await actionImpl.deleteProductReview(reviewId);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to delete review",
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
