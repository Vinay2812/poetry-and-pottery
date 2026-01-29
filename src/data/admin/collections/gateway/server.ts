"use server";

import type {
  AdminCollectionDetail,
  AdminCollectionMutationResponse,
  AdminCollectionsFilterInput,
  AdminCollectionsResponse,
  AssignProductsToCollectionInput,
  CreateCollectionInput,
  UpdateCollectionInput,
} from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export async function getCollections(
  filter?: AdminCollectionsFilterInput,
): Promise<AdminCollectionsResponse> {
  return graphqlImpl.getCollections(filter);
}

export async function getCollectionById(
  id: number,
): Promise<AdminCollectionDetail | null> {
  return graphqlImpl.getCollectionById(id);
}

export async function createCollection(
  input: CreateCollectionInput,
): Promise<AdminCollectionMutationResponse> {
  return graphqlImpl.createCollection(input);
}

export async function updateCollection(
  id: number,
  input: UpdateCollectionInput,
): Promise<AdminCollectionMutationResponse> {
  return graphqlImpl.updateCollection(id, input);
}

export async function deleteCollection(
  id: number,
): Promise<AdminCollectionMutationResponse> {
  return graphqlImpl.deleteCollection(id);
}

export async function assignProductsToCollection(
  input: AssignProductsToCollectionInput,
): Promise<AdminCollectionMutationResponse> {
  return graphqlImpl.assignProductsToCollection(input);
}

export async function removeProductFromCollection(
  productId: number,
): Promise<AdminCollectionMutationResponse> {
  return graphqlImpl.removeProductFromCollection(productId);
}
