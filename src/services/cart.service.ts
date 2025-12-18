import type { Cart, CartWithProduct, ProductWithCategories } from "@/types";

import { prisma } from "@/lib/prisma";

interface CartItemWithProductCategories {
  product: ProductWithCategories;
  quantity: number;
}

export class CartService {
  /**
   * Get cart items for a user by auth ID (with product categories)
   */
  static async getCartItemsByAuthId(
    authId: string,
  ): Promise<CartItemWithProductCategories[]> {
    const user = await prisma.user.findUnique({
      where: { auth_id: authId },
      select: { id: true },
    });

    if (!user) return [];

    const items = await prisma.cart.findMany({
      where: { user_id: user.id },
      include: {
        product: {
          include: { product_categories: true },
        },
      },
      orderBy: { created_at: "desc" },
    });

    return items.map((item) => ({
      product: item.product as ProductWithCategories,
      quantity: item.quantity,
    }));
  }

  /**
   * Get cart items for a user by user ID
   */
  static async getCartByUserId(userId: number): Promise<CartWithProduct[]> {
    return prisma.cart.findMany({
      where: { user_id: userId },
      include: { product: true },
      orderBy: { created_at: "desc" },
    }) as Promise<CartWithProduct[]>;
  }

  /**
   * Add item to cart (or increment quantity if exists)
   */
  static async addToCart(
    userId: number,
    productId: number,
    quantity: number = 1,
  ): Promise<CartWithProduct> {
    return prisma.cart.upsert({
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
      include: { product: true },
    }) as Promise<CartWithProduct>;
  }

  /**
   * Update cart item quantity
   */
  static async updateQuantity(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<CartWithProduct | null> {
    if (quantity <= 0) {
      await this.removeFromCart(userId, productId);
      return null;
    }

    return prisma.cart.update({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: productId,
        },
      },
      data: { quantity },
      include: { product: true },
    }) as Promise<CartWithProduct>;
  }

  /**
   * Remove item from cart
   */
  static async removeFromCart(
    userId: number,
    productId: number,
  ): Promise<void> {
    await prisma.cart.delete({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: productId,
        },
      },
    });
  }

  /**
   * Clear entire cart for a user
   */
  static async clearCart(userId: number): Promise<void> {
    await prisma.cart.deleteMany({
      where: { user_id: userId },
    });
  }

  /**
   * Get cart item count
   */
  static async getCartCount(userId: number): Promise<number> {
    const result = await prisma.cart.aggregate({
      where: { user_id: userId },
      _sum: { quantity: true },
    });
    return result._sum.quantity ?? 0;
  }

  /**
   * Get cart total
   */
  static async getCartTotal(userId: number): Promise<number> {
    const items = await prisma.cart.findMany({
      where: { user_id: userId },
      include: { product: { select: { price: true } } },
    });

    return items.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0,
    );
  }

  /**
   * Check if product is in cart
   */
  static async isInCart(userId: number, productId: number): Promise<boolean> {
    const item = await prisma.cart.findUnique({
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
   * Get cart item
   */
  static async getCartItem(
    userId: number,
    productId: number,
  ): Promise<Cart | null> {
    return prisma.cart.findUnique({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: productId,
        },
      },
    });
  }

  /**
   * Sync cart from localStorage (merge with existing)
   */
  static async syncFromLocalStorage(
    userId: number,
    localItems: { productId: number; quantity: number }[],
  ): Promise<CartWithProduct[]> {
    // Use transaction to ensure consistency
    await prisma.$transaction(
      localItems.map((item) =>
        prisma.cart.upsert({
          where: {
            user_id_product_id: {
              user_id: userId,
              product_id: item.productId,
            },
          },
          update: {
            quantity: { increment: item.quantity },
          },
          create: {
            user_id: userId,
            product_id: item.productId,
            quantity: item.quantity,
          },
        }),
      ),
    );

    return this.getCartByUserId(userId);
  }
}
