import { MobileHeaderContainer } from "@/features/layout";

import { CartSkeleton } from "@/components/skeletons";

export default function CartLoading() {
  return (
    <>
      <MobileHeaderContainer title="My Cart" showBack backHref="/products" />
      <CartSkeleton />
    </>
  );
}
