"use server";

import type {
  AdminCustomizationCategorySummary,
  AdminCustomizationMutationResponse,
  AdminCustomizationOption,
  AdminCustomizationOptionsFilterInput,
  AdminCustomizationOptionsResponse,
  AdminCustomizationTypeSummary,
  CreateCustomizationOptionInput,
  UpdateCustomizationOptionInput,
} from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export async function getCustomizationOptions(
  filter?: AdminCustomizationOptionsFilterInput,
): Promise<AdminCustomizationOptionsResponse> {
  return graphqlImpl.getCustomizationOptions(filter);
}

export async function getCustomizationOptionById(
  id: number,
): Promise<AdminCustomizationOption | null> {
  return graphqlImpl.getCustomizationOptionById(id);
}

export async function getCustomizationCategories(): Promise<
  AdminCustomizationCategorySummary[]
> {
  return graphqlImpl.getCustomizationCategories();
}

export async function getCustomizationTypes(): Promise<
  AdminCustomizationTypeSummary[]
> {
  return graphqlImpl.getCustomizationTypes();
}

export async function createCustomizationOption(
  input: CreateCustomizationOptionInput,
): Promise<AdminCustomizationMutationResponse> {
  return graphqlImpl.createCustomizationOption(input);
}

export async function updateCustomizationOption(
  id: number,
  input: UpdateCustomizationOptionInput,
): Promise<AdminCustomizationMutationResponse> {
  return graphqlImpl.updateCustomizationOption(id, input);
}

export async function deleteCustomizationOption(
  id: number,
): Promise<AdminCustomizationMutationResponse> {
  return graphqlImpl.deleteCustomizationOption(id);
}

export async function toggleCustomizationOptionActive(
  id: number,
): Promise<AdminCustomizationMutationResponse> {
  return graphqlImpl.toggleCustomizationOptionActive(id);
}
