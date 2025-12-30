"use server";

import { DEFAULT_PAGE_SIZE } from "@/consts/performance";
import type { PaginatedResponse, WishlistWithProduct } from "@/types";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { getAuthenticatedUserId } from "./auth.action";

export async function getWishlist(
  page: number = 1,
  limit: number = DEFAULT_PAGE_SIZE,
): Promise<
  | { success: true; data: PaginatedResponse<WishlistWithProduct> }
  | { success: false; error: string }
> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  const [items, total] = await Promise.all([
    prisma.wishlist.findMany({
      where: { user_id: userId },
      include: {
        product: {
          include: { product_categories: true },
        },
      },
      orderBy: [
        { product: { available_quantity: "desc" } },
        { created_at: "desc" },
      ],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.wishlist.count({ where: { user_id: userId } }),
  ]);

  return {
    success: true,
    data: {
      data: items as WishlistWithProduct[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getWishlistIds() {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false as const, data: [] };
  }

  const wishlists = await prisma.wishlist.findMany({
    where: { user_id: userId },
    select: { product_id: true },
  });

  return { success: true as const, data: wishlists.map((w) => w.product_id) };
}

export async function getWishlistCount(): Promise<number> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return 0;

  return prisma.wishlist.count({ where: { user_id: userId } });
}

export async function addToWishlist(productId: number) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated" };
  }

  try {
    const item = await prisma.wishlist.create({
      data: { user_id: userId, product_id: productId },
      include: {
        product: {
          include: { product_categories: true },
        },
      },
    });

    revalidatePath("/wishlist");
    revalidatePath("/products");
    return { success: true as const, data: item };
  } catch (error) {
    console.error("Failed to add to wishlist:", error);
    return { success: false as const, error: "Failed to add to wishlist" };
  }
}

export async function removeFromWishlist(productId: number) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated" };
  }

  try {
    await prisma.wishlist.delete({
      where: { user_id_product_id: { user_id: userId, product_id: productId } },
    });
    revalidatePath("/wishlist");
    revalidatePath("/products");
    return { success: true as const };
  } catch (error) {
    console.error("Failed to remove from wishlist:", error);
    return { success: false as const, error: "Failed to remove from wishlist" };
  }
}

export async function toggleWishlist(productId: number) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated" };
  }

  try {
    const existing = await prisma.wishlist.findUnique({
      where: { user_id_product_id: { user_id: userId, product_id: productId } },
    });

    if (existing) {
      await prisma.wishlist.delete({ where: { id: existing.id } });
      revalidatePath("/wishlist");
      revalidatePath("/products");
      return { success: true as const, action: "removed" as const };
    }

    await prisma.wishlist.create({
      data: { user_id: userId, product_id: productId },
    });
    revalidatePath("/wishlist");
    revalidatePath("/products");
    return { success: true as const, action: "added" as const };
  } catch (error) {
    console.error("Failed to toggle wishlist:", error);
    return { success: false as const, error: "Failed to update wishlist" };
  }
}

export async function moveToCart(productId: number) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false as const, error: "Not authenticated" };
  }

  try {
    await prisma.$transaction([
      prisma.cart.upsert({
        where: {
          user_id_product_id: { user_id: userId, product_id: productId },
        },
        update: { quantity: { increment: 1 } },
        create: { user_id: userId, product_id: productId, quantity: 1 },
      }),
      prisma.wishlist.delete({
        where: {
          user_id_product_id: { user_id: userId, product_id: productId },
        },
      }),
    ]);
    revalidatePath("/wishlist");
    revalidatePath("/cart");
    return { success: true as const };
  } catch (error) {
    console.error("Failed to move to cart:", error);
    return { success: false as const, error: "Failed to move to cart" };
  }
}
