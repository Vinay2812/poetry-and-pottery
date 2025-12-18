"use server";

import { CartService } from "@/services/cart.service";
import { UserService } from "@/services/user.service";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function getCurrentUserId(): Promise<number | null> {
  const { userId: authId } = await auth();
  if (!authId) return null;

  const user = await UserService.getUserByAuthId(authId);
  return user?.id ?? null;
}

export async function getCart() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated", data: [] };
  }

  const items = await CartService.getCartByUserId(userId);
  return { success: true, data: items };
}

export async function addToCart(productId: number, quantity: number = 1) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const item = await CartService.addToCart(userId, productId, quantity);
    revalidatePath("/cart");
    return { success: true, data: item };
  } catch (error) {
    console.error("Failed to add to cart:", error);
    return { success: false, error: "Failed to add to cart" };
  }
}

export async function updateCartQuantity(productId: number, quantity: number) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const item = await CartService.updateQuantity(userId, productId, quantity);
    revalidatePath("/cart");
    return { success: true, data: item };
  } catch (error) {
    console.error("Failed to update cart:", error);
    return { success: false, error: "Failed to update cart" };
  }
}

export async function removeFromCart(productId: number) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    await CartService.removeFromCart(userId, productId);
    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Failed to remove from cart:", error);
    return { success: false, error: "Failed to remove from cart" };
  }
}

export async function clearCart() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    await CartService.clearCart(userId);
    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Failed to clear cart:", error);
    return { success: false, error: "Failed to clear cart" };
  }
}

export async function getCartCount() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, count: 0 };
  }

  const count = await CartService.getCartCount(userId);
  return { success: true, count };
}

export async function syncCartFromLocal(
  items: { productId: number; quantity: number }[],
) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const syncedItems = await CartService.syncFromLocalStorage(userId, items);
    revalidatePath("/cart");
    return { success: true, data: syncedItems };
  } catch (error) {
    console.error("Failed to sync cart:", error);
    return { success: false, error: "Failed to sync cart" };
  }
}
