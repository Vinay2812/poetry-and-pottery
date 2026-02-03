"use server";

import type {
  ProductDetail,
  ProductOrderBy,
  ProductsResponse,
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

export async function getProductById(
  id: number,
): Promise<ProductDetail | null> {
  return graphqlImpl.getProductById(id);
}

export async function getCategories(): Promise<string[]> {
  return graphqlImpl.getCategories();
}
