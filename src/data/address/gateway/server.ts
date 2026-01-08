"use server";

import { isGraphQL } from "@/consts/env";

import type { UserAddress } from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
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
    if (isGraphQL) {
      const addresses = await graphqlImpl.getUserAddresses();
      return { success: true, data: addresses };
    }
    const addresses = await actionImpl.getUserAddresses();
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
    if (isGraphQL) {
      const address = await graphqlImpl.getAddressById(id);
      if (!address) {
        return { success: false, error: "Address not found" };
      }
      return { success: true, data: address };
    }
    const address = await actionImpl.getAddressById(id);
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
