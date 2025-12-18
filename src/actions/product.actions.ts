"use server";

import { ProductService } from "@/services/product.service";
import type { ProductFilterParams } from "@/types";

export async function getProducts(params: ProductFilterParams = {}) {
  return ProductService.getProducts(params);
}

export async function getProductBySlug(slug: string) {
  return ProductService.getProductBySlug(slug);
}

export async function getProductById(id: number) {
  return ProductService.getProductById(id);
}

export async function getRelatedProducts(
  productId: number,
  category: string,
  limit?: number,
) {
  return ProductService.getRelatedProducts(productId, category, limit);
}

export async function getCategories() {
  return ProductService.getCategories();
}

export async function getMaterials() {
  return ProductService.getMaterials();
}

export async function getFeaturedProducts(limit?: number) {
  return ProductService.getFeaturedProducts(limit);
}
