import { StarIcon, UserIcon } from "lucide-react";

import { OptimizedImage } from "@/components/shared";

import { createDate } from "@/lib/date";

import type { AdminEventReview } from "@/graphql/generated/types";

interface EventReviewsSectionProps {
  eventId: string;
  reviews: AdminEventReview[];
  total: number;
  averageRating: number;
}

export function EventReviewsSection({
  reviews,
  total,
  averageRating,
}: EventReviewsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-neutral-900">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`size-4 ${
                    star <= Math.round(averageRating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-neutral-300"
                  }`}
                />
              ))}
            </div>
            <div className="mt-1 text-sm text-neutral-500">
              {total} {total === 1 ? "review" : "reviews"}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="rounded-xl border border-neutral-200 bg-white p-12 text-center">
            <p className="text-neutral-500">No reviews yet</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border border-neutral-200 bg-white p-6"
            >
              <div className="flex items-start gap-4">
                {review.user.image ? (
                  <div className="relative size-10 overflow-hidden rounded-full bg-neutral-100">
                    <OptimizedImage
                      src={review.user.image}
                      alt={review.user.name || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex size-10 items-center justify-center rounded-full bg-neutral-100">
                    <UserIcon className="size-5 text-neutral-400" />
                  </div>
                )}
                <div>
                  <div className="font-medium text-neutral-900">
                    {review.user.name || "Anonymous"}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {review.user.email}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`size-4 ${
                            star <= review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span
                      className="text-sm text-neutral-500"
                      suppressHydrationWarning
                    >
                      {createDate(review.created_at).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                </div>
              </div>
              {review.review && (
                <p className="mt-4 text-neutral-700">{review.review}</p>
              )}
              {review.image_urls.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {review.image_urls.map((url, i) => (
                    <div
                      key={i}
                      className="relative size-20 overflow-hidden rounded-lg bg-neutral-100"
                    >
                      <OptimizedImage
                        src={url}
                        alt={`Review image ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
