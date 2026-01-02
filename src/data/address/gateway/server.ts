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

export type AddressResult =
  | { success: true; data: UserAddress }
  | { success: false; error: string };

export type DeleteAddressResult =
  | { success: true }
  | { success: false; error: string };

export type AddressFormData = {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  zip: string;
  contactNumber?: string;
};

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

export async function createAddress(
  data: AddressFormData,
): Promise<AddressResult> {
  try {
    const input = {
      name: data.name,
      address_line_1: data.addressLine1,
      address_line_2: data.addressLine2 ?? null,
      landmark: data.landmark ?? null,
      city: data.city,
      state: data.state,
      zip: data.zip,
      contact_number: data.contactNumber ?? null,
    };

    if (isGraphQL) {
      const result = await graphqlImpl.createAddress(input);
      if (result.success && result.address) {
        return { success: true, data: result.address };
      }
      return {
        success: false,
        error: result.error ?? "Failed to create address",
      };
    }

    const result = await actionImpl.createAddress(input);
    if (result.success && result.address) {
      return { success: true, data: result.address };
    }
    return {
      success: false,
      error: result.error ?? "Failed to create address",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create address",
    };
  }
}

export async function updateAddress(
  id: number,
  data: Partial<AddressFormData>,
): Promise<AddressResult> {
  try {
    const input = {
      name: data.name,
      address_line_1: data.addressLine1,
      address_line_2: data.addressLine2,
      landmark: data.landmark,
      city: data.city,
      state: data.state,
      zip: data.zip,
      contact_number: data.contactNumber,
    };

    if (isGraphQL) {
      const result = await graphqlImpl.updateAddress(id, input);
      if (result.success && result.address) {
        return { success: true, data: result.address };
      }
      return {
        success: false,
        error: result.error ?? "Failed to update address",
      };
    }

    const result = await actionImpl.updateAddress(id, input);
    if (result.success && result.address) {
      return { success: true, data: result.address };
    }
    return {
      success: false,
      error: result.error ?? "Failed to update address",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update address",
    };
  }
}

export async function deleteAddress(id: number): Promise<DeleteAddressResult> {
  try {
    if (isGraphQL) {
      const result = await graphqlImpl.deleteAddress(id);
      if (result.success) {
        return { success: true };
      }
      return {
        success: false,
        error: result.error ?? "Failed to delete address",
      };
    }

    const result = await actionImpl.deleteAddress(id);
    if (result.success) {
      return { success: true };
    }
    return {
      success: false,
      error: result.error ?? "Failed to delete address",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete address",
    };
  }
}
