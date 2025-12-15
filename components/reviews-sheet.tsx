"use client";

import { Star } from "lucide-react";
import { useMemo, useState } from "react";

import { ReviewCard } from "@/components/review-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Review } from "@/lib/constants";

type SortOption = "recent" | "highest" | "lowest";

interface RatingBreakdownProps {
  rating: number;
  count: number;
  total: number;
}

function RatingBreakdown({ rating, count, total }: RatingBreakdownProps) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="flex items-center gap-2">
      <span className="w-3 text-xs font-medium">{rating}</span>
      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
      <div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
        <div
          className="bg-primary h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-muted-foreground w-8 text-right text-xs">
        {count}
      </span>
    </div>
  );
}

interface ReviewsSheetProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  children: React.ReactNode;
}

export function ReviewsSheet({
  reviews,
  averageRating,
  totalReviews,
  children,
}: ReviewsSheetProps) {
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      const rating = Math.round(review.rating) as 1 | 2 | 3 | 4 | 5;
      if (rating >= 1 && rating <= 5) {
        counts[rating]++;
      }
    });
    return counts;
  }, [reviews]);

  const sortedReviews = useMemo(() => {
    const sorted = [...reviews];
    switch (sortBy) {
      case "highest":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return sorted.sort((a, b) => a.rating - b.rating);
      case "recent":
      default:
        return sorted;
    }
  }, [reviews, sortBy]);

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-[85vh] rounded-t-3xl px-0 md:h-[90vh]"
      >
        <SheetHeader className="border-border border-b px-4 pb-4">
          <SheetTitle className="text-lg">Customer Reviews</SheetTitle>
        </SheetHeader>

        <div className="scrollbar-hide flex-1 overflow-y-auto">
          {/* Rating Summary */}
          <div className="border-border border-b px-4 py-4">
            <div className="flex gap-6">
              {/* Average Rating */}
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">
                  {averageRating.toFixed(1)}
                </span>
                <div className="mb-1 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.round(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">
                  {totalReviews} reviews
                </span>
              </div>

              {/* Rating Breakdown */}
              <div className="flex flex-1 flex-col justify-center gap-1.5">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <RatingBreakdown
                    key={rating}
                    rating={rating}
                    count={ratingCounts[rating as 1 | 2 | 3 | 4 | 5]}
                    total={reviews.length}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-muted-foreground text-sm">
              {reviews.length} reviews
            </span>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger size="sm" className="w-auto">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="highest">Highest Rated</SelectItem>
                <SelectItem value="lowest">Lowest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reviews List */}
          <div className="space-y-3 px-4 pb-8">
            {sortedReviews.map((review) => (
              <ReviewCard
                key={review.id}
                author={review.author}
                avatar={review.avatar}
                rating={review.rating}
                content={review.content}
                date={review.date}
              />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
