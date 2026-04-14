import { cn } from "@/lib/utils";

import type { PaymentSummaryViewModel } from "../types";

interface PaymentSummaryCardProps {
  summary: PaymentSummaryViewModel;
  className?: string;
}

export function PaymentSummaryCard({
  summary,
  className,
}: PaymentSummaryCardProps) {
  return (
    <div
      className={cn(
        "shadow-soft bg-card rounded-2xl border border-neutral-100 p-4 md:p-6",
        className,
      )}
    >
      <p className="mb-4 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
        Payment Summary
      </p>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Subtotal</span>
          <span className="text-foreground font-medium">
            ₹{summary.subtotal.toLocaleString()}
          </span>
        </div>
        {summary.totalDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Discount</span>
            <span className="font-medium text-emerald-600">
              -₹{summary.totalDiscount.toLocaleString()}
            </span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Shipping</span>
          <span className="text-foreground font-medium">
            ₹{summary.shippingFee.toLocaleString()}
          </span>
        </div>
        <div className="flex items-baseline justify-between border-t border-neutral-100 pt-3">
          <span className="text-foreground font-semibold">Total</span>
          <span className="text-foreground text-xl font-bold">
            ₹{summary.total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
