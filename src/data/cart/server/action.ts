"use server";

import { getAuthenticatedUserId } from "@/actions/auth.action";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

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
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { items: [], total: 0, subtotal: 0 };
  }

  const cartItems = await prisma.cart.findMany({
    where: { user_id: userId },
    include: {
      product: {
        include: { product_categories: true },
      },
    },
    orderBy: { created_at: "desc" },
  });

  const items = cartItems.map(mapToCartItem);
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

export async function getCartCount(): Promise<number> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return 0;

  return prisma.cart.count({
    where: { user_id: userId },
  });
}

export async function addToCart(
  productId: number,
  quantity: number = 1,
): Promise<CartMutationResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, item: null };
  }

  try {
    const item = await prisma.cart.upsert({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: productId,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        user_id: userId,
        product_id: productId,
        quantity,
      },
      include: {
        product: {
          include: { product_categories: true },
        },
      },
    });

    revalidatePath("/cart");
    return {
      success: true,
      item: mapToCartItem(item),
    };
  } catch (error) {
    console.error("Failed to add to cart:", error);
    return { success: false, item: null };
  }
}

export async function updateCartQuantity(
  productId: number,
  quantity: number,
): Promise<CartMutationResponse> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, item: null };
  }

  try {
    if (quantity <= 0) {
      await prisma.cart.delete({
        where: {
          user_id_product_id: {
            user_id: userId,
            product_id: productId,
          },
        },
      });
      revalidatePath("/cart");
      return { success: true, item: null };
    }

    const item = await prisma.cart.update({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: productId,
        },
      },
      data: { quantity },
      include: {
        product: {
          include: { product_categories: true },
        },
      },
    });

    revalidatePath("/cart");
    return {
      success: true,
      item: mapToCartItem(item),
    };
  } catch (error) {
    console.error("Failed to update cart:", error);
    return { success: false, item: null };
  }
}

export async function removeFromCart(productId: number): Promise<boolean> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return false;
  }

  try {
    await prisma.cart.delete({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: productId,
        },
      },
    });
    revalidatePath("/cart");
    return true;
  } catch (error) {
    console.error("Failed to remove from cart:", error);
    return false;
  }
}

export async function clearCart(): Promise<boolean> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return false;
  }

  try {
    await prisma.cart.deleteMany({
      where: { user_id: userId },
    });
    revalidatePath("/cart");
    return true;
  } catch (error) {
    console.error("Failed to clear cart:", error);
    return false;
  }
}
