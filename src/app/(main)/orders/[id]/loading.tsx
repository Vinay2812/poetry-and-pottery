import { MobileHeader } from "@/components/layout";
import { OrderDetailSkeleton } from "@/components/skeletons";

export default function OrderDetailLoading() {
  return (
    <>
      <MobileHeader title="Order Details" showBack backHref="/orders" />
      <OrderDetailSkeleton />
    </>
  );
}
