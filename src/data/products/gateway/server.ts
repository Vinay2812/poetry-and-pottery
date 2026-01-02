"use server";

import { isGraphQL } from "@/consts/env";

import type {
  ProductBase,
  ProductDetail,
  ProductsResponse,
} from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

export async function getProducts(params: {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string[];
  materials?: string[];
  min_price?: number;
  max_price?: number;
  order_by?: "featured" | "new" | "price_low_to_high" | "price_high_to_low";
}): Promise<ProductsResponse> {
  if (isGraphQL) {
    return graphqlImpl.getProducts(params);
  }
  return actionImpl.getProducts(params);
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetail | null> {
  if (isGraphQL) {
    return graphqlImpl.getProductBySlug(slug);
  }
  return actionImpl.getProductBySlug(slug);
}

export async function getProductById(
  id: number,
): Promise<ProductDetail | null> {
  if (isGraphQL) {
    return graphqlImpl.getProductById(id);
  }
  return actionImpl.getProductById(id);
}

export async function getRelatedProducts(
  productId: number,
  category: string,
  limit: number = 8,
): Promise<ProductBase[]> {
  if (isGraphQL) {
    return graphqlImpl.getRelatedProducts(productId, category, limit);
  }
  return actionImpl.getRelatedProducts(productId, category, limit);
}

export async function getFeaturedProducts(
  limit: number = 8,
): Promise<ProductBase[]> {
  if (isGraphQL) {
    return graphqlImpl.getFeaturedProducts(limit);
  }
  return actionImpl.getFeaturedProducts(limit);
}

export async function getBestSellers(
  limit: number = 8,
): Promise<ProductBase[]> {
  if (isGraphQL) {
    return graphqlImpl.getBestSellers(limit);
  }
  return actionImpl.getBestSellers(limit);
}

export async function getRecommendedProducts(
  limit: number = 10,
): Promise<ProductBase[]> {
  if (isGraphQL) {
    return graphqlImpl.getRecommendedProducts(limit);
  }
  return actionImpl.getRecommendedProducts(limit);
}

export async function getCategories(): Promise<string[]> {
  if (isGraphQL) {
    return graphqlImpl.getCategories();
  }
  return actionImpl.getCategories();
}

export async function getMaterials(): Promise<string[]> {
  if (isGraphQL) {
    return graphqlImpl.getMaterials();
  }
  return actionImpl.getMaterials();
}
