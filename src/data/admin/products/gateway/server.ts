"use server";

import type {
  AdminProductCollection,
  AdminProductDetail,
  AdminProductMutationResponse,
  AdminProductReviewsResponse,
  AdminProductsFilterInput,
  AdminProductsResponse,
  CreateProductInput,
  UpdateProductInput,
} from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export async function getProducts(
  filter?: AdminProductsFilterInput,
): Promise<AdminProductsResponse> {
  return graphqlImpl.getProducts(filter);
}

export async function getProductById(
  id: number,
): Promise<AdminProductDetail | null> {
  return graphqlImpl.getProductById(id);
}

export async function getProductReviews(
  productId: number,
): Promise<AdminProductReviewsResponse> {
  return graphqlImpl.getProductReviews(productId);
}

export async function getAllCategories(): Promise<string[]> {
  return graphqlImpl.getAllCategories();
}

export async function getAllCollections(): Promise<AdminProductCollection[]> {
  return graphqlImpl.getAllCollections();
}

export async function createProduct(
  input: CreateProductInput,
): Promise<AdminProductMutationResponse> {
  return graphqlImpl.createProduct(input);
}

export async function updateProduct(
  id: number,
  input: UpdateProductInput,
): Promise<AdminProductMutationResponse> {
  return graphqlImpl.updateProduct(id, input);
}

export async function deleteProduct(
  id: number,
): Promise<AdminProductMutationResponse> {
  return graphqlImpl.deleteProduct(id);
}

export async function toggleProductActive(
  id: number,
): Promise<AdminProductMutationResponse> {
  return graphqlImpl.toggleProductActive(id);
}

export type {
  AdminBulkDeleteProductsResponse,
  BulkDeleteProductResult,
} from "../server/graphql";

export async function bulkDeleteProducts(
  ids: number[],
): Promise<graphqlImpl.AdminBulkDeleteProductsResponse> {
  return graphqlImpl.bulkDeleteProducts(ids);
}
