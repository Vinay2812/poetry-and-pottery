"use client";

import { isGraphQL } from "@/consts/env";
import { useCallback, useState } from "react";

import type { Order } from "@/graphql/generated/graphql";
import {
  useCancelOrderMutation as useCancelOrderGraphQL,
  useCreateOrderMutation as useCreateOrderGraphQL,
} from "@/graphql/generated/graphql";

import {
  cancelOrder as cancelOrderAction,
  createOrder as createOrderAction,
} from "../server/action";
import type { ShippingAddress } from "../types";

// Result types
export type CreateOrderResult =
  | { success: true; data: Order }
  | { success: false; error: string };

export type CancelOrderResult =
  | { success: true; data: Order }
  | { success: false; error: string };

// Hook return types
interface UseCreateOrderReturn {
  mutate: (data: {
    shippingFee: number;
    shippingAddress: ShippingAddress;
  }) => Promise<CreateOrderResult>;
  loading: boolean;
  error: Error | undefined;
}

interface UseCancelOrderReturn {
  mutate: (orderId: string) => Promise<CancelOrderResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useCreateOrder(): UseCreateOrderReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useCreateOrderGraphQL();

  const mutate = useCallback(
    async (data: {
      shippingFee: number;
      shippingAddress: ShippingAddress;
    }): Promise<CreateOrderResult> => {
      if (isGraphQL) {
        try {
          const { data: result } = await graphqlMutate({
            variables: {
              input: {
                shipping_fee: data.shippingFee,
                shipping_address: {
                  name: data.shippingAddress.name,
                  address_line_1: data.shippingAddress.address_line_1,
                  address_line_2: data.shippingAddress.address_line_2 ?? null,
                  city: data.shippingAddress.city,
                  state: data.shippingAddress.state,
                  zip: data.shippingAddress.zip,
                  contact_number: data.shippingAddress.contact_number ?? null,
                },
              },
            },
          });
          if (result?.createOrder.success && result.createOrder.order) {
            return { success: true, data: result.createOrder.order };
          }
          return {
            success: false,
            error: result?.createOrder.error ?? "Failed to create order",
          };
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
          const result = await createOrderAction(data);
          if (result.success && result.order) {
            return { success: true, data: result.order };
          }
          return {
            success: false,
            error: result.error ?? "Failed to create order",
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

export function useCancelOrder(): UseCancelOrderReturn {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useCancelOrderGraphQL();

  const mutate = useCallback(
    async (orderId: string): Promise<CancelOrderResult> => {
      if (isGraphQL) {
        try {
          const { data } = await graphqlMutate({
            variables: { orderId },
          });
          if (data?.cancelOrder.success && data.cancelOrder.order) {
            return { success: true, data: data.cancelOrder.order };
          }
          return {
            success: false,
            error: data?.cancelOrder.error ?? "Failed to cancel order",
          };
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
          const result = await cancelOrderAction(orderId);
          if (result.success && result.order) {
            return { success: true, data: result.order };
          }
          return {
            success: false,
            error: result.error ?? "Failed to cancel order",
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
