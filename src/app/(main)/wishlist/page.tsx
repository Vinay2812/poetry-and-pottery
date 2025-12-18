import { getFeaturedProducts, getWishlist } from "@/actions";
import type { Metadata } from "next";

import { WishlistClient } from "@/components/wishlist";

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
  const [wishlistResult, recommendations] = await Promise.all([
    getWishlist(),
    getFeaturedProducts(4),
  ]);

  const defaultPagination = { page: 1, totalPages: 1, total: 0 };

  return (
    <WishlistClient
      initialWishlistItems={
        wishlistResult.success ? wishlistResult.data.data : []
      }
      recommendations={recommendations}
      initialPagination={
        wishlistResult.success
          ? {
              page: wishlistResult.data.page,
              totalPages: wishlistResult.data.totalPages,
              total: wishlistResult.data.total,
            }
          : defaultPagination
      }
    />
  );
}
