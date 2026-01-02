"use server";

import { isGraphQL } from "@/consts/env";

import type {
  Order,
  OrderMutationResponse,
  OrdersResponse,
} from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";
import type { ShippingAddress } from "../types";

// Result types for consistent error handling
export type GetOrdersResult =
  | { success: true; data: OrdersResponse }
  | { success: false; error: string };

export type GetOrderResult =
  | { success: true; data: Order }
  | { success: false; error: string };

export type CreateOrderResult =
  | { success: true; data: Order }
  | { success: false; error: string };

export type CancelOrderResult =
  | { success: true; data: Order }
  | { success: false; error: string };

export async function getOrders(
  page: number = 1,
  limit: number = 10,
  search?: string,
): Promise<GetOrdersResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.getOrders(page, limit, search);
      return { success: true, data: result };
    }
    const result = await actionImpl.getOrders(page, limit, search);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get orders",
    };
  }
}

export async function getOrderById(orderId: string): Promise<GetOrderResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.getOrderById(orderId);
      if (!result) {
        return { success: false, error: "Order not found" };
      }
      return { success: true, data: result };
    }
    const result = await actionImpl.getOrderById(orderId);
    if (!result) {
      return { success: false, error: "Order not found" };
    }
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get order",
    };
  }
}

export async function createOrder(data: {
  shippingFee: number;
  shippingAddress: ShippingAddress;
}): Promise<CreateOrderResult> {
  try {
    let result: OrderMutationResponse;

    if (isGraphQL) {
      result = await graphqlImpl.createOrder(data);
    } else {
      result = await actionImpl.createOrder(data);
    }

    if (result.success && result.order) {
      return { success: true, data: result.order };
    }
    return {
      success: false,
      error: result.error ?? "Failed to create order",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create order",
    };
  }
}

export async function cancelOrder(orderId: string): Promise<CancelOrderResult> {
  try {
    let result: OrderMutationResponse;

    if (isGraphQL) {
      result = await graphqlImpl.cancelOrder(orderId);
    } else {
      result = await actionImpl.cancelOrder(orderId);
    }

    if (result.success && result.order) {
      return { success: true, data: result.order };
    }
    return {
      success: false,
      error: result.error ?? "Failed to cancel order",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to cancel order",
    };
  }
}
