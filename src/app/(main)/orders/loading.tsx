import { MobileHeader } from "@/components/layout";
import { OrdersSkeleton } from "@/components/skeletons";

export default function OrdersLoading() {
  return (
    <>
      <MobileHeader title="My Orders" showBack backHref="/" />
      <OrdersSkeleton />
    </>
  );
}
