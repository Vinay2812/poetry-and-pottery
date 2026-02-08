"use server";

import { getClient } from "@/lib/apollo";

import {
  ADMIN_UPDATE_DAILY_WORKSHOP_REGISTRATION_DETAILS_MUTATION,
  ADMIN_UPDATE_DAILY_WORKSHOP_REGISTRATION_STATUS_MUTATION,
} from "@/graphql/admin/daily-workshops.mutation";
import { ADMIN_UPDATE_USER_ROLE_MUTATION } from "@/graphql/admin/users.mutation";
import {
  ADMIN_USERS_QUERY,
  ADMIN_USER_BY_ID_QUERY,
  ADMIN_USER_CART_QUERY,
  ADMIN_USER_DAILY_WORKSHOP_REGISTRATIONS_FOR_USER_QUERY,
  ADMIN_USER_ORDERS_QUERY,
  ADMIN_USER_REGISTRATIONS_QUERY,
  ADMIN_USER_WISHLIST_QUERY,
} from "@/graphql/admin/users.query";
import type {
  AdminDailyWorkshopMutationResponse,
  AdminUpdateDailyWorkshopRegistrationStatusMutation,
  AdminUpdateDailyWorkshopRegistrationStatusMutationVariables,
  AdminUpdateUserRoleMutation,
  AdminUpdateUserRoleMutationVariables,
  AdminUserByIdQuery,
  AdminUserByIdQueryVariables,
  AdminUserCartItem,
  AdminUserCartQuery,
  AdminUserCartQueryVariables,
  AdminUserDailyWorkshopRegistrationsForUserQuery,
  AdminUserDailyWorkshopRegistrationsForUserQueryVariables,
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

export type AdminUpdateDailyWorkshopRegistrationDetailsInput = {
  participants?: number;
  price_per_person?: number;
  pieces_per_person?: number;
  discount?: number;
  slot_start_times?: string[];
};

type AdminUpdateDailyWorkshopRegistrationDetailsMutationVariables = {
  registrationId: string;
  input: AdminUpdateDailyWorkshopRegistrationDetailsInput;
};

type AdminUpdateDailyWorkshopRegistrationDetailsMutation = {
  adminUpdateDailyWorkshopRegistrationDetails: {
    success: boolean;
    error?: string | null;
    registration?:
      | AdminUserDailyWorkshopRegistrationsForUserQuery["adminUserDailyWorkshopRegistrations"][number]
      | null;
  };
};

export type AdminUpdateDailyWorkshopRegistrationDetailsResponse =
  AdminUpdateDailyWorkshopRegistrationDetailsMutation["adminUpdateDailyWorkshopRegistrationDetails"];

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

export async function updateUserDailyWorkshopRegistrationStatus(
  registrationId: string,
  status: string,
): Promise<AdminDailyWorkshopMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateDailyWorkshopRegistrationStatusMutation,
    AdminUpdateDailyWorkshopRegistrationStatusMutationVariables
  >({
    mutation: ADMIN_UPDATE_DAILY_WORKSHOP_REGISTRATION_STATUS_MUTATION,
    variables: { registrationId, status },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateDailyWorkshopRegistrationStatus;
}

export async function updateUserDailyWorkshopRegistrationDetails(
  registrationId: string,
  input: AdminUpdateDailyWorkshopRegistrationDetailsInput,
): Promise<AdminUpdateDailyWorkshopRegistrationDetailsResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateDailyWorkshopRegistrationDetailsMutation,
    AdminUpdateDailyWorkshopRegistrationDetailsMutationVariables
  >({
    mutation: ADMIN_UPDATE_DAILY_WORKSHOP_REGISTRATION_DETAILS_MUTATION,
    variables: { registrationId, input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateDailyWorkshopRegistrationDetails;
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

export async function getUserDailyWorkshopRegistrations(
  userId: number,
): Promise<
  AdminUserDailyWorkshopRegistrationsForUserQuery["adminUserDailyWorkshopRegistrations"]
> {
  const client = getClient();

  const result = await client.query<
    AdminUserDailyWorkshopRegistrationsForUserQuery,
    AdminUserDailyWorkshopRegistrationsForUserQueryVariables
  >({
    query: ADMIN_USER_DAILY_WORKSHOP_REGISTRATIONS_FOR_USER_QUERY,
    variables: { userId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUserDailyWorkshopRegistrations;
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

export async function getUserWishlistPaginated(
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
