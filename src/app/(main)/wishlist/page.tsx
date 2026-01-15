import { getWishlist } from "@/data/wishlist/gateway/server";
import { WishlistContainer } from "@/features/wishlist";
import type { Metadata } from "next";

import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Wishlist | Poetry & Pottery",
  description:
    "View your saved items and discover recommendations based on your pottery preferences.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function WishlistPage() {
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
