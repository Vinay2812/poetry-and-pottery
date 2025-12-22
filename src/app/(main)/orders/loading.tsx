import { MobileHeaderContainer } from "@/features/layout";

import { OrdersSkeleton } from "@/components/skeletons";

export default function OrdersLoading() {
  return (
    <>
      <MobileHeaderContainer title="My Orders" showBack backHref="/" />
      <OrdersSkeleton />
    </>
  );
}
