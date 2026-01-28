import { Hand, Lock, Truck } from "lucide-react";

import { cn } from "@/lib/utils";

interface TrustBadgesProps {
  className?: string;
}

export function TrustBadges({ className }: TrustBadgesProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-500",
        className,
      )}
    >
      <span className="flex items-center gap-1.5">
        <Lock className="h-4 w-4 text-neutral-400" />
        <span>
          Secure<span className="hidden md:inline"> Payment</span>
        </span>
      </span>

      <span className="text-neutral-300" aria-hidden="true">
        |
      </span>

      <span className="flex items-center gap-1.5">
        <Truck className="h-4 w-4 text-neutral-400" />
        <span>
          Free Shipping<span className="hidden lg:inline"> on ₹2,000+</span>
        </span>
      </span>

      <span className="text-neutral-300" aria-hidden="true">
        |
      </span>

      <span className="flex items-center gap-1.5">
        <Hand className="h-4 w-4 text-neutral-400" />
        <span>
          Handmade<span className="hidden lg:inline"> with Care</span>
        </span>
      </span>
    </div>
  );
}
