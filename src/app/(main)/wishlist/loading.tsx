import { MobileHeaderContainer } from "@/features/layout";

import { WishlistSkeleton } from "@/components/skeletons";

export default function WishlistLoading() {
  return (
    <>
      <MobileHeaderContainer
        title="My Wishlist"
        showBack
        backHref="/products"
      />
      <WishlistSkeleton />
    </>
  );
}
