"use server";

import type { CartWithProduct } from "@/types";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { getCurrentUserId } from "./auth.action";

export async function getCart() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated", data: [] };
  }

  const items = await prisma.cart.findMany({
    where: { user_id: userId },
    include: {
      product: {
        include: { product_categories: true },
      },
    },
    orderBy: { created_at: "desc" },
  });

  return { success: true as const, data: items };
}

export async function addToCart(productId: number, quantity: number = 1) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated" };
  }

  console.log("Adding to cart:", productId, quantity);

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

    console.log("Item added to cart:", item);

    revalidatePath("/cart");
    return { success: true as const, data: item as CartWithProduct };
  } catch (error) {
    console.error("Failed to add to cart:", error);
    return { success: false as const, error: "Failed to add to cart" };
  }
}

export async function updateCartQuantity(productId: number, quantity: number) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated" };
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
      return { success: true as const, data: null };
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
    return { success: true as const, data: item as CartWithProduct };
  } catch (error) {
    console.error("Failed to update cart:", error);
    return { success: false as const, error: "Failed to update cart" };
  }
}

export async function removeFromCart(productId: number) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated" };
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
    return { success: true as const };
  } catch (error) {
    console.error("Failed to remove from cart:", error);
    return { success: false as const, error: "Failed to remove from cart" };
  }
}

export async function clearCart() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated" };
  }

  try {
    await prisma.cart.deleteMany({
      where: { user_id: userId },
    });
    revalidatePath("/cart");
    return { success: true as const };
  } catch (error) {
    console.error("Failed to clear cart:", error);
    return { success: false as const, error: "Failed to clear cart" };
  }
}
