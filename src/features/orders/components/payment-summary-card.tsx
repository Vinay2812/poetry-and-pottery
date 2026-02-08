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
        "shadow-soft rounded-2xl border border-neutral-100 bg-white p-4 md:p-6 dark:border-neutral-800 dark:bg-neutral-900",
        className,
      )}
    >
      <p className="mb-4 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
        Payment Summary
      </p>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Subtotal</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
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
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            ₹{summary.shippingFee.toLocaleString()}
          </span>
        </div>
        <div className="flex items-baseline justify-between border-t border-neutral-100 pt-3 dark:border-neutral-800">
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            Total
          </span>
          <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            ₹{summary.total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
