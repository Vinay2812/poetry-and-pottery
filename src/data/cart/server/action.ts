"use server";

import {
  addToCart as addToCartAction,
  clearCart as clearCartAction,
  getCart as getCartAction,
  removeFromCart as removeFromCartAction,
  updateCartQuantity as updateCartQuantityAction,
} from "@/actions/cart.actions";

import type {
  CartItem,
  CartMutationResponse,
  CartResponse,
} from "@/graphql/generated/types";

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
    in_wishlist: false,
    available_quantity: product.available_quantity,
    total_quantity: product.total_quantity,
    color_code: product.color_code,
    color_name: product.color_name,
  };
}

function mapToCartItem(item: {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
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
}): CartItem {
  return {
    id: item.id,
    user_id: item.user_id,
    product_id: item.product_id,
    quantity: item.quantity,
    created_at: item.created_at,
    updated_at: item.updated_at,
    product: mapToProductBase(item.product),
  };
}

export async function getCart(): Promise<CartResponse> {
  const result = await getCartAction();

  if (!result.success || !result.data) {
    return { items: [], total: 0, subtotal: 0 };
  }

  const items = result.data.map(mapToCartItem);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return {
    items,
    total: items.length,
    subtotal,
  };
}

export async function addToCart(
  productId: number,
  quantity: number = 1,
): Promise<CartMutationResponse> {
  const result = await addToCartAction(productId, quantity);

  if (!result.success || !result.data) {
    return { success: false, item: null };
  }

  return {
    success: true,
    item: mapToCartItem(result.data),
  };
}

export async function updateCartQuantity(
  productId: number,
  quantity: number,
): Promise<CartMutationResponse> {
  const result = await updateCartQuantityAction(productId, quantity);

  if (!result.success) {
    return { success: false, item: null };
  }

  if (!result.data) {
    return { success: true, item: null };
  }

  return {
    success: true,
    item: mapToCartItem(result.data),
  };
}

export async function removeFromCart(productId: number): Promise<boolean> {
  const result = await removeFromCartAction(productId);
  return result.success;
}

export async function clearCart(): Promise<boolean> {
  const result = await clearCartAction();
  return result.success;
}
