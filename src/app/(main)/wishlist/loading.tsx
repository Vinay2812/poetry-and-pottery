import { MobileHeader } from "@/components/layout";
import { WishlistSkeleton } from "@/components/skeletons";

export default function WishlistLoading() {
  return (
    <>
      <MobileHeader title="My Wishlist" showBack backHref="/products" />
      <WishlistSkeleton />
    </>
  );
}
