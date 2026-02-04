"use server";

import type {
  ProductDetail,
  ProductOrderBy,
  ProductsResponse,
} from "@/graphql/generated/types";
import { cacheLife, cacheTag } from "next/cache";

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
  "use cache";
  cacheTag("products", "products:list");
  cacheLife("products");
  return graphqlImpl.getProducts(params);
}

export async function getProductById(
  id: number,
): Promise<ProductDetail | null> {
  "use cache";
  cacheTag("products", `product:${id}`);
  cacheLife("products");
  return graphqlImpl.getProductById(id);
}

export async function getCategories(): Promise<string[]> {
  "use cache";
  cacheTag("products", "products:categories");
  cacheLife("products");
  return graphqlImpl.getCategories();
}
