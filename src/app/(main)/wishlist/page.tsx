import { getRecommendedProducts } from "@/data/products/gateway/server";
import { getWishlist } from "@/data/wishlist/server/action";
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
  const [wishlistResult, recommendedResult] = await Promise.all([
    getWishlist(),
    getRecommendedProducts({ limit: 4 }),
  ]);

  return (
    <WishlistContainer
      initialWishlistItems={wishlistResult.data}
      recommendations={recommendedResult.products}
      initialPagination={{
        page: wishlistResult.page,
        totalPages: wishlistResult.total_pages,
        total: wishlistResult.total,
      }}
    />
  );
}
