"use server";

import { isGraphQL } from "@/consts/env";

import type {
  BestSellersResponse,
  CategoryWithImage,
  ProductDetail,
  ProductsResponse,
  RecommendedProductsResponse,
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
  order_by?:
    | "featured"
    | "new"
    | "best_sellers"
    | "price_low_to_high"
    | "price_high_to_low";
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

export async function getBestSellers(params: {
  limit?: number;
  page?: number;
}): Promise<BestSellersResponse> {
  if (isGraphQL) {
    return graphqlImpl.getBestSellers(params);
  }
  return actionImpl.getBestSellers(params);
}

export async function getRecommendedProducts(params: {
  limit?: number;
  page?: number;
  productId?: number;
}): Promise<RecommendedProductsResponse> {
  if (isGraphQL) {
    return graphqlImpl.getRecommendedProducts(params);
  }
  return actionImpl.getRecommendedProducts(params);
}

export async function getCategories(): Promise<string[]> {
  if (isGraphQL) {
    return graphqlImpl.getCategories();
  }
  return actionImpl.getCategories();
}

export async function getCategoriesWithImages(): Promise<CategoryWithImage[]> {
  return graphqlImpl.getCategoriesWithImages();
}

export async function getMaterials(): Promise<string[]> {
  if (isGraphQL) {
    return graphqlImpl.getMaterials();
  }
  return actionImpl.getMaterials();
}
