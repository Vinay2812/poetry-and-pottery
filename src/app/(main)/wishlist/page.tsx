import type { Metadata } from "next";
import { Suspense } from "react";

import { WishlistSkeleton } from "@/components/skeletons";

import { WishlistContent } from "./wishlist-content";

export const metadata: Metadata = {
  title: "My Wishlist | Poetry & Pottery",
  description:
    "View your saved items and discover recommendations based on your pottery preferences.",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Route: /wishlist
 * Page does: Authenticated wishlist page for saved products and quick conversion to cart.
 * Key UI operations:
 * - Browse saved items, remove/save states, and add wishlist products directly to cart.
 * - Load additional wishlist pages while preserving current list state.
 * UI info needed for operations:
 * - Authenticated user context and wishlist pagination metadata.
 * - Wishlist item payload with product identifiers needed for cart and detail navigation.
 */
export default function WishlistPage() {
  return (
    <Suspense fallback={<WishlistSkeleton />}>
      <WishlistContent />
    </Suspense>
  );
}
