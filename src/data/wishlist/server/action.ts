"use server";

import {
  addToWishlist as addToWishlistAction,
  getWishlist as getWishlistAction,
  getWishlistIds as getWishlistIdsAction,
  moveToCart as moveToCartAction,
  removeFromWishlist as removeFromWishlistAction,
  toggleWishlist as toggleWishlistAction,
} from "@/actions/wishlist.actions";

import type {
  ToggleWishlistResponse,
  WishlistItem,
  WishlistMutationResponse,
  WishlistResponse,
} from "@/graphql/generated/types";
import { ToggleAction } from "@/graphql/generated/types";

function mapToProductBase(product: {
  id: number;
  slug: string;
  name: string;
  price: number;
  image_urls: string[];
  material: string;
  available_quantity: number;
  total_quantity: number;
  color_code: string;
  color_name: string;
  reviews?: { rating: number }[];
}) {
  const reviews = product.reviews ?? [];
  const reviewsCount = reviews.length;
  const avgRating =
    reviewsCount > 0
      ? Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviewsCount)
      : 0;

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image_urls: product.image_urls,
    reviews_count: reviewsCount,
    avg_rating: avgRating,
    material: product.material,
    in_wishlist: true,
    available_quantity: product.available_quantity,
    total_quantity: product.total_quantity,
    color_code: product.color_code,
    color_name: product.color_name,
  };
}

function mapToWishlistItem(item: {
  id: number;
  user_id: number;
  product_id: number;
  created_at: Date;
  updated_at: Date;
  product: {
    id: number;
    slug: string;
    name: string;
    price: number;
    image_urls: string[];
    material: string;
    available_quantity: number;
    total_quantity: number;
    color_code: string;
    color_name: string;
  };
}): WishlistItem {
  return {
    id: item.id,
    user_id: item.user_id,
    product_id: item.product_id,
    created_at: item.created_at,
    updated_at: item.updated_at,
    product: mapToProductBase(item.product),
  };
}

export async function getWishlist(
  page: number = 1,
  limit: number = 12,
): Promise<WishlistResponse> {
  const result = await getWishlistAction(page, limit);

  if (!result.success || !result.data) {
    return { data: [], total: 0, page: 1, total_pages: 0 };
  }

  return {
    data: result.data.data.map(mapToWishlistItem),
    total: result.data.total,
    page: result.data.page,
    total_pages: result.data.totalPages,
  };
}

export async function getWishlistIds(): Promise<number[]> {
  const result = await getWishlistIdsAction();

  if (!result.success) {
    return [];
  }

  return result.data;
}

export async function addToWishlist(
  productId: number,
): Promise<WishlistMutationResponse> {
  const result = await addToWishlistAction(productId);

  if (!result.success || !result.data) {
    return { success: false, item: null };
  }

  return {
    success: true,
    item: mapToWishlistItem(result.data),
  };
}

export async function removeFromWishlist(productId: number): Promise<boolean> {
  const result = await removeFromWishlistAction(productId);
  return result.success;
}

export async function toggleWishlist(
  productId: number,
): Promise<ToggleWishlistResponse> {
  const result = await toggleWishlistAction(productId);

  if (!result.success) {
    return { success: false, action: ToggleAction.Removed, item: null };
  }

  return {
    success: true,
    action:
      result.action === "added" ? ToggleAction.Added : ToggleAction.Removed,
    item: null,
  };
}

export async function moveToCart(productId: number): Promise<boolean> {
  const result = await moveToCartAction(productId);
  return result.success;
}
