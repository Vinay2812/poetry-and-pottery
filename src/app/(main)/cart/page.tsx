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

/**
 * Route: /cart
 * Page does: Checkout preparation page for cart review, address selection, and pricing summary.
 * Key UI operations:
 * - Change quantities, remove/save items, manage shipping addresses, and apply coupon code.
 * - Proceed to order placement using the finalized cart and selected address context.
 * UI info needed for operations:
 * - Authenticated user context plus cart items (including customization snapshots).
 * - Saved addresses, coupon validation result, and computed totals required for checkout UI.
 */
export default function CartPage() {
  return (
    <Suspense fallback={<CartSkeleton />}>
      <CartContent />
    </Suspense>
  );
}
