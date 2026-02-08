import { cn } from "@/lib/utils";

import type { DailyWorkshopsBookingViewModel } from "../../types";

interface BookingPricingGuideSectionProps {
  viewModel: DailyWorkshopsBookingViewModel;
}

export function BookingPricingGuideSection({
  viewModel,
}: BookingPricingGuideSectionProps) {
  return (
    <section className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
      <h2 className="font-display mb-4 text-lg font-semibold text-neutral-900">
        Pricing Guide
      </h2>
      <div className="space-y-2">
        {[...viewModel.config.pricing_tiers]
          .sort((a, b) => a.hours - b.hours)
          .map((tier) => {
            const appliedCount = viewModel.appliedTierCounts[tier.id] ?? 0;
            const isActive = appliedCount > 0;
            return (
              <div
                key={tier.id}
                className={cn(
                  "flex items-center justify-between rounded-xl border px-4 py-3",
                  isActive
                    ? "border-primary bg-primary-lighter"
                    : "border-neutral-200",
                )}
              >
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    {tier.hours} Hour Session
                  </p>
                  <p className="text-xs text-neutral-500">
                    {tier.pieces_per_person} pieces per person
                    {appliedCount > 1 ? ` • x${appliedCount}` : ""}
                  </p>
                </div>
                <p className="text-primary text-lg font-bold">
                  ₹{tier.price_per_person.toLocaleString("en-IN")}
                </p>
              </div>
            );
          })}
      </div>
    </section>
  );
}
