"use server";

import { getPublicClient } from "@/lib/apollo";

import {
  CUSTOMIZATION_CATEGORIES_QUERY,
  CUSTOMIZATION_OPTIONS_BY_CATEGORY_QUERY,
  CUSTOMIZATION_TYPES_QUERY,
} from "@/graphql/customization.query";
import type {
  CustomizationCategoriesFilterInput,
  CustomizationCategoriesQuery,
  CustomizationCategoriesQueryVariables,
  CustomizationCategoriesResponse,
  CustomizationOptionsByCategoryQuery,
  CustomizationOptionsByCategoryQueryVariables,
  CustomizationOptionsFilterInput,
  CustomizationOptionsResponse,
  CustomizationTypesQuery,
} from "@/graphql/generated/types";

export async function getCustomizationCategories(
  filter?: CustomizationCategoriesFilterInput,
): Promise<CustomizationCategoriesResponse> {
  const client = getPublicClient();

  const result = await client.query<
    CustomizationCategoriesQuery,
    CustomizationCategoriesQueryVariables
  >({
    query: CUSTOMIZATION_CATEGORIES_QUERY,
    variables: { filter },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.customizationCategories;
}

export async function getCustomizationOptionsByCategory(
  filter: CustomizationOptionsFilterInput,
): Promise<CustomizationOptionsResponse> {
  const client = getPublicClient();

  const result = await client.query<
    CustomizationOptionsByCategoryQuery,
    CustomizationOptionsByCategoryQueryVariables
  >({
    query: CUSTOMIZATION_OPTIONS_BY_CATEGORY_QUERY,
    variables: { filter },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.customizationOptionsByCategory;
}

export async function getCustomizationTypes(): Promise<string[]> {
  const client = getPublicClient();

  const result = await client.query<CustomizationTypesQuery>({
    query: CUSTOMIZATION_TYPES_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.customizationTypes;
}
