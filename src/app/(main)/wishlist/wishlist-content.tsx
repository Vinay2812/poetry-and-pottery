import { getWishlist } from "@/data/wishlist/gateway/server";
import { WishlistContainer } from "@/features/wishlist";

import { requireAuth } from "@/lib/auth";

export async function WishlistContent() {
  await requireAuth();
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
