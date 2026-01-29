"use server";

import type {
  AdminCategoriesResponse,
  AdminCategoryConfig,
  AdminCategoryMutationResponse,
  AdminIconOption,
} from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export async function getCategories(): Promise<AdminCategoriesResponse> {
  return graphqlImpl.getCategories();
}

export async function getAllConfiguredCategories(): Promise<
  AdminCategoryConfig[]
> {
  return graphqlImpl.getAllConfiguredCategories();
}

export async function updateCategoryIcon(
  categoryName: string,
  icon: string,
): Promise<AdminCategoryMutationResponse> {
  return graphqlImpl.updateCategoryIcon(categoryName, icon);
}

export async function addCategory(
  name: string,
  icon: string = "tag",
): Promise<AdminCategoryMutationResponse> {
  return graphqlImpl.addCategory(name, icon);
}

export async function renameCategory(
  oldName: string,
  newName: string,
): Promise<AdminCategoryMutationResponse> {
  return graphqlImpl.renameCategory(oldName, newName);
}

export async function deleteCategory(
  name: string,
): Promise<AdminCategoryMutationResponse> {
  return graphqlImpl.deleteCategory(name);
}

export async function getAvailableIcons(): Promise<AdminIconOption[]> {
  return graphqlImpl.getAvailableIcons();
}
