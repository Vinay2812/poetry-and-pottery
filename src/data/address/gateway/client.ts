"use client";

import { useCallback } from "react";

import type { UserAddress } from "@/graphql/generated/graphql";
import {
  useCreateAddressMutation as useCreateAddressGraphQL,
  useDeleteAddressMutation as useDeleteAddressGraphQL,
  useUpdateAddressMutation as useUpdateAddressGraphQL,
  useUserAddressesQuery,
} from "@/graphql/generated/graphql";

// Query hook for fetching user addresses
export function useUserAddresses() {
  const { data, loading, error, refetch } = useUserAddressesQuery({
    fetchPolicy: "cache-and-network",
  });

  return {
    addresses: (data?.userAddresses.addresses ?? []) as UserAddress[],
    total: data?.userAddresses.total ?? 0,
    isLoading: loading,
    error,
    refetch,
  };
}

// Input types
export interface AddressFormData {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  zip: string;
  contactNumber?: string;
}

// Result types
export type AddressResult =
  | { success: true; data: UserAddress }
  | { success: false; error: string };

export type DeleteAddressResult =
  | { success: true }
  | { success: false; error: string };

// Hook return types
interface UseCreateAddressReturn {
  mutate: (data: AddressFormData) => Promise<AddressResult>;
  loading: boolean;
  error: Error | undefined;
}

interface UseUpdateAddressReturn {
  mutate: (
    id: number,
    data: Partial<AddressFormData>,
  ) => Promise<AddressResult>;
  loading: boolean;
  error: Error | undefined;
}

interface UseDeleteAddressReturn {
  mutate: (id: number) => Promise<DeleteAddressResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useCreateAddress(): UseCreateAddressReturn {
  const [graphqlMutate, { loading, error }] = useCreateAddressGraphQL();

  const mutate = useCallback(
    async (data: AddressFormData): Promise<AddressResult> => {
      try {
        const { data: result } = await graphqlMutate({
          variables: {
            input: {
              name: data.name,
              address_line_1: data.addressLine1,
              address_line_2: data.addressLine2 ?? null,
              landmark: data.landmark ?? null,
              city: data.city,
              state: data.state,
              zip: data.zip,
              contact_number: data.contactNumber ?? null,
            },
          },
        });
        if (result?.createAddress.success && result.createAddress.address) {
          return { success: true, data: result.createAddress.address };
        }
        return {
          success: false,
          error: result?.createAddress.error ?? "Failed to create address",
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

export function useUpdateAddress(): UseUpdateAddressReturn {
  const [graphqlMutate, { loading, error }] = useUpdateAddressGraphQL();

  const mutate = useCallback(
    async (
      id: number,
      data: Partial<AddressFormData>,
    ): Promise<AddressResult> => {
      try {
        const { data: result } = await graphqlMutate({
          variables: {
            id,
            input: {
              name: data.name ?? null,
              address_line_1: data.addressLine1 ?? null,
              address_line_2: data.addressLine2 ?? null,
              landmark: data.landmark ?? null,
              city: data.city ?? null,
              state: data.state ?? null,
              zip: data.zip ?? null,
              contact_number: data.contactNumber ?? null,
            },
          },
        });
        if (result?.updateAddress.success && result.updateAddress.address) {
          return { success: true, data: result.updateAddress.address };
        }
        return {
          success: false,
          error: result?.updateAddress.error ?? "Failed to update address",
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

export function useDeleteAddress(): UseDeleteAddressReturn {
  const [graphqlMutate, { loading, error }] = useDeleteAddressGraphQL();

  const mutate = useCallback(
    async (id: number): Promise<DeleteAddressResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: { id },
        });
        if (data?.deleteAddress.success) {
          return { success: true };
        }
        return {
          success: false,
          error: data?.deleteAddress.error ?? "Failed to delete address",
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
