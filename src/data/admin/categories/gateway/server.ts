"use server";

import { isGraphQL } from "@/consts/env";

import type {
  AdminCategoriesResponse,
  AdminCategoryConfig,
  AdminCategoryMutationResponse,
  AdminIconOption,
} from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

export async function getCategories(): Promise<AdminCategoriesResponse> {
  if (isGraphQL) {
    return graphqlImpl.getCategories();
  }
  return actionImpl.getCategories() as Promise<AdminCategoriesResponse>;
}

export async function getAllConfiguredCategories(): Promise<
  AdminCategoryConfig[]
> {
  if (isGraphQL) {
    return graphqlImpl.getAllConfiguredCategories();
  }
  return actionImpl.getAllConfiguredCategories() as Promise<
    AdminCategoryConfig[]
  >;
}

export async function updateCategoryIcon(
  categoryName: string,
  icon: string,
): Promise<AdminCategoryMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.updateCategoryIcon(categoryName, icon);
  }
  return actionImpl.updateCategoryIcon(
    categoryName,
    icon,
  ) as Promise<AdminCategoryMutationResponse>;
}

export async function addCategory(
  name: string,
  icon: string = "tag",
): Promise<AdminCategoryMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.addCategory(name, icon);
  }
  return actionImpl.addCategory(
    name,
    icon,
  ) as Promise<AdminCategoryMutationResponse>;
}

export async function renameCategory(
  oldName: string,
  newName: string,
): Promise<AdminCategoryMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.renameCategory(oldName, newName);
  }
  return actionImpl.renameCategory(
    oldName,
    newName,
  ) as Promise<AdminCategoryMutationResponse>;
}

export async function deleteCategory(
  name: string,
): Promise<AdminCategoryMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.deleteCategory(name);
  }
  return actionImpl.deleteCategory(
    name,
  ) as Promise<AdminCategoryMutationResponse>;
}

export async function getAvailableIcons(): Promise<AdminIconOption[]> {
  if (isGraphQL) {
    return graphqlImpl.getAvailableIcons();
  }
  return actionImpl.getAvailableIcons() as Promise<AdminIconOption[]>;
}
