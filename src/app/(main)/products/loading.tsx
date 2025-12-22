import { MobileHeaderContainer } from "@/features/layout";

import { ProductsSkeleton } from "@/components/skeletons";

export default function ProductsLoading() {
  return (
    <>
      <MobileHeaderContainer title="Shop Pottery" showBack backHref="/" />
      <ProductsSkeleton />
    </>
  );
}
