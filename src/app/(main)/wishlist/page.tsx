import { getWishlist } from "@/actions";
import { getRecommendedProducts } from "@/data/products/gateway/server";
import { WishlistContainer } from "@/features/wishlist";
import type { Metadata } from "next";

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
    getRecommendedProducts(4),
  ]);

  const defaultPagination = { page: 1, totalPages: 1, total: 0 };

  return (
    <WishlistContainer
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
