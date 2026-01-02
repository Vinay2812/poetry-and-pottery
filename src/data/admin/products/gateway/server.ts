"use server";

import { isGraphQL } from "@/consts/env";

import type {
  AdminProductDetail,
  AdminProductMutationResponse,
  AdminProductReviewsResponse,
  AdminProductsFilterInput,
  AdminProductsResponse,
  CreateProductInput,
  UpdateProductInput,
} from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

export async function getProducts(
  filter?: AdminProductsFilterInput,
): Promise<AdminProductsResponse> {
  if (isGraphQL) {
    return graphqlImpl.getProducts(filter);
  }
  // Convert InputMaybe (null | undefined) to undefined for action
  const normalizedFilter = filter
    ? {
        search: filter.search ?? undefined,
        category: filter.category ?? undefined,
        isActive: filter.isActive ?? undefined,
        page: filter.page ?? undefined,
        limit: filter.limit ?? undefined,
      }
    : undefined;
  return actionImpl.getProducts(normalizedFilter);
}

export async function getProductById(
  id: number,
): Promise<AdminProductDetail | null> {
  if (isGraphQL) {
    return graphqlImpl.getProductById(id);
  }
  return actionImpl.getProductById(id);
}

export async function getProductReviews(
  productId: number,
): Promise<AdminProductReviewsResponse> {
  if (isGraphQL) {
    return graphqlImpl.getProductReviews(productId);
  }
  return actionImpl.getProductReviews(productId);
}

export async function getAllCategories(): Promise<string[]> {
  if (isGraphQL) {
    return graphqlImpl.getAllCategories();
  }
  return actionImpl.getAllCategories();
}

export async function createProduct(
  input: CreateProductInput,
): Promise<AdminProductMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.createProduct(input);
  }
  return actionImpl.createProduct(input);
}

export async function updateProduct(
  id: number,
  input: UpdateProductInput,
): Promise<AdminProductMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.updateProduct(id, input);
  }
  return actionImpl.updateProduct(id, input);
}

export async function deleteProduct(
  id: number,
): Promise<AdminProductMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.deleteProduct(id);
  }
  return actionImpl.deleteProduct(id);
}

export async function toggleProductActive(
  id: number,
): Promise<AdminProductMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.toggleProductActive(id);
  }
  return actionImpl.toggleProductActive(id);
}

export async function deleteProductReview(
  reviewId: number,
): Promise<AdminProductMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.deleteProductReview(reviewId);
  }
  return actionImpl.deleteProductReview(reviewId);
}
