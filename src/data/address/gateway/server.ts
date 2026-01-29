"use server";

import type { UserAddress } from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

// Result types for gateway functions
export type GetAddressesResult =
  | { success: true; data: UserAddress[] }
  | { success: false; error: string };

export type GetAddressResult =
  | { success: true; data: UserAddress }
  | { success: false; error: string };

export async function getUserAddresses(): Promise<GetAddressesResult> {
  try {
    const addresses = await graphqlImpl.getUserAddresses();
    return { success: true, data: addresses };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch addresses",
    };
  }
}

export async function getAddressById(id: number): Promise<GetAddressResult> {
  try {
    const address = await graphqlImpl.getAddressById(id);
    if (!address) {
      return { success: false, error: "Address not found" };
    }
    return { success: true, data: address };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch address",
    };
  }
}
