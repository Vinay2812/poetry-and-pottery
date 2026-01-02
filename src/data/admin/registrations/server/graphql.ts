"use server";

import { getClient } from "@/lib/apollo";

import {
  ADMIN_UPDATE_REGISTRATION_DETAILS_MUTATION,
  ADMIN_UPDATE_REGISTRATION_PRICE_MUTATION,
  ADMIN_UPDATE_REGISTRATION_STATUS_MUTATION,
} from "@/graphql/admin/registrations.mutation";
import type {
  AdminRegistrationMutationResponse,
  AdminUpdateRegistrationDetailsMutation,
  AdminUpdateRegistrationDetailsMutationVariables,
  AdminUpdateRegistrationPriceMutation,
  AdminUpdateRegistrationPriceMutationVariables,
  AdminUpdateRegistrationStatusMutation,
  AdminUpdateRegistrationStatusMutationVariables,
  UpdateRegistrationDetailsInput,
} from "@/graphql/generated/types";

export async function updateRegistrationStatus(
  registrationId: string,
  status: string,
): Promise<AdminRegistrationMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateRegistrationStatusMutation,
    AdminUpdateRegistrationStatusMutationVariables
  >({
    mutation: ADMIN_UPDATE_REGISTRATION_STATUS_MUTATION,
    variables: { registrationId, status },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateRegistrationStatus;
}

export async function updateRegistrationPrice(
  registrationId: string,
  price: number,
): Promise<AdminRegistrationMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateRegistrationPriceMutation,
    AdminUpdateRegistrationPriceMutationVariables
  >({
    mutation: ADMIN_UPDATE_REGISTRATION_PRICE_MUTATION,
    variables: { registrationId, price },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateRegistrationPrice;
}

export async function updateRegistrationDetails(
  registrationId: string,
  input: UpdateRegistrationDetailsInput,
): Promise<AdminRegistrationMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateRegistrationDetailsMutation,
    AdminUpdateRegistrationDetailsMutationVariables
  >({
    mutation: ADMIN_UPDATE_REGISTRATION_DETAILS_MUTATION,
    variables: { registrationId, input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateRegistrationDetails;
}
