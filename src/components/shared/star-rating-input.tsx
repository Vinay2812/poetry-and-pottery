import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface StarRatingInputProps {
  rating: number;
  hoveredRating: number;
  onRatingChange: (value: number) => void;
  onRatingHover: (value: number) => void;
}

export function StarRatingInput({
  rating,
  hoveredRating,
  onRatingChange,
  onRatingHover,
}: StarRatingInputProps) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => onRatingHover(star)}
          onMouseLeave={() => onRatingHover(0)}
          className="p-0.5 transition-transform hover:scale-110 focus:outline-none"
        >
          <Star
            className={cn(
              "h-7 w-7 transition-colors md:h-10 md:w-10",
              (hoveredRating || rating) >= star
                ? "fill-amber-400 text-amber-400"
                : "text-neutral-300",
            )}
          />
        </button>
      ))}
    </div>
  );
}
