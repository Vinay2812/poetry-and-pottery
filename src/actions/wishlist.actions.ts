"use server";

import { UserService } from "@/services/user.service";
import { WishlistService } from "@/services/wishlist.service";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function getCurrentUserId(): Promise<number | null> {
  const { userId: authId } = await auth();
  if (!authId) return null;

  const user = await UserService.getUserByAuthId(authId);
  return user?.id ?? null;
}

export async function getWishlist() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated", data: [] };
  }

  const items = await WishlistService.getWishlistByUserId(userId);
  return { success: true, data: items };
}

export async function getWishlistIds() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, data: [] };
  }

  const ids = await WishlistService.getWishlistIds(userId);
  return { success: true, data: ids };
}

export async function toggleWishlist(productId: number) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const result = await WishlistService.toggleWishlist(userId, productId);
    revalidatePath("/wishlist");
    revalidatePath("/products");
    return { success: true, action: result.action };
  } catch (error) {
    console.error("Failed to toggle wishlist:", error);
    return { success: false, error: "Failed to update wishlist" };
  }
}

export async function addToWishlist(productId: number) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const item = await WishlistService.addToWishlist(userId, productId);
    revalidatePath("/wishlist");
    revalidatePath("/products");
    return { success: true, data: item };
  } catch (error) {
    console.error("Failed to add to wishlist:", error);
    return { success: false, error: "Failed to add to wishlist" };
  }
}

export async function removeFromWishlist(productId: number) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    await WishlistService.removeFromWishlist(userId, productId);
    revalidatePath("/wishlist");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to remove from wishlist:", error);
    return { success: false, error: "Failed to remove from wishlist" };
  }
}

export async function clearWishlist() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    await WishlistService.clearWishlist(userId);
    revalidatePath("/wishlist");
    return { success: true };
  } catch (error) {
    console.error("Failed to clear wishlist:", error);
    return { success: false, error: "Failed to clear wishlist" };
  }
}

export async function getWishlistCount() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, count: 0 };
  }

  const count = await WishlistService.getWishlistCount(userId);
  return { success: true, count };
}

export async function syncWishlistFromLocal(productIds: number[]) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const items = await WishlistService.syncFromLocalStorage(
      userId,
      productIds,
    );
    revalidatePath("/wishlist");
    return { success: true, data: items };
  } catch (error) {
    console.error("Failed to sync wishlist:", error);
    return { success: false, error: "Failed to sync wishlist" };
  }
}

export async function moveToCart(productId: number) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    await WishlistService.moveToCart(userId, productId);
    revalidatePath("/wishlist");
    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Failed to move to cart:", error);
    return { success: false, error: "Failed to move to cart" };
  }
}
