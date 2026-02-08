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

export default function WishlistPage() {
  return (
    <Suspense fallback={<WishlistSkeleton />}>
      <WishlistContent />
    </Suspense>
  );
}
