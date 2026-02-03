import { Hand, Lock } from "lucide-react";

import { cn } from "@/lib/utils";

interface TrustBadgesProps {
  className?: string;
}

// Trust Badges Component (Option C - Minimal Inline Text)
//
// Compact, text-focused design with small inline icons.
// No background or dividers - keeps focus on the product
// while still showing trust signals.
export function TrustBadges({ className }: TrustBadgesProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-500",
        className,
      )}
    >
      <span className="flex items-center gap-1.5">
        <Lock className="h-3.5 w-3.5 text-neutral-400" />
        <span>Secure Payment</span>
      </span>

      <span className="flex items-center gap-1.5">
        <Hand className="h-3.5 w-3.5 text-neutral-400" />
        <span>Handmade</span>
      </span>
    </div>
  );
}
