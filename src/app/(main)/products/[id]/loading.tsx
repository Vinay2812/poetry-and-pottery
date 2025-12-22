import { MobileHeaderContainer } from "@/features/layout";

import { ProductDetailSkeleton } from "@/components/skeletons";

export default function ProductDetailLoading() {
  return (
    <>
      <MobileHeaderContainer
        title="Product Detail"
        showBack
        backHref="/products"
      />
      <ProductDetailSkeleton />
    </>
  );
}
