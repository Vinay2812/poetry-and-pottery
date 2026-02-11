"use client";

import { useToggleReviewLike } from "@/data/reviews/gateway/client";
import { useCallback, useOptimistic, useState, useTransition } from "react";

type ReviewLikeUpdates = Record<string, { likes: number; isLiked: boolean }>;

export function useReviewLikes() {
  const [reviewLikeUpdates, setReviewLikeUpdates] = useState<ReviewLikeUpdates>(
    {},
  );
  const [optimisticReviewLikeUpdates, applyOptimisticReviewLike] =
    useOptimistic(
      reviewLikeUpdates,
      (
        state: ReviewLikeUpdates,
        update: { reviewId: string; likes: number; isLiked: boolean },
      ) => ({
        ...state,
        [update.reviewId]: { likes: update.likes, isLiked: update.isLiked },
      }),
    );
  const [, startTransition] = useTransition();
  const { mutate: toggleReviewLikeMutate } = useToggleReviewLike();

  const handleLikeUpdate = useCallback(
    (reviewId: string, likes: number, isLiked: boolean) => {
      setReviewLikeUpdates((prev) => ({
        ...prev,
        [reviewId]: { likes, isLiked },
      }));
    },
    [],
  );

  const handleReviewLike = useCallback(
    (reviewId: string, currentLikes: number, currentIsLiked: boolean) => {
      const newIsLiked = !currentIsLiked;
      const newLikes = currentIsLiked ? currentLikes - 1 : currentLikes + 1;

      startTransition(async () => {
        applyOptimisticReviewLike({
          reviewId,
          likes: newLikes,
          isLiked: newIsLiked,
        });

        const result = await toggleReviewLikeMutate(Number(reviewId));

        if (!result.success) {
          setReviewLikeUpdates((prev) => ({
            ...prev,
            [reviewId]: { likes: currentLikes, isLiked: currentIsLiked },
          }));
        } else if (result.likesCount !== undefined) {
          setReviewLikeUpdates((prev) => ({
            ...prev,
            [reviewId]: { likes: result.likesCount, isLiked: newIsLiked },
          }));
        }
      });
    },
    [applyOptimisticReviewLike, toggleReviewLikeMutate, startTransition],
  );

  return {
    optimisticReviewLikeUpdates,
    handleLikeUpdate,
    handleReviewLike,
  };
}
