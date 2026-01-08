"use client";

import { isGraphQL } from "@/consts/env";
import { useCallback, useState } from "react";

import {
  useAdminUpdateOrderDiscountMutation,
  useAdminUpdateOrderItemDiscountMutation,
  useAdminUpdateOrderItemQuantityMutation,
  useAdminUpdateOrderPriceMutation,
  useAdminUpdateOrderStatusMutation,
} from "@/graphql/generated/graphql";
import type { AdminOrderMutationResponse } from "@/graphql/generated/types";

import * as actionImpl from "../server/action";

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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminUpdateOrderStatusMutation();

  const mutate = useCallback(
    async (
      orderId: string,
      status: string,
    ): Promise<UpdateOrderStatusResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.updateOrderStatus(orderId, status);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to update order status",
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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminUpdateOrderPriceMutation();

  const mutate = useCallback(
    async (orderId: string, total: number): Promise<UpdateOrderPriceResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.updateOrderPrice(orderId, total);
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to update order price",
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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminUpdateOrderDiscountMutation();

  const mutate = useCallback(
    async (
      orderId: string,
      discount: number,
    ): Promise<UpdateOrderDiscountResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.updateOrderDiscount(
            orderId,
            discount,
          );
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to update order discount",
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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminUpdateOrderItemDiscountMutation();

  const mutate = useCallback(
    async (
      itemId: number,
      discount: number,
    ): Promise<UpdateOrderItemDiscountResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.updateOrderItemDiscount(
            itemId,
            discount,
          );
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to update item discount",
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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminUpdateOrderItemQuantityMutation();

  const mutate = useCallback(
    async (
      itemId: number,
      quantity: number,
    ): Promise<UpdateOrderItemQuantityResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.updateOrderItemQuantity(
            itemId,
            quantity,
          );
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to update item quantity",
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
