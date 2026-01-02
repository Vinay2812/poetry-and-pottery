"use server";

import { getClient } from "@/lib/apollo";

import {
  ADMIN_ADD_CATEGORY_MUTATION,
  ADMIN_DELETE_CATEGORY_MUTATION,
  ADMIN_RENAME_CATEGORY_MUTATION,
  ADMIN_UPDATE_CATEGORY_ICON_MUTATION,
} from "@/graphql/admin/categories.mutation";
import {
  ADMIN_ALL_CONFIGURED_CATEGORIES_QUERY,
  ADMIN_AVAILABLE_ICONS_QUERY,
  ADMIN_CATEGORIES_QUERY,
} from "@/graphql/admin/categories.query";
import type {
  AdminAddCategoryMutation,
  AdminAddCategoryMutationVariables,
  AdminAllConfiguredCategoriesQuery,
  AdminAvailableIconsQuery,
  AdminCategoriesQuery,
  AdminCategoriesResponse,
  AdminCategoryConfig,
  AdminCategoryMutationResponse,
  AdminDeleteCategoryMutation,
  AdminDeleteCategoryMutationVariables,
  AdminIconOption,
  AdminRenameCategoryMutation,
  AdminRenameCategoryMutationVariables,
  AdminUpdateCategoryIconMutation,
  AdminUpdateCategoryIconMutationVariables,
} from "@/graphql/generated/types";

export async function getCategories(): Promise<AdminCategoriesResponse> {
  const client = getClient();

  const result = await client.query<AdminCategoriesQuery>({
    query: ADMIN_CATEGORIES_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminCategories;
}

export async function getAllConfiguredCategories(): Promise<
  AdminCategoryConfig[]
> {
  const client = getClient();

  const result = await client.query<AdminAllConfiguredCategoriesQuery>({
    query: ADMIN_ALL_CONFIGURED_CATEGORIES_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminAllConfiguredCategories;
}

export async function updateCategoryIcon(
  categoryName: string,
  icon: string,
): Promise<AdminCategoryMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateCategoryIconMutation,
    AdminUpdateCategoryIconMutationVariables
  >({
    mutation: ADMIN_UPDATE_CATEGORY_ICON_MUTATION,
    variables: { category: categoryName, icon },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateCategoryIcon;
}

export async function addCategory(
  name: string,
  icon: string = "tag",
): Promise<AdminCategoryMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminAddCategoryMutation,
    AdminAddCategoryMutationVariables
  >({
    mutation: ADMIN_ADD_CATEGORY_MUTATION,
    variables: { name, icon },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminAddCategory;
}

export async function renameCategory(
  oldName: string,
  newName: string,
): Promise<AdminCategoryMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminRenameCategoryMutation,
    AdminRenameCategoryMutationVariables
  >({
    mutation: ADMIN_RENAME_CATEGORY_MUTATION,
    variables: { oldName, newName },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminRenameCategory;
}

export async function deleteCategory(
  name: string,
): Promise<AdminCategoryMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminDeleteCategoryMutation,
    AdminDeleteCategoryMutationVariables
  >({
    mutation: ADMIN_DELETE_CATEGORY_MUTATION,
    variables: { name },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminDeleteCategory;
}

export async function getAvailableIcons(): Promise<AdminIconOption[]> {
  const client = getClient();

  const result = await client.query<AdminAvailableIconsQuery>({
    query: ADMIN_AVAILABLE_ICONS_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminAvailableIcons;
}
