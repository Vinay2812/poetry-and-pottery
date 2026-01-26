"use client";

import { useToggleReviewLike } from "@/data/reviews/gateway/client";
import { useAuthAction } from "@/hooks";
import { useCallback, useMemo, useOptimistic, useState } from "react";

import { PastWorkshopDetail } from "../components/past-workshop-detail";
import {
  type FormattedReview,
  type PastWorkshopDetailContainerProps,
  type PastWorkshopDetailViewModel,
  calculateDuration,
  formatEventDate,
  formatEventTime,
} from "../types";

export function PastWorkshopDetailContainer({
  workshop,
  upcomingEvents,
  currentUserId,
}: PastWorkshopDetailContainerProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [reviewLikeUpdates, setReviewLikeUpdates] = useState<
    Record<string, { likes: number; isLiked: boolean }>
  >({});
  const [optimisticReviewLikeUpdates, applyOptimisticReviewLike] =
    useOptimistic(
      reviewLikeUpdates,
      (
        state: Record<string, { likes: number; isLiked: boolean }>,
        update: { reviewId: string; likes: number; isLiked: boolean },
      ) => ({
        ...state,
        [update.reviewId]: { likes: update.likes, isLiked: update.isLiked },
      }),
    );

  const { mutate: toggleReviewLikeMutate } = useToggleReviewLike();
  const { requireAuth } = useAuthAction();

  const handleOpenGallery = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const handleCloseGallery = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  const handleLikeUpdate = useCallback(
    (reviewId: string, likes: number, isLiked: boolean) => {
      setReviewLikeUpdates((prev) => ({
        ...prev,
        [reviewId]: { likes, isLiked },
      }));
    },
    [],
  );

  // Format reviews for display
  const formattedReviews: FormattedReview[] = useMemo(() => {
    return (workshop.reviews || []).map((review) => {
      const reviewId = String(review.id);
      const likeUpdate = optimisticReviewLikeUpdates[reviewId];
      const baseLikes = review.likes?.length || 0;
      const baseIsLiked = currentUserId
        ? (review.likes?.some((like) => like.user_id === currentUserId) ??
          false)
        : false;

      return {
        id: reviewId,
        authorId: review.user_id,
        author: review.user?.name || "Anonymous",
        avatar: review.user?.image || "",
        rating: review.rating,
        content: review.review || "",
        date: new Date(review.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        likes: likeUpdate?.likes ?? baseLikes,
        isLikedByCurrentUser: likeUpdate?.isLiked ?? baseIsLiked,
        images: [] as string[],
      };
    });
  }, [workshop.reviews, currentUserId, optimisticReviewLikeUpdates]);

  const handleReviewLike = useCallback(
    async (reviewId: string) => {
      // Find the current review state
      const review = formattedReviews.find((r) => r.id === reviewId);
      if (!review) return;

      const currentLikes = review.likes;
      const currentIsLiked = review.isLikedByCurrentUser;

      // Optimistically update UI
      const newIsLiked = !currentIsLiked;
      const newLikes = currentIsLiked ? currentLikes - 1 : currentLikes + 1;
      applyOptimisticReviewLike({
        reviewId,
        likes: newLikes,
        isLiked: newIsLiked,
      });

      // Call mutation
      const result = await toggleReviewLikeMutate(Number(reviewId));

      if (!result.success) {
        // Revert on failure
        setReviewLikeUpdates((prev) => ({
          ...prev,
          [reviewId]: { likes: currentLikes, isLiked: currentIsLiked },
        }));
      } else if (result.likesCount !== undefined) {
        // Sync with server count
        setReviewLikeUpdates((prev) => ({
          ...prev,
          [reviewId]: { likes: result.likesCount, isLiked: newIsLiked },
        }));
      }
    },
    [applyOptimisticReviewLike, formattedReviews, toggleReviewLikeMutate],
  );

  // Calculate average rating
  const averageRating = useMemo(() => {
    if (!formattedReviews || formattedReviews.length === 0) return 0;
    const total = formattedReviews.reduce((sum, r) => sum + r.rating, 0);
    return total / formattedReviews.length;
  }, [formattedReviews]);

  // Build view model
  const viewModel: PastWorkshopDetailViewModel = useMemo(
    () => ({
      id: workshop.id,
      title: workshop.title,
      description: workshop.description,
      price: workshop.price,
      level: workshop.level,
      imageUrl: workshop.image || "/placeholder.jpg",
      includes: workshop.includes || [],
      highlights: workshop.highlights || [],
      gallery: workshop.gallery || [],
      quickInfo: {
        formattedDate: formatEventDate(workshop.starts_at),
        formattedTime: formatEventTime(workshop.starts_at),
        duration: calculateDuration(workshop.starts_at, workshop.ends_at),
        attendees: workshop.registrations_count,
        location: workshop.location,
        fullLocation: workshop.full_location,
        instructor: workshop.instructor,
      },
      reviews: formattedReviews,
      averageRating,
    }),
    [workshop, formattedReviews, averageRating],
  );

  const handleAuthenticatedReviewLike = useCallback(
    (reviewId: string) => {
      requireAuth(() => handleReviewLike(reviewId));
    },
    [requireAuth, handleReviewLike],
  );

  return (
    <PastWorkshopDetail
      viewModel={viewModel}
      upcomingEvents={upcomingEvents}
      selectedImageIndex={selectedImageIndex}
      onOpenGallery={handleOpenGallery}
      onCloseGallery={handleCloseGallery}
      onReviewLike={handleAuthenticatedReviewLike}
      onLikeUpdate={handleLikeUpdate}
    />
  );
}
