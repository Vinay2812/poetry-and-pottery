import type { ProductWithCategories, WishlistWithProduct } from "@/types";

import { prisma } from "@/lib/prisma";

export class WishlistService {
  /**
   * Get wishlist items for a user by auth ID
   */
  static async getWishlistItemsByAuthId(
    authId: string,
  ): Promise<ProductWithCategories[]> {
    const user = await prisma.user.findUnique({
      where: { auth_id: authId },
      select: { id: true },
    });

    if (!user) return [];

    const items = await prisma.wishlist.findMany({
      where: { user_id: user.id },
      include: {
        product: {
          include: { product_categories: true },
        },
      },
      orderBy: { created_at: "desc" },
    });

    return items.map((item) => item.product) as ProductWithCategories[];
  }

  /**
   * Get wishlist items for a user by user ID
   */
  static async getWishlistByUserId(
    userId: number,
  ): Promise<WishlistWithProduct[]> {
    return prisma.wishlist.findMany({
      where: { user_id: userId },
      include: { product: true },
      orderBy: { created_at: "desc" },
    }) as Promise<WishlistWithProduct[]>;
  }

  /**
   * Get wishlist product IDs only (lightweight)
   */
  static async getWishlistIds(userId: number): Promise<number[]> {
    const items = await prisma.wishlist.findMany({
      where: { user_id: userId },
      select: { product_id: true },
    });
    return items.map((item) => item.product_id);
  }

  /**
   * Add item to wishlist
   */
  static async addToWishlist(
    userId: number,
    productId: number,
  ): Promise<WishlistWithProduct> {
    return prisma.wishlist.create({
      data: {
        user_id: userId,
        product_id: productId,
      },
      include: { product: true },
    }) as Promise<WishlistWithProduct>;
  }

  /**
   * Remove item from wishlist
   */
  static async removeFromWishlist(
    userId: number,
    productId: number,
  ): Promise<void> {
    await prisma.wishlist.delete({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: productId,
        },
      },
    });
  }

  /**
   * Toggle wishlist item (add if not exists, remove if exists)
   */
  static async toggleWishlist(
    userId: number,
    productId: number,
  ): Promise<{ action: "added" | "removed"; item?: WishlistWithProduct }> {
    const existing = await prisma.wishlist.findUnique({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: productId,
        },
      },
    });

    if (existing) {
      await this.removeFromWishlist(userId, productId);
      return { action: "removed" };
    } else {
      const item = await this.addToWishlist(userId, productId);
      return { action: "added", item };
    }
  }

  /**
   * Check if product is in wishlist
   */
  static async isInWishlist(
    userId: number,
    productId: number,
  ): Promise<boolean> {
    const item = await prisma.wishlist.findUnique({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: productId,
        },
      },
    });
    return !!item;
  }

  /**
   * Get wishlist count
   */
  static async getWishlistCount(userId: number): Promise<number> {
    return prisma.wishlist.count({
      where: { user_id: userId },
    });
  }

  /**
   * Clear entire wishlist for a user
   */
  static async clearWishlist(userId: number): Promise<void> {
    await prisma.wishlist.deleteMany({
      where: { user_id: userId },
    });
  }

  /**
   * Sync wishlist from localStorage (add items that don't exist)
   */
  static async syncFromLocalStorage(
    userId: number,
    localProductIds: number[],
  ): Promise<WishlistWithProduct[]> {
    // Get existing items
    const existingIds = await this.getWishlistIds(userId);
    const newIds = localProductIds.filter((id) => !existingIds.includes(id));

    // Add new items
    if (newIds.length > 0) {
      await prisma.wishlist.createMany({
        data: newIds.map((productId) => ({
          user_id: userId,
          product_id: productId,
        })),
        skipDuplicates: true,
      });
    }

    return this.getWishlistByUserId(userId);
  }

  /**
   * Move item from wishlist to cart
   */
  static async moveToCart(userId: number, productId: number): Promise<void> {
    await prisma.$transaction([
      // Add to cart
      prisma.cart.upsert({
        where: {
          user_id_product_id: {
            user_id: userId,
            product_id: productId,
          },
        },
        update: {
          quantity: { increment: 1 },
        },
        create: {
          user_id: userId,
          product_id: productId,
          quantity: 1,
        },
      }),
      // Remove from wishlist
      prisma.wishlist.delete({
        where: {
          user_id_product_id: {
            user_id: userId,
            product_id: productId,
          },
        },
      }),
    ]);
  }
}
