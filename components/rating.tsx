import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface RatingProps {
  rating: number;
  reviewCount?: number;
  showCount?: boolean;
  size?: "sm" | "md";
}

export function Rating({
  rating,
  reviewCount,
  showCount = true,
  size = "md",
}: RatingProps) {
  return (
    <div className="flex items-center gap-1">
      <Star
        className={cn(
          "fill-yellow-400 text-yellow-400",
          size === "sm" ? "h-3 w-3" : "h-4 w-4",
        )}
      />
      <span
        className={cn("font-medium", size === "sm" ? "text-xs" : "text-sm")}
      >
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount && (
        <span
          className={cn(
            "text-muted-foreground",
            size === "sm" ? "text-xs" : "text-sm",
          )}
        >
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
