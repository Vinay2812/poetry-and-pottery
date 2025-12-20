import { MobileHeader } from "@/components/layout";
import { ProductDetailSkeleton } from "@/components/skeletons";

export default function ProductDetailLoading() {
  return (
    <>
      <MobileHeader title="Product Detail" showBack backHref="/products" />
      <ProductDetailSkeleton />
    </>
  );
}
