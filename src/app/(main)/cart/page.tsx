import { getCart, getFeaturedProducts } from "@/actions";
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
  const [cartResult, recommendedProducts] = await Promise.all([
    getCart(),
    getFeaturedProducts(4),
  ]);

  return (
    <CartClient
      initialCartItems={cartResult.success ? cartResult.data : []}
      recommendedProducts={recommendedProducts}
    />
  );
}
