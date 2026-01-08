"use server";

import { isGraphQL } from "@/consts/env";

import type { Order, OrdersResponse } from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

// Result types for consistent error handling
export type GetOrdersResult =
  | { success: true; data: OrdersResponse }
  | { success: false; error: string };

export type GetOrderResult =
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
