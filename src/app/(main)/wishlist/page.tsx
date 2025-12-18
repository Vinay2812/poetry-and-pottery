import { ProductService, WishlistService } from "@/services";
import type { ProductWithCategories } from "@/types";
import { auth } from "@clerk/nextjs/server";
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
  const { userId } = await auth();

  // Fetch wishlist items if user is authenticated
  let wishlistItems: ProductWithCategories[] = [];
  if (userId) {
    try {
      wishlistItems = await WishlistService.getWishlistItemsByAuthId(userId);
    } catch {
      // User not found in DB or other error
      wishlistItems = [];
    }
  }

  // Fetch recommendations (featured products)
  const recommendations = await ProductService.getFeaturedProducts(4);

  return (
    <WishlistClient
      initialWishlistItems={wishlistItems}
      recommendations={recommendations}
    />
  );
}
