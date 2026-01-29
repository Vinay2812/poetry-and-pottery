"use server";

import { getClient } from "@/lib/apollo";

import {
  ADMIN_ASSIGN_PRODUCTS_TO_COLLECTION_MUTATION,
  ADMIN_CREATE_COLLECTION_MUTATION,
  ADMIN_DELETE_COLLECTION_MUTATION,
  ADMIN_REMOVE_PRODUCT_FROM_COLLECTION_MUTATION,
  ADMIN_UPDATE_COLLECTION_MUTATION,
} from "@/graphql/admin/collections.mutation";
import {
  ADMIN_COLLECTIONS_QUERY,
  ADMIN_COLLECTION_BY_ID_QUERY,
} from "@/graphql/admin/collections.query";
import type {
  AdminAssignProductsToCollectionMutation,
  AdminAssignProductsToCollectionMutationVariables,
  AdminCollectionByIdQuery,
  AdminCollectionByIdQueryVariables,
  AdminCollectionDetail,
  AdminCollectionMutationResponse,
  AdminCollectionsFilterInput,
  AdminCollectionsQuery,
  AdminCollectionsQueryVariables,
  AdminCollectionsResponse,
  AdminCreateCollectionMutation,
  AdminCreateCollectionMutationVariables,
  AdminDeleteCollectionMutation,
  AdminDeleteCollectionMutationVariables,
  AdminRemoveProductFromCollectionMutation,
  AdminRemoveProductFromCollectionMutationVariables,
  AdminUpdateCollectionMutation,
  AdminUpdateCollectionMutationVariables,
  AssignProductsToCollectionInput,
  CreateCollectionInput,
  UpdateCollectionInput,
} from "@/graphql/generated/types";

export async function getCollections(
  filter?: AdminCollectionsFilterInput,
): Promise<AdminCollectionsResponse> {
  const client = getClient();

  const result = await client.query<
    AdminCollectionsQuery,
    AdminCollectionsQueryVariables
  >({
    query: ADMIN_COLLECTIONS_QUERY,
    variables: { filter },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminCollections;
}

export async function getCollectionById(
  id: number,
): Promise<AdminCollectionDetail | null> {
  const client = getClient();

  const result = await client.query<
    AdminCollectionByIdQuery,
    AdminCollectionByIdQueryVariables
  >({
    query: ADMIN_COLLECTION_BY_ID_QUERY,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminCollectionById ?? null;
}

export async function createCollection(
  input: CreateCollectionInput,
): Promise<AdminCollectionMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminCreateCollectionMutation,
    AdminCreateCollectionMutationVariables
  >({
    mutation: ADMIN_CREATE_COLLECTION_MUTATION,
    variables: { input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminCreateCollection;
}

export async function updateCollection(
  id: number,
  input: UpdateCollectionInput,
): Promise<AdminCollectionMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateCollectionMutation,
    AdminUpdateCollectionMutationVariables
  >({
    mutation: ADMIN_UPDATE_COLLECTION_MUTATION,
    variables: { id, input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateCollection;
}

export async function deleteCollection(
  id: number,
): Promise<AdminCollectionMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminDeleteCollectionMutation,
    AdminDeleteCollectionMutationVariables
  >({
    mutation: ADMIN_DELETE_COLLECTION_MUTATION,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminDeleteCollection;
}

export async function assignProductsToCollection(
  input: AssignProductsToCollectionInput,
): Promise<AdminCollectionMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminAssignProductsToCollectionMutation,
    AdminAssignProductsToCollectionMutationVariables
  >({
    mutation: ADMIN_ASSIGN_PRODUCTS_TO_COLLECTION_MUTATION,
    variables: { input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminAssignProductsToCollection;
}

export async function removeProductFromCollection(
  productId: number,
): Promise<AdminCollectionMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminRemoveProductFromCollectionMutation,
    AdminRemoveProductFromCollectionMutationVariables
  >({
    mutation: ADMIN_REMOVE_PRODUCT_FROM_COLLECTION_MUTATION,
    variables: { productId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminRemoveProductFromCollection;
}
