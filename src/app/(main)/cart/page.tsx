import { getCart } from "@/data/cart/gateway/server";
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

  const cartResult = await getCart();

  return <CartContainer initialCartItems={cartResult.items} />;
}
