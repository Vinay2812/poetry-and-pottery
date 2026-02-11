import { CreditCard, RefreshCw } from "lucide-react";

export function ShippingPaymentReturnsSection() {
  return (
    <section className="mb-10">
      <h2 className="font-display mb-4 text-xl font-semibold text-neutral-900">
        Payment & Returns
      </h2>
      <div className="shadow-soft space-y-4 rounded-2xl bg-white p-5 lg:p-6">
        <div className="flex gap-4">
          <div className="bg-primary-lighter text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <h4 className="mb-1 font-medium text-neutral-900">
              No Cash on Delivery
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We accept online payments only. COD is not available for any
              orders.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50">
            <RefreshCw className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h4 className="mb-1 font-medium text-neutral-900">
              No Exchange or Returns
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              All sales are final. We do not offer exchanges or returns. Please
              review your order carefully before purchasing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
