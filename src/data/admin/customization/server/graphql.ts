"use server";

import { getClient } from "@/lib/apollo";

import {
  ADMIN_CREATE_CUSTOMIZATION_OPTION_MUTATION,
  ADMIN_DELETE_CUSTOMIZATION_OPTION_MUTATION,
  ADMIN_TOGGLE_CUSTOMIZATION_OPTION_ACTIVE_MUTATION,
  ADMIN_UPDATE_CUSTOMIZATION_OPTION_MUTATION,
} from "@/graphql/admin/customization.mutation";
import {
  ADMIN_CUSTOMIZATION_CATEGORIES_QUERY,
  ADMIN_CUSTOMIZATION_OPTIONS_QUERY,
  ADMIN_CUSTOMIZATION_OPTION_BY_ID_QUERY,
  ADMIN_CUSTOMIZATION_TYPES_QUERY,
} from "@/graphql/admin/customization.query";
import type {
  AdminCreateCustomizationOptionMutation,
  AdminCreateCustomizationOptionMutationVariables,
  AdminCustomizationCategoriesQuery,
  AdminCustomizationCategorySummary,
  AdminCustomizationMutationResponse,
  AdminCustomizationOption,
  AdminCustomizationOptionByIdQuery,
  AdminCustomizationOptionByIdQueryVariables,
  AdminCustomizationOptionsFilterInput,
  AdminCustomizationOptionsQuery,
  AdminCustomizationOptionsQueryVariables,
  AdminCustomizationOptionsResponse,
  AdminCustomizationTypeSummary,
  AdminCustomizationTypesQuery,
  AdminDeleteCustomizationOptionMutation,
  AdminDeleteCustomizationOptionMutationVariables,
  AdminToggleCustomizationOptionActiveMutation,
  AdminToggleCustomizationOptionActiveMutationVariables,
  AdminUpdateCustomizationOptionMutation,
  AdminUpdateCustomizationOptionMutationVariables,
  CreateCustomizationOptionInput,
  UpdateCustomizationOptionInput,
} from "@/graphql/generated/types";

export async function getCustomizationOptions(
  filter?: AdminCustomizationOptionsFilterInput,
): Promise<AdminCustomizationOptionsResponse> {
  const client = getClient();

  const result = await client.query<
    AdminCustomizationOptionsQuery,
    AdminCustomizationOptionsQueryVariables
  >({
    query: ADMIN_CUSTOMIZATION_OPTIONS_QUERY,
    variables: { filter },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminCustomizationOptions;
}

export async function getCustomizationOptionById(
  id: number,
): Promise<AdminCustomizationOption | null> {
  const client = getClient();

  const result = await client.query<
    AdminCustomizationOptionByIdQuery,
    AdminCustomizationOptionByIdQueryVariables
  >({
    query: ADMIN_CUSTOMIZATION_OPTION_BY_ID_QUERY,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminCustomizationOptionById ?? null;
}

export async function getCustomizationCategories(): Promise<
  AdminCustomizationCategorySummary[]
> {
  const client = getClient();

  const result = await client.query<AdminCustomizationCategoriesQuery>({
    query: ADMIN_CUSTOMIZATION_CATEGORIES_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminCustomizationCategories;
}

export async function getCustomizationTypes(): Promise<
  AdminCustomizationTypeSummary[]
> {
  const client = getClient();

  const result = await client.query<AdminCustomizationTypesQuery>({
    query: ADMIN_CUSTOMIZATION_TYPES_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminCustomizationTypes;
}

export async function createCustomizationOption(
  input: CreateCustomizationOptionInput,
): Promise<AdminCustomizationMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminCreateCustomizationOptionMutation,
    AdminCreateCustomizationOptionMutationVariables
  >({
    mutation: ADMIN_CREATE_CUSTOMIZATION_OPTION_MUTATION,
    variables: { input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminCreateCustomizationOption;
}

export async function updateCustomizationOption(
  id: number,
  input: UpdateCustomizationOptionInput,
): Promise<AdminCustomizationMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateCustomizationOptionMutation,
    AdminUpdateCustomizationOptionMutationVariables
  >({
    mutation: ADMIN_UPDATE_CUSTOMIZATION_OPTION_MUTATION,
    variables: { id, input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateCustomizationOption;
}

export async function deleteCustomizationOption(
  id: number,
): Promise<AdminCustomizationMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminDeleteCustomizationOptionMutation,
    AdminDeleteCustomizationOptionMutationVariables
  >({
    mutation: ADMIN_DELETE_CUSTOMIZATION_OPTION_MUTATION,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminDeleteCustomizationOption;
}

export async function toggleCustomizationOptionActive(
  id: number,
): Promise<AdminCustomizationMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminToggleCustomizationOptionActiveMutation,
    AdminToggleCustomizationOptionActiveMutationVariables
  >({
    mutation: ADMIN_TOGGLE_CUSTOMIZATION_OPTION_ACTIVE_MUTATION,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminToggleCustomizationOptionActive;
}
