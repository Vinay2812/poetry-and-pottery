import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface RatingProps {
  rating: number;
  reviewCount?: number;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  textClassName?: string;
}

const sizeClasses = {
  sm: "size-3",
  md: "size-4",
  lg: "size-5",
};

const textSizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function Rating({
  rating,
  reviewCount,
  showCount = true,
  size = "md",
  className,
  textClassName,
}: RatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => {
          const isFilled = i < fullStars;
          const isHalf = i === fullStars && hasHalfStar;

          return (
            <Star
              key={i}
              className={cn(
                sizeClasses[size],
                isFilled || isHalf
                  ? "fill-primary text-primary"
                  : "fill-[#D4E5D6] text-[#D4E5D6]",
              )}
            />
          );
        })}
      </div>
      <span className={cn("font-medium", textSizeClasses[size], textClassName)}>
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount != null && reviewCount > 0 && (
        <span className={cn("text-muted-foreground", textSizeClasses[size])}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
