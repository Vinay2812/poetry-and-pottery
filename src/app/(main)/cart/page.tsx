import type { Metadata } from "next";
import { Suspense } from "react";

import { CartSkeleton } from "@/components/skeletons";

import { CartContent } from "./cart-content";

export const metadata: Metadata = {
  title: "Shopping Cart | Poetry & Pottery",
  description:
    "Review your cart and proceed to checkout for your handcrafted pottery selections.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return (
    <Suspense fallback={<CartSkeleton />}>
      <CartContent />
    </Suspense>
  );
}
