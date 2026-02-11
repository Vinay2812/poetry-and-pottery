import { Star } from "lucide-react";

import { ReviewCard } from "@/components/cards";
import { ReviewsSheetContainer } from "@/components/shared";

import type { FormattedReview } from "../types";

interface PastWorkshopReviewsSectionProps {
  reviews: FormattedReview[];
  averageRating: number;
  currentUserId?: number | null;
  onReviewLike: (reviewId: string) => void;
  onLikeUpdate: (reviewId: string, likes: number, isLiked: boolean) => void;
}

export function PastWorkshopReviewsSection({
  reviews,
  averageRating,
  currentUserId,
  onReviewLike,
  onLikeUpdate,
}: PastWorkshopReviewsSectionProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="border-t border-neutral-100 pt-6 pb-6 dark:border-neutral-800">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Reviews
          </h2>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-neutral-500">({reviews.length})</span>
          </div>
        </div>
        {reviews.length > 2 && (
          <ReviewsSheetContainer
            reviews={reviews}
            averageRating={averageRating}
            totalReviews={reviews.length}
            currentUserId={currentUserId}
            onLikeUpdate={onLikeUpdate}
          >
            <button className="text-primary text-sm hover:underline">
              View All →
            </button>
          </ReviewsSheetContainer>
        )}
      </div>
      <div className="space-y-3">
        {reviews.slice(0, 2).map((review) => (
          <ReviewCard
            key={review.id}
            author={review.author}
            avatar={review.avatar}
            rating={review.rating}
            content={review.content}
            date={review.date}
            likes={review.likes}
            isLiked={review.isLikedByCurrentUser}
            isOwnReview={
              currentUserId != null && review.authorId === currentUserId
            }
            images={review.images}
            onLike={() => onReviewLike(review.id)}
          />
        ))}
      </div>
    </div>
  );
}
