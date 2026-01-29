"use client";

import { useCallback } from "react";

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
  const [graphqlMutate, { loading, error }] = useAdminCreateProductMutation();

  const mutate = useCallback(
    async (input: CreateProductInput): Promise<CreateProductResult> => {
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
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
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
  const [graphqlMutate, { loading, error }] = useAdminUpdateProductMutation();

  const mutate = useCallback(
    async (
      id: number,
      input: UpdateProductInput,
    ): Promise<UpdateProductResult> => {
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
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
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
  const [graphqlMutate, { loading, error }] = useAdminDeleteProductMutation();

  const mutate = useCallback(
    async (id: number): Promise<DeleteProductResult> => {
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
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
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
  const [graphqlMutate, { loading, error }] =
    useAdminToggleProductActiveMutation();

  const mutate = useCallback(
    async (id: number): Promise<ToggleProductActiveResult> => {
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
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
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
  const [graphqlMutate, { loading, error }] =
    useAdminDeleteProductReviewMutation();

  const mutate = useCallback(
    async (reviewId: number): Promise<DeleteProductReviewResult> => {
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
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}
