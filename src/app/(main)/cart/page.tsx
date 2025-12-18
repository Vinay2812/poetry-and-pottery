import { CartService, ProductService } from "@/services";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

import { CartClient } from "@/components/cart";

export const metadata: Metadata = {
  title: "Shopping Cart | Poetry & Pottery",
  description:
    "Review your cart and proceed to checkout for your handcrafted pottery selections.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CartPage() {
  const { userId } = await auth();

  // Fetch cart items if user is authenticated
  let cartItems: {
    product: Awaited<
      ReturnType<typeof CartService.getCartItemsByAuthId>
    >[number]["product"];
    quantity: number;
  }[] = [];
  if (userId) {
    try {
      cartItems = await CartService.getCartItemsByAuthId(userId);
    } catch {
      // User not found in DB or other error
      cartItems = [];
    }
  }

  // Fetch recommended products
  const recommendedProducts = await ProductService.getFeaturedProducts(4);

  return (
    <CartClient
      initialCartItems={cartItems}
      recommendedProducts={recommendedProducts}
    />
  );
}
