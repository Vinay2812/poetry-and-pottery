"use server";

import { isGraphQL } from "@/consts/env";

import type {
  AdminUserCartItem,
  AdminUserDetail,
  AdminUserMutationResponse,
  AdminUserOrder,
  AdminUserRegistration,
  AdminUserWishlistResponse,
  AdminUsersFilterInput,
  AdminUsersResponse,
} from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

export async function getUsers(
  filter?: AdminUsersFilterInput,
): Promise<AdminUsersResponse> {
  if (isGraphQL) {
    return graphqlImpl.getUsers(filter);
  }
  // Convert InputMaybe (null | undefined) to undefined for action
  const normalizedFilter = filter
    ? {
        search: filter.search ?? undefined,
        role: filter.role ?? undefined,
        page: filter.page ?? undefined,
        limit: filter.limit ?? undefined,
      }
    : undefined;
  return actionImpl.getUsers(normalizedFilter);
}

export async function getUserById(
  userId: number,
): Promise<AdminUserDetail | null> {
  if (isGraphQL) {
    return graphqlImpl.getUserById(userId);
  }
  return actionImpl.getUserById(userId);
}

export async function updateUserRole(
  userId: number,
  role: string,
): Promise<AdminUserMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.updateUserRole(userId, role);
  }
  return actionImpl.updateUserRole(userId, role);
}

export async function getUserOrders(userId: number): Promise<AdminUserOrder[]> {
  if (isGraphQL) {
    return graphqlImpl.getUserOrders(userId);
  }
  return actionImpl.getUserOrders(userId);
}

export async function getUserRegistrations(
  userId: number,
): Promise<AdminUserRegistration[]> {
  if (isGraphQL) {
    return graphqlImpl.getUserRegistrations(userId);
  }
  return actionImpl.getUserRegistrations(userId);
}

export async function getUserCart(
  userId: number,
): Promise<AdminUserCartItem[]> {
  if (isGraphQL) {
    return graphqlImpl.getUserCart(userId);
  }
  return actionImpl.getUserCart(userId);
}

export async function getUserWishlist(
  userId: number,
  page: number = 1,
  limit: number = 12,
): Promise<AdminUserWishlistResponse> {
  if (isGraphQL) {
    return graphqlImpl.getUserWishlist(userId, page, limit);
  }
  return actionImpl.getUserWishlist(userId, page, limit);
}

// Alias for backwards compatibility
export { getUserWishlist as getUserWishlistPaginated };
