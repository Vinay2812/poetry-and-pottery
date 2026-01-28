"use client";

import { useState } from "react";

import { ReviewCard } from "@/components/cards";
import { Rating, ReviewsSheet } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";

import type { FormattedReview } from "../types";

interface ProductTabsProps {
  material: string | null;
  instructions: string[];
  reviews: FormattedReview[];
  averageRating: number;
  totalReviews: number;
  currentUserId?: number | null;
  onReviewLike: (reviewId: string, likes: number, isLiked: boolean) => void;
  onLikeUpdate: (reviewId: string, likes: number, isLiked: boolean) => void;
  className?: string;
}

export function ProductTabs({
  material,
  instructions,
  reviews,
  averageRating,
  totalReviews,
  currentUserId,
  onReviewLike,
  onLikeUpdate,
  className,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("materials");

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className={cn("w-full", className)}
    >
      <TabsList>
        <TabsTrigger value="materials">Materials & Care</TabsTrigger>
        <TabsTrigger value="reviews" className="gap-2">
          Reviews
          {totalReviews > 0 && (
            <Badge
              variant="secondary"
              size="sm"
              className="ml-1 min-w-[20px] px-1.5 text-[10px]"
            >
              {totalReviews}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>

      {/* Materials & Care Tab */}
      <TabsContent value="materials">
        <div className="space-y-4">
          {material && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-neutral-900">
                Material
              </h4>
              <p className="text-sm text-neutral-600">
                Made from high-quality {material}
              </p>
            </div>
          )}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-neutral-900">
              Care Instructions
            </h4>
            <ul className="list-inside list-disc space-y-1.5 text-sm text-neutral-500">
              {instructions.length > 0 ? (
                instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))
              ) : (
                <>
                  <li>Dishwasher and microwave safe</li>
                  <li>Hand wash recommended for longevity</li>
                  <li>Avoid sudden temperature changes</li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold text-neutral-900">
              Shipping & Returns
            </h4>
            <ul className="list-inside list-disc space-y-1.5 text-sm text-neutral-500">
              <li>Free shipping on orders over ₹2,000</li>
              <li>Standard delivery 5-7 business days</li>
              <li>Express delivery 2-3 business days</li>
              <li>30-day return policy for unused items</li>
            </ul>
          </div>
        </div>
      </TabsContent>

      {/* Reviews Tab */}
      <TabsContent value="reviews">
        {reviews.length === 0 ? (
          <p className="py-6 text-center text-sm text-neutral-400">
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          <div className="space-y-4">
            {/* Rating Summary */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-neutral-900">
                  {averageRating.toFixed(1)}
                </span>
                <div>
                  <Rating rating={averageRating} showCount={false} size="sm" />
                  <p className="text-xs text-neutral-500">
                    Based on {totalReviews} review
                    {totalReviews !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <ReviewsSheet
                reviews={reviews}
                averageRating={averageRating}
                totalReviews={totalReviews}
                currentUserId={currentUserId}
                onLikeUpdate={onLikeUpdate}
              >
                <button className="text-primary text-sm font-medium hover:underline">
                  View All &rarr;
                </button>
              </ReviewsSheet>
            </div>

            {/* Preview of first 2-3 reviews */}
            <div className="space-y-3">
              {reviews.slice(0, 3).map((review) => (
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
                  onLike={() =>
                    onReviewLike(
                      review.id,
                      review.likes,
                      review.isLikedByCurrentUser,
                    )
                  }
                />
              ))}
            </div>

            {/* View All link */}
            {reviews.length > 3 && (
              <div className="pt-2 text-center">
                <ReviewsSheet
                  reviews={reviews}
                  averageRating={averageRating}
                  totalReviews={totalReviews}
                  currentUserId={currentUserId}
                  onLikeUpdate={onLikeUpdate}
                >
                  <button className="text-primary text-sm font-medium hover:underline">
                    View All {totalReviews} Reviews &rarr;
                  </button>
                </ReviewsSheet>
              </div>
            )}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
