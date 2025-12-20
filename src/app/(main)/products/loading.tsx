import { MobileHeader } from "@/components/layout";
import { ProductsSkeleton } from "@/components/skeletons";

export default function ProductsLoading() {
  return (
    <>
      <MobileHeader title="Shop Pottery" showBack backHref="/" />
      <ProductsSkeleton />
    </>
  );
}
