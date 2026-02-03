"use server";

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

import * as graphqlImpl from "../server/graphql";

export async function getUsers(
  filter?: AdminUsersFilterInput,
): Promise<AdminUsersResponse> {
  return graphqlImpl.getUsers(filter);
}

export async function getUserById(
  userId: number,
): Promise<AdminUserDetail | null> {
  return graphqlImpl.getUserById(userId);
}

export async function updateUserRole(
  userId: number,
  role: string,
): Promise<AdminUserMutationResponse> {
  return graphqlImpl.updateUserRole(userId, role);
}

export async function getUserOrders(userId: number): Promise<AdminUserOrder[]> {
  return graphqlImpl.getUserOrders(userId);
}

export async function getUserRegistrations(
  userId: number,
): Promise<AdminUserRegistration[]> {
  return graphqlImpl.getUserRegistrations(userId);
}

export async function getUserCart(
  userId: number,
): Promise<AdminUserCartItem[]> {
  return graphqlImpl.getUserCart(userId);
}

export async function getUserWishlistPaginated(
  userId: number,
  page: number = 1,
  limit: number = 12,
): Promise<AdminUserWishlistResponse> {
  return graphqlImpl.getUserWishlistPaginated(userId, page, limit);
}
