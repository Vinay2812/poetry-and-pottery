"use server";

import { getClient } from "@/lib/apollo";

import type {
  CancelOrderMutation,
  CancelOrderMutationVariables,
  CreateOrderMutation,
  CreateOrderMutationVariables,
  Order,
  OrderMutationResponse,
  OrderQuery,
  OrderQueryVariables,
  OrdersQuery,
  OrdersQueryVariables,
  OrdersResponse,
  ShippingAddressInput,
} from "@/graphql/generated/types";
import {
  CANCEL_ORDER_MUTATION,
  CREATE_ORDER_MUTATION,
} from "@/graphql/orders.mutation";
import { ORDERS_QUERY, ORDER_QUERY } from "@/graphql/orders.query";

export async function getOrders(
  page: number = 1,
  limit: number = 10,
  search?: string,
): Promise<OrdersResponse> {
  const client = getClient();

  const result = await client.query<OrdersQuery, OrdersQueryVariables>({
    query: ORDERS_QUERY,
    variables: {
      filter: { page, limit, search },
    },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.orders ?? { data: [], total: 0, page: 1, total_pages: 0 };
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const client = getClient();

  const result = await client.query<OrderQuery, OrderQueryVariables>({
    query: ORDER_QUERY,
    variables: { id: orderId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.order ?? null;
}

export async function createOrder(data: {
  shippingFee: number;
  shippingAddress: ShippingAddressInput;
}): Promise<OrderMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >({
    mutation: CREATE_ORDER_MUTATION,
    variables: {
      input: {
        shippingFee: data.shippingFee,
        shippingAddress: data.shippingAddress,
      },
    },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.createOrder ?? {
      success: false,
      order: null,
      error: "Failed to create order",
    }
  );
}

export async function cancelOrder(
  orderId: string,
): Promise<OrderMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    CancelOrderMutation,
    CancelOrderMutationVariables
  >({
    mutation: CANCEL_ORDER_MUTATION,
    variables: { orderId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.cancelOrder ?? {
      success: false,
      order: null,
      error: "Failed to cancel order",
    }
  );
}
