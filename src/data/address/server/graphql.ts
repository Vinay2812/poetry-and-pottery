"use server";

import { getClient } from "@/lib/apollo";

import {
  CREATE_ADDRESS_MUTATION,
  DELETE_ADDRESS_MUTATION,
  UPDATE_ADDRESS_MUTATION,
} from "@/graphql/address.mutation";
import {
  ADDRESS_BY_ID_QUERY,
  USER_ADDRESSES_QUERY,
} from "@/graphql/address.query";
import type {
  AddressByIdQuery,
  AddressByIdQueryVariables,
  AddressMutationResponse,
  CreateAddressMutation,
  CreateAddressMutationVariables,
  DeleteAddressMutation,
  DeleteAddressMutationVariables,
  UpdateAddressMutation,
  UpdateAddressMutationVariables,
  UserAddress,
  UserAddressesQuery,
} from "@/graphql/generated/types";

export async function getUserAddresses(): Promise<UserAddress[]> {
  const client = getClient();

  const result = await client.query<UserAddressesQuery>({
    query: USER_ADDRESSES_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.userAddresses?.addresses ?? [];
}

export async function getAddressById(id: number): Promise<UserAddress | null> {
  const client = getClient();

  const result = await client.query<
    AddressByIdQuery,
    AddressByIdQueryVariables
  >({
    query: ADDRESS_BY_ID_QUERY,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.addressById ?? null;
}

export async function createAddress(input: {
  name: string;
  address_line_1: string;
  address_line_2?: string | null;
  landmark?: string | null;
  city: string;
  state: string;
  zip: string;
  contact_number?: string | null;
}): Promise<AddressMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    CreateAddressMutation,
    CreateAddressMutationVariables
  >({
    mutation: CREATE_ADDRESS_MUTATION,
    variables: { input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.createAddress ?? { success: false, error: "Unknown error" }
  );
}

export async function updateAddress(
  id: number,
  input: {
    name?: string | null;
    address_line_1?: string | null;
    address_line_2?: string | null;
    landmark?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    contact_number?: string | null;
  },
): Promise<AddressMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    UpdateAddressMutation,
    UpdateAddressMutationVariables
  >({
    mutation: UPDATE_ADDRESS_MUTATION,
    variables: { id, input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.updateAddress ?? { success: false, error: "Unknown error" }
  );
}

export async function deleteAddress(
  id: number,
): Promise<AddressMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    DeleteAddressMutation,
    DeleteAddressMutationVariables
  >({
    mutation: DELETE_ADDRESS_MUTATION,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.deleteAddress ?? { success: false, error: "Unknown error" }
  );
}
