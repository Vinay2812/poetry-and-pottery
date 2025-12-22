import { MobileHeaderContainer } from "@/features/layout";

import { OrderDetailSkeleton } from "@/components/skeletons";

export default function OrderDetailLoading() {
  return (
    <>
      <MobileHeaderContainer
        title="Order Details"
        showBack
        backHref="/orders"
      />
      <OrderDetailSkeleton />
    </>
  );
}
