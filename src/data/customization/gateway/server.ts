"use server";

import type {
  CustomizationCategoriesFilterInput,
  CustomizationCategoriesResponse,
  CustomizationOptionsFilterInput,
  CustomizationOptionsResponse,
} from "@/graphql/generated/types";
import { cacheLife, cacheTag } from "next/cache";

import * as graphqlImpl from "../server/graphql";

export async function getCustomizationCategories(
  filter?: CustomizationCategoriesFilterInput,
): Promise<CustomizationCategoriesResponse> {
  "use cache";
  cacheTag("customization", "customization:categories");
  cacheLife("customization");
  return graphqlImpl.getCustomizationCategories(filter);
}

export async function getCustomizationOptionsByCategory(
  filter: CustomizationOptionsFilterInput,
): Promise<CustomizationOptionsResponse> {
  "use cache";
  cacheTag("customization", `customization:category:${filter.customize_category_id}`);
  cacheLife("customization");
  return graphqlImpl.getCustomizationOptionsByCategory(filter);
}

export async function getCustomizationTypes(): Promise<string[]> {
  "use cache";
  cacheTag("customization", "customization:types");
  cacheLife("customization");
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
