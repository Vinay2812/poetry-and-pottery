"use server";

import { getClient } from "@/lib/apollo";

import {
  ADMIN_BULK_DELETE_PRODUCTS_MUTATION,
  ADMIN_CREATE_PRODUCT_MUTATION,
  ADMIN_DELETE_PRODUCT_MUTATION,
  ADMIN_TOGGLE_PRODUCT_ACTIVE_MUTATION,
  ADMIN_UPDATE_PRODUCT_MUTATION,
} from "@/graphql/admin/products.mutation";
import {
  ADMIN_ALL_CATEGORIES_QUERY,
  ADMIN_ALL_COLLECTIONS_QUERY,
  ADMIN_PRODUCTS_QUERY,
  ADMIN_PRODUCT_BY_ID_QUERY,
  ADMIN_PRODUCT_REVIEWS_QUERY,
} from "@/graphql/admin/products.query";
import type {
  AdminAllCategoriesQuery,
  AdminAllCollectionsQuery,
  AdminCreateProductMutation,
  AdminCreateProductMutationVariables,
  AdminDeleteProductMutation,
  AdminDeleteProductMutationVariables,
  AdminProductByIdQuery,
  AdminProductByIdQueryVariables,
  AdminProductCollection,
  AdminProductDetail,
  AdminProductMutationResponse,
  AdminProductReviewsQuery,
  AdminProductReviewsQueryVariables,
  AdminProductReviewsResponse,
  AdminProductsFilterInput,
  AdminProductsQuery,
  AdminProductsQueryVariables,
  AdminProductsResponse,
  AdminToggleProductActiveMutation,
  AdminToggleProductActiveMutationVariables,
  AdminUpdateProductMutation,
  AdminUpdateProductMutationVariables,
  CreateProductInput,
  UpdateProductInput,
} from "@/graphql/generated/types";

export async function getProducts(
  filter?: AdminProductsFilterInput,
): Promise<AdminProductsResponse> {
  const client = getClient();

  const result = await client.query<
    AdminProductsQuery,
    AdminProductsQueryVariables
  >({
    query: ADMIN_PRODUCTS_QUERY,
    variables: { filter },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminProducts;
}

export async function getProductById(
  id: number,
): Promise<AdminProductDetail | null> {
  const client = getClient();

  const result = await client.query<
    AdminProductByIdQuery,
    AdminProductByIdQueryVariables
  >({
    query: ADMIN_PRODUCT_BY_ID_QUERY,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminProductById ?? null;
}

export async function getProductReviews(
  productId: number,
): Promise<AdminProductReviewsResponse> {
  const client = getClient();

  const result = await client.query<
    AdminProductReviewsQuery,
    AdminProductReviewsQueryVariables
  >({
    query: ADMIN_PRODUCT_REVIEWS_QUERY,
    variables: { productId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminProductReviews;
}

export async function getAllCategories(): Promise<string[]> {
  const client = getClient();

  const result = await client.query<AdminAllCategoriesQuery>({
    query: ADMIN_ALL_CATEGORIES_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminAllCategories;
}

export async function getAllCollections(): Promise<AdminProductCollection[]> {
  const client = getClient();

  const result = await client.query<AdminAllCollectionsQuery>({
    query: ADMIN_ALL_COLLECTIONS_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminAllCollections;
}

export async function createProduct(
  input: CreateProductInput,
): Promise<AdminProductMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminCreateProductMutation,
    AdminCreateProductMutationVariables
  >({
    mutation: ADMIN_CREATE_PRODUCT_MUTATION,
    variables: { input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminCreateProduct;
}

export async function updateProduct(
  id: number,
  input: UpdateProductInput,
): Promise<AdminProductMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateProductMutation,
    AdminUpdateProductMutationVariables
  >({
    mutation: ADMIN_UPDATE_PRODUCT_MUTATION,
    variables: { id, input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateProduct;
}

export async function deleteProduct(
  id: number,
): Promise<AdminProductMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminDeleteProductMutation,
    AdminDeleteProductMutationVariables
  >({
    mutation: ADMIN_DELETE_PRODUCT_MUTATION,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminDeleteProduct;
}

export async function toggleProductActive(
  id: number,
): Promise<AdminProductMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminToggleProductActiveMutation,
    AdminToggleProductActiveMutationVariables
  >({
    mutation: ADMIN_TOGGLE_PRODUCT_ACTIVE_MUTATION,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminToggleProductActive;
}

export interface BulkDeleteProductResult {
  id: number;
  success: boolean;
  action: string;
  error: string | null;
}

export interface AdminBulkDeleteProductsResponse {
  success: boolean;
  totalRequested: number;
  deletedCount: number;
  deactivatedCount: number;
  failedCount: number;
  results: BulkDeleteProductResult[];
  error: string | null;
}

export async function bulkDeleteProducts(
  ids: number[],
): Promise<AdminBulkDeleteProductsResponse> {
  const client = getClient();

  const result = await client.mutate<{
    adminBulkDeleteProducts: AdminBulkDeleteProductsResponse;
  }>({
    mutation: ADMIN_BULK_DELETE_PRODUCTS_MUTATION,
    variables: { input: { ids } },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminBulkDeleteProducts;
}
