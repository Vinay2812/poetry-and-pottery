import { getWishlist } from "@/data/wishlist/gateway/server";
import { WishlistContainer } from "@/features/wishlist";
import type { Metadata } from "next";
import { Suspense } from "react";

import { WishlistSkeleton } from "@/components/skeletons";

import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "My Wishlist | Poetry & Pottery",
  description:
    "View your saved items and discover recommendations based on your pottery preferences.",
  robots: {
    index: false,
    follow: false,
  },
};

async function WishlistContent() {
  await requireAuth();
  // Only fetch wishlist items server-side
  // Recommendations will be fetched client-side for faster initial load
  const wishlistResult = await getWishlist();

  return (
    <WishlistContainer
      initialWishlistItems={wishlistResult.data}
      initialPagination={{
        page: wishlistResult.page,
        totalPages: wishlistResult.total_pages,
        total: wishlistResult.total,
      }}
    />
  );
}

export default function WishlistPage() {
  return (
    <Suspense fallback={<WishlistSkeleton />}>
      <WishlistContent />
    </Suspense>
  );
}
