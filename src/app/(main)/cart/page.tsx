import { getCart } from "@/data/cart/gateway/server";
import { CartContainer } from "@/features/cart";
import type { Metadata } from "next";
import { Suspense } from "react";

import { CartSkeleton } from "@/components/skeletons";

import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Shopping Cart | Poetry & Pottery",
  description:
    "Review your cart and proceed to checkout for your handcrafted pottery selections.",
  robots: {
    index: false,
    follow: false,
  },
};

async function CartContent() {
  await requireAuth();

  const cartResult = await getCart();

  return <CartContainer initialCartItems={cartResult.items} />;
}

export default function CartPage() {
  return (
    <Suspense fallback={<CartSkeleton />}>
      <CartContent />
    </Suspense>
  );
}
