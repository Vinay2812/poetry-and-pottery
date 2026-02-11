"use client";

import { useToggleReviewLike } from "@/data/reviews/gateway/client";
import {
  useCallback,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";

import type { CarouselApi } from "@/components/ui/carousel";

import { ReviewsSheet } from "./reviews-sheet";

// Review interface for the sheet component
interface Review {
  id: string;
  authorId: number;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  likes?: number;
  isLikedByCurrentUser?: boolean;
  images?: string[];
}

type SortOption = "recent" | "highest" | "lowest" | "top";

interface ReviewLikeState {
  likedReviews: Set<string>;
  likeCounts: Record<string, number>;
}

interface ReviewLikeAction {
  reviewId: string;
  likes: number;
  isLiked: boolean;
}

interface ReviewsSheetContainerProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  currentUserId?: number | null;
  onLikeUpdate?: (reviewId: string, likes: number, isLiked: boolean) => void;
  onWriteReview?: () => void;
  children: React.ReactNode;
}

export function ReviewsSheetContainer({
  reviews,
  averageRating,
  totalReviews,
  currentUserId,
  onLikeUpdate,
  onWriteReview,
  children,
}: ReviewsSheetContainerProps) {
  const { mutate: toggleReviewLikeMutate } = useToggleReviewLike();

  // Sort state
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  // Review like state with optimistic updates
  const [reviewState, setReviewState] = useState<ReviewLikeState>(() => {
    const likedSet = new Set<string>();
    const likeCounts = reviews.reduce(
      (acc, review) => {
        if (review.isLikedByCurrentUser) {
          likedSet.add(review.id);
        }
        acc[review.id] = review.likes ?? 0;
        return acc;
      },
      {} as Record<string, number>,
    );
    return { likedReviews: likedSet, likeCounts };
  });

  const [optimisticReviewState, applyOptimisticReview] = useOptimistic(
    reviewState,
    (state: ReviewLikeState, action: ReviewLikeAction) => {
      const nextLiked = new Set(state.likedReviews);
      if (action.isLiked) {
        nextLiked.add(action.reviewId);
      } else {
        nextLiked.delete(action.reviewId);
      }
      return {
        likedReviews: nextLiked,
        likeCounts: {
          ...state.likeCounts,
          [action.reviewId]: action.likes,
        },
      };
    },
  );

  const { likedReviews, likeCounts } = optimisticReviewState;
  const [, startTransition] = useTransition();

  // Handle like toggle with optimistic update and server sync
  const handleLike = useCallback(
    (reviewId: string) => {
      const wasLiked = likedReviews.has(reviewId);
      const newIsLiked = !wasLiked;
      const newLikesCount = wasLiked
        ? (likeCounts[reviewId] ?? 0) - 1
        : (likeCounts[reviewId] ?? 0) + 1;

      // Notify parent of optimistic update
      onLikeUpdate?.(reviewId, newLikesCount, newIsLiked);

      // Wrap entire async operation in transition
      startTransition(async () => {
        applyOptimisticReview({
          reviewId,
          likes: newLikesCount,
          isLiked: newIsLiked,
        });

        // Call mutation
        const result = await toggleReviewLikeMutate(Number(reviewId));

        if (!result.success) {
          const baseLikes = reviewState.likeCounts[reviewId] ?? 0;
          const baseIsLiked = reviewState.likedReviews.has(reviewId);
          setReviewState({
            likedReviews: new Set(reviewState.likedReviews),
            likeCounts: { ...reviewState.likeCounts },
          });
          onLikeUpdate?.(reviewId, baseLikes, baseIsLiked);
        } else if (result.likesCount !== undefined) {
          // Sync with server count
          const serverCount = result.likesCount;
          setReviewState((prev) => ({
            likedReviews: new Set(
              newIsLiked
                ? [...prev.likedReviews, reviewId]
                : [...prev.likedReviews].filter((id) => id !== reviewId),
            ),
            likeCounts: {
              ...prev.likeCounts,
              [reviewId]: serverCount,
            },
          }));
          // Notify parent of server-synced count
          onLikeUpdate?.(reviewId, serverCount, newIsLiked);
        }
      });
    },
    [
      applyOptimisticReview,
      likedReviews,
      likeCounts,
      onLikeUpdate,
      reviewState,
      toggleReviewLikeMutate,
      startTransition,
    ],
  );

  // Compute flattened image-review pairs
  const imageWithReview = useMemo(() => {
    return reviews.flatMap((review) =>
      (review.images ?? []).map((image) => ({
        image,
        review,
      })),
    );
  }, [reviews]);

  // Image viewer state
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel slide tracking
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    onSelect();

    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  const handleImageClick = useCallback(
    (imageUrl: string) => {
      const index = imageWithReview.findIndex(
        (item) => item.image === imageUrl,
      );
      if (index !== -1) {
        setSelectedImageIndex(index);
        setCurrentSlide(index);
      }
    },
    [imageWithReview],
  );

  const handleCloseViewer = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  // Sort reviews
  const sortedReviews = useMemo(() => {
    const sorted = [...reviews];
    switch (sortBy) {
      case "highest":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return sorted.sort((a, b) => a.rating - b.rating);
      case "top":
        return sorted.sort(
          (a, b) => (likeCounts[b.id] ?? 0) - (likeCounts[a.id] ?? 0),
        );
      case "recent":
      default:
        return sorted;
    }
  }, [reviews, sortBy, likeCounts]);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value as SortOption);
  }, []);

  const handleCarouselApiChange = useCallback((api: CarouselApi) => {
    setCarouselApi(api);
  }, []);

  return (
    <ReviewsSheet
      reviews={sortedReviews}
      averageRating={averageRating}
      totalReviews={totalReviews}
      currentUserId={currentUserId}
      sortBy={sortBy}
      onSortChange={handleSortChange}
      onLike={handleLike}
      onImageClick={handleImageClick}
      onWriteReview={onWriteReview}
      likedReviews={likedReviews}
      likeCounts={likeCounts}
      imageViewerOpen={selectedImageIndex !== null}
      imageWithReview={imageWithReview}
      selectedImageIndex={selectedImageIndex}
      currentSlide={currentSlide}
      carouselStartIndex={selectedImageIndex ?? 0}
      onCarouselApiChange={handleCarouselApiChange}
      onCloseViewer={handleCloseViewer}
    >
      {children}
    </ReviewsSheet>
  );
}
