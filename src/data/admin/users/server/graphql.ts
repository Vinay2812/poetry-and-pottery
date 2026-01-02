"use server";

import { getClient } from "@/lib/apollo";

import { ADMIN_UPDATE_USER_ROLE_MUTATION } from "@/graphql/admin/users.mutation";
import {
  ADMIN_USERS_QUERY,
  ADMIN_USER_BY_ID_QUERY,
  ADMIN_USER_CART_QUERY,
  ADMIN_USER_ORDERS_QUERY,
  ADMIN_USER_REGISTRATIONS_QUERY,
  ADMIN_USER_WISHLIST_QUERY,
} from "@/graphql/admin/users.query";
import type {
  AdminUpdateUserRoleMutation,
  AdminUpdateUserRoleMutationVariables,
  AdminUserByIdQuery,
  AdminUserByIdQueryVariables,
  AdminUserCartItem,
  AdminUserCartQuery,
  AdminUserCartQueryVariables,
  AdminUserDetail,
  AdminUserMutationResponse,
  AdminUserOrder,
  AdminUserOrdersQuery,
  AdminUserOrdersQueryVariables,
  AdminUserRegistration,
  AdminUserRegistrationsQuery,
  AdminUserRegistrationsQueryVariables,
  AdminUserWishlistQuery,
  AdminUserWishlistQueryVariables,
  AdminUserWishlistResponse,
  AdminUsersFilterInput,
  AdminUsersQuery,
  AdminUsersQueryVariables,
  AdminUsersResponse,
} from "@/graphql/generated/types";

export async function getUsers(
  filter?: AdminUsersFilterInput,
): Promise<AdminUsersResponse> {
  const client = getClient();

  const result = await client.query<AdminUsersQuery, AdminUsersQueryVariables>({
    query: ADMIN_USERS_QUERY,
    variables: { filter },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUsers;
}

export async function getUserById(id: number): Promise<AdminUserDetail | null> {
  const client = getClient();

  const result = await client.query<
    AdminUserByIdQuery,
    AdminUserByIdQueryVariables
  >({
    query: ADMIN_USER_BY_ID_QUERY,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUserById ?? null;
}

export async function updateUserRole(
  userId: number,
  role: string,
): Promise<AdminUserMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateUserRoleMutation,
    AdminUpdateUserRoleMutationVariables
  >({
    mutation: ADMIN_UPDATE_USER_ROLE_MUTATION,
    variables: { userId, role },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateUserRole;
}

export async function getUserOrders(userId: number): Promise<AdminUserOrder[]> {
  const client = getClient();

  const result = await client.query<
    AdminUserOrdersQuery,
    AdminUserOrdersQueryVariables
  >({
    query: ADMIN_USER_ORDERS_QUERY,
    variables: { userId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUserOrders;
}

export async function getUserRegistrations(
  userId: number,
): Promise<AdminUserRegistration[]> {
  const client = getClient();

  const result = await client.query<
    AdminUserRegistrationsQuery,
    AdminUserRegistrationsQueryVariables
  >({
    query: ADMIN_USER_REGISTRATIONS_QUERY,
    variables: { userId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUserRegistrations;
}

export async function getUserCart(
  userId: number,
): Promise<AdminUserCartItem[]> {
  const client = getClient();

  const result = await client.query<
    AdminUserCartQuery,
    AdminUserCartQueryVariables
  >({
    query: ADMIN_USER_CART_QUERY,
    variables: { userId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUserCart;
}

export async function getUserWishlist(
  userId: number,
  page: number = 1,
  limit: number = 12,
): Promise<AdminUserWishlistResponse> {
  const client = getClient();

  const result = await client.query<
    AdminUserWishlistQuery,
    AdminUserWishlistQueryVariables
  >({
    query: ADMIN_USER_WISHLIST_QUERY,
    variables: { userId, page, limit },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUserWishlist;
}
