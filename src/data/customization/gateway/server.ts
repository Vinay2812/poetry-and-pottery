"use server";

import type {
  CustomizationCategoriesFilterInput,
  CustomizationCategoriesResponse,
  CustomizationOptionsFilterInput,
  CustomizationOptionsResponse,
} from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export async function getCustomizationCategories(
  filter?: CustomizationCategoriesFilterInput,
): Promise<CustomizationCategoriesResponse> {
  return graphqlImpl.getCustomizationCategories(filter);
}

export async function getCustomizationOptionsByCategory(
  filter: CustomizationOptionsFilterInput,
): Promise<CustomizationOptionsResponse> {
  return graphqlImpl.getCustomizationOptionsByCategory(filter);
}

export async function getCustomizationTypes(): Promise<string[]> {
  return graphqlImpl.getCustomizationTypes();
}

export type {
  CustomizationCategoriesFilterInput,
  CustomizationCategoriesResponse,
  CustomizationCategory,
  CustomizationOption,
  CustomizationOptionsFilterInput,
  CustomizationOptionsResponse,
  CustomizationOptionsByType,
} from "@/graphql/generated/types";
