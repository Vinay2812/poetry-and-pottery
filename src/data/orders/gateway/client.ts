"use client";

import { useCallback } from "react";

import type { Order } from "@/graphql/generated/graphql";
import { useCreateOrderMutation as useCreateOrderGraphQL } from "@/graphql/generated/graphql";

import type { ShippingAddress } from "../types";

// Result types
export type CreateOrderResult =
  | { success: true; data: Order }
  | { success: false; error: string };

// Hook return types
interface UseCreateOrderReturn {
  mutate: (data: {
    productIds: number[];
    shippingFee: number;
    shippingAddress: ShippingAddress;
  }) => Promise<CreateOrderResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useCreateOrder(): UseCreateOrderReturn {
  const [graphqlMutate, { loading, error }] = useCreateOrderGraphQL();

  const mutate = useCallback(
    async (data: {
      productIds: number[];
      shippingFee: number;
      shippingAddress: ShippingAddress;
    }): Promise<CreateOrderResult> => {
      try {
        const { data: result } = await graphqlMutate({
          variables: {
            input: {
              product_ids: data.productIds,
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
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}
