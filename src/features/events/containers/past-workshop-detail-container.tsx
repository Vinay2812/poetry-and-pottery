"use client";

import { useAuthAction, useReviewLikes } from "@/hooks";
import { useCallback, useMemo, useState } from "react";

import { createDate } from "@/lib/date";

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

  const {
    optimisticReviewLikeUpdates,
    handleLikeUpdate,
    handleReviewLike: baseHandleReviewLike,
  } = useReviewLikes();

  const { requireAuth } = useAuthAction();

  const handleOpenGallery = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const handleCloseGallery = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

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
        date: createDate(review.created_at).toLocaleDateString("en-US", {
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

  // Calculate average rating
  const averageRating = useMemo(() => {
    if (!formattedReviews || formattedReviews.length === 0) return 0;
    const total = formattedReviews.reduce((sum, r) => sum + r.rating, 0);
    return total / formattedReviews.length;
  }, [formattedReviews]);

  // Build view model
  const isWorkshop = workshop.event_type === "POTTERY_WORKSHOP";
  const isOpenMic = workshop.event_type === "OPEN_MIC";

  const viewModel: PastWorkshopDetailViewModel = useMemo(
    () => ({
      id: workshop.id,
      title: workshop.title,
      description: workshop.description,
      price: workshop.price,
      level: workshop.level ?? null,
      eventType: workshop.event_type,
      imageUrl: workshop.image || "/placeholder.jpg",
      includes: workshop.includes || [],
      performers: workshop.performers || [],
      lineupNotes: workshop.lineup_notes ?? null,
      highlights: workshop.highlights || [],
      gallery: workshop.gallery || [],
      quickInfo: {
        formattedDate: formatEventDate(workshop.starts_at),
        formattedTime: formatEventTime(workshop.starts_at),
        duration: calculateDuration(workshop.starts_at, workshop.ends_at),
        attendees: workshop.registrations_count,
        location: workshop.location,
        fullLocation: workshop.full_location,
        instructor: workshop.instructor ?? null,
      },
      reviews: formattedReviews,
      averageRating,
      isWorkshop,
      isOpenMic,
    }),
    [workshop, formattedReviews, averageRating, isWorkshop, isOpenMic],
  );

  const handleReviewLike = useCallback(
    (reviewId: string) => {
      const review = formattedReviews.find((r) => r.id === reviewId);
      if (!review) return;

      requireAuth(() => {
        baseHandleReviewLike(
          reviewId,
          review.likes,
          review.isLikedByCurrentUser,
        );
      });
    },
    [requireAuth, baseHandleReviewLike, formattedReviews],
  );

  return (
    <PastWorkshopDetail
      viewModel={viewModel}
      upcomingEvents={upcomingEvents}
      selectedImageIndex={selectedImageIndex}
      onOpenGallery={handleOpenGallery}
      onCloseGallery={handleCloseGallery}
      onReviewLike={handleReviewLike}
      onLikeUpdate={handleLikeUpdate}
    />
  );
}
