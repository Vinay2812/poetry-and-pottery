"use server";

import type {
  BestSellersResponse,
  CategoryWithImage,
  ProductDetail,
  ProductOrderBy,
  ProductsResponse,
  RecommendedProductsResponse,
} from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export async function getProducts(params: {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string[];
  materials?: string[];
  collection_ids?: number[];
  min_price?: number;
  max_price?: number;
  order_by?: ProductOrderBy;
  archive?: boolean;
}): Promise<ProductsResponse> {
  return graphqlImpl.getProducts(params);
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetail | null> {
  return graphqlImpl.getProductBySlug(slug);
}

export async function getProductById(
  id: number,
): Promise<ProductDetail | null> {
  return graphqlImpl.getProductById(id);
}

export async function getBestSellers(params: {
  limit?: number;
  page?: number;
}): Promise<BestSellersResponse> {
  return graphqlImpl.getBestSellers(params);
}

export async function getRecommendedProducts(params: {
  limit?: number;
  page?: number;
  productId?: number;
}): Promise<RecommendedProductsResponse> {
  return graphqlImpl.getRecommendedProducts(params);
}

export async function getCategories(): Promise<string[]> {
  return graphqlImpl.getCategories();
}

export async function getCategoriesWithImages(): Promise<CategoryWithImage[]> {
  return graphqlImpl.getCategoriesWithImages();
}

export async function getMaterials(): Promise<string[]> {
  return graphqlImpl.getMaterials();
}
