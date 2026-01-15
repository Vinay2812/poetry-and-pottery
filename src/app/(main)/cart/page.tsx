import { getUserAddresses } from "@/data/address/gateway/server";
import { getCart } from "@/data/cart/gateway/server";
import { getRecommendedProducts } from "@/data/products/gateway/server";
import { CartContainer } from "@/features/cart";
import type { Metadata } from "next";

import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

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
  await requireAuth();

  const [cartResult, recommendedResult, addressResult] = await Promise.all([
    getCart(),
    getRecommendedProducts({ limit: 4 }),
    getUserAddresses(),
  ]);

  return (
    <CartContainer
      initialCartItems={cartResult.items}
      recommendedProducts={recommendedResult.products}
      initialAddresses={addressResult.success ? addressResult.data : []}
    />
  );
}
