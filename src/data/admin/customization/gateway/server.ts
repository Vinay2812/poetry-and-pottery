"use server";

import type {
  AdminCustomizationCategorySummary,
  AdminCustomizationMutationResponse,
  AdminCustomizationOption,
  AdminCustomizationOptionsFilterInput,
  AdminCustomizationOptionsResponse,
  AdminCustomizationTypeSummary,
  AdminCustomizeCategoriesResponse,
  AdminCustomizeCategory,
  AdminCustomizeCategoryMutationResponse,
  CreateCustomizationOptionInput,
  CreateCustomizeCategoryInput,
  UpdateCustomizationOptionInput,
  UpdateCustomizeCategoryInput,
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

// CustomizeCategory functions
export async function getCustomizeCategories(): Promise<AdminCustomizeCategoriesResponse> {
  return graphqlImpl.getCustomizeCategories();
}

export async function getCustomizeCategoryById(
  id: number,
): Promise<AdminCustomizeCategory | null> {
  return graphqlImpl.getCustomizeCategoryById(id);
}

export async function createCustomizeCategory(
  input: CreateCustomizeCategoryInput,
): Promise<AdminCustomizeCategoryMutationResponse> {
  return graphqlImpl.createCustomizeCategory(input);
}

export async function updateCustomizeCategory(
  id: number,
  input: UpdateCustomizeCategoryInput,
): Promise<AdminCustomizeCategoryMutationResponse> {
  return graphqlImpl.updateCustomizeCategory(id, input);
}

export async function deleteCustomizeCategory(
  id: number,
): Promise<AdminCustomizeCategoryMutationResponse> {
  return graphqlImpl.deleteCustomizeCategory(id);
}

export async function toggleCustomizeCategoryActive(
  id: number,
): Promise<AdminCustomizeCategoryMutationResponse> {
  return graphqlImpl.toggleCustomizeCategoryActive(id);
}
