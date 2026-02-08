import { getOrderById } from "@/data/orders/gateway/server";
import { MobileHeaderContainer } from "@/features/layout";
import { OrderDetailContainer } from "@/features/orders";

export interface OrderDetailPageParams {
  id: string;
}

interface OrderDetailContentProps {
  params: Promise<OrderDetailPageParams>;
}

export async function OrderDetailContent({ params }: OrderDetailContentProps) {
  const { id } = await params;

  const result = await getOrderById(id);
  const order = result.success ? result.data : null;

  return (
    <>
      <MobileHeaderContainer
        title="Order Details"
        showBack
        backHref="/orders"
      />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <h1 className="font-display mb-6 hidden text-2xl font-bold lg:block">
            Order Details
          </h1>

          <OrderDetailContainer order={order} />
        </div>
      </main>
    </>
  );
}
