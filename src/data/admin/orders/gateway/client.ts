"use client";

import { useCallback } from "react";

import {
  useAdminUpdateOrderDiscountMutation,
  useAdminUpdateOrderItemDiscountMutation,
  useAdminUpdateOrderItemQuantityMutation,
  useAdminUpdateOrderPriceMutation,
  useAdminUpdateOrderStatusMutation,
} from "@/graphql/generated/graphql";
import type { AdminOrderMutationResponse } from "@/graphql/generated/types";

// ============ UPDATE ORDER STATUS ============

type UpdateOrderStatusResult =
  | { success: true; data: AdminOrderMutationResponse }
  | { success: false; error: string };

interface UseAdminUpdateOrderStatusReturn {
  mutate: (orderId: string, status: string) => Promise<UpdateOrderStatusResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminUpdateOrderStatus(): UseAdminUpdateOrderStatusReturn {
  const [graphqlMutate, { loading, error }] =
    useAdminUpdateOrderStatusMutation();

  const mutate = useCallback(
    async (
      orderId: string,
      status: string,
    ): Promise<UpdateOrderStatusResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: { orderId, status },
        });
        if (data?.adminUpdateOrderStatus) {
          return { success: true, data: data.adminUpdateOrderStatus };
        }
        return { success: false, error: "Failed to update order status" };
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

// ============ UPDATE ORDER PRICE ============

type UpdateOrderPriceResult =
  | { success: true; data: AdminOrderMutationResponse }
  | { success: false; error: string };

interface UseAdminUpdateOrderPriceReturn {
  mutate: (orderId: string, total: number) => Promise<UpdateOrderPriceResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminUpdateOrderPrice(): UseAdminUpdateOrderPriceReturn {
  const [graphqlMutate, { loading, error }] =
    useAdminUpdateOrderPriceMutation();

  const mutate = useCallback(
    async (orderId: string, total: number): Promise<UpdateOrderPriceResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: { orderId, total },
        });
        if (data?.adminUpdateOrderPrice) {
          return { success: true, data: data.adminUpdateOrderPrice };
        }
        return { success: false, error: "Failed to update order price" };
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

// ============ UPDATE ORDER DISCOUNT ============

type UpdateOrderDiscountResult =
  | { success: true; data: AdminOrderMutationResponse }
  | { success: false; error: string };

interface UseAdminUpdateOrderDiscountReturn {
  mutate: (
    orderId: string,
    discount: number,
  ) => Promise<UpdateOrderDiscountResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminUpdateOrderDiscount(): UseAdminUpdateOrderDiscountReturn {
  const [graphqlMutate, { loading, error }] =
    useAdminUpdateOrderDiscountMutation();

  const mutate = useCallback(
    async (
      orderId: string,
      discount: number,
    ): Promise<UpdateOrderDiscountResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: { orderId, discount },
        });
        if (data?.adminUpdateOrderDiscount) {
          return { success: true, data: data.adminUpdateOrderDiscount };
        }
        return { success: false, error: "Failed to update order discount" };
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

// ============ UPDATE ORDER ITEM DISCOUNT ============

type UpdateOrderItemDiscountResult =
  | { success: true; data: AdminOrderMutationResponse }
  | { success: false; error: string };

interface UseAdminUpdateOrderItemDiscountReturn {
  mutate: (
    itemId: number,
    discount: number,
  ) => Promise<UpdateOrderItemDiscountResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminUpdateOrderItemDiscount(): UseAdminUpdateOrderItemDiscountReturn {
  const [graphqlMutate, { loading, error }] =
    useAdminUpdateOrderItemDiscountMutation();

  const mutate = useCallback(
    async (
      itemId: number,
      discount: number,
    ): Promise<UpdateOrderItemDiscountResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: { itemId, discount },
        });
        if (data?.adminUpdateOrderItemDiscount) {
          return { success: true, data: data.adminUpdateOrderItemDiscount };
        }
        return { success: false, error: "Failed to update item discount" };
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

// ============ UPDATE ORDER ITEM QUANTITY ============

type UpdateOrderItemQuantityResult =
  | { success: true; data: AdminOrderMutationResponse }
  | { success: false; error: string };

interface UseAdminUpdateOrderItemQuantityReturn {
  mutate: (
    itemId: number,
    quantity: number,
  ) => Promise<UpdateOrderItemQuantityResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminUpdateOrderItemQuantity(): UseAdminUpdateOrderItemQuantityReturn {
  const [graphqlMutate, { loading, error }] =
    useAdminUpdateOrderItemQuantityMutation();

  const mutate = useCallback(
    async (
      itemId: number,
      quantity: number,
    ): Promise<UpdateOrderItemQuantityResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: { itemId, quantity },
        });
        if (data?.adminUpdateOrderItemQuantity) {
          return { success: true, data: data.adminUpdateOrderItemQuantity };
        }
        return { success: false, error: "Failed to update item quantity" };
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
