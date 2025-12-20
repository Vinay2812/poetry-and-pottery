import { MobileHeader } from "@/components/layout";
import { CartSkeleton } from "@/components/skeletons";

export default function CartLoading() {
  return (
    <>
      <MobileHeader title="My Cart" showBack backHref="/products" />
      <CartSkeleton />
    </>
  );
}
