"use client";

import { toggleReviewLike } from "@/data/reviews/gateway/server";
import { Star } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ReviewCard } from "@/components/cards";
import { Rating } from "@/components/shared/rating";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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

import { OptimizedImage } from "./optimized-image";

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
  currentUserId?: number | null;
  onLikeUpdate?: (reviewId: string, likes: number, isLiked: boolean) => void;
  children: React.ReactNode;
}

export function ReviewsSheet({
  reviews,
  averageRating,
  totalReviews,
  currentUserId,
  onLikeUpdate,
  children,
}: ReviewsSheetProps) {
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [likedReviews, setLikedReviews] = useState<Set<string>>(() => {
    // Initialize from reviews data
    const likedSet = new Set<string>();
    reviews.forEach((review) => {
      if (review.isLikedByCurrentUser) {
        likedSet.add(review.id);
      }
    });
    return likedSet;
  });
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() =>
    reviews.reduce(
      (acc, review) => {
        acc[review.id] = review.likes ?? 0;
        return acc;
      },
      {} as Record<string, number>,
    ),
  );

  const handleLike = useCallback(
    async (reviewId: string) => {
      // Optimistically update UI
      const wasLiked = likedReviews.has(reviewId);
      const newIsLiked = !wasLiked;
      const newLikesCount = wasLiked
        ? (likeCounts[reviewId] ?? 0) - 1
        : (likeCounts[reviewId] ?? 0) + 1;

      setLikedReviews((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(reviewId)) {
          newSet.delete(reviewId);
        } else {
          newSet.add(reviewId);
        }
        return newSet;
      });
      setLikeCounts((prev) => ({
        ...prev,
        [reviewId]: newLikesCount,
      }));

      // Notify parent of optimistic update
      onLikeUpdate?.(reviewId, newLikesCount, newIsLiked);

      // Call server action
      const result = await toggleReviewLike(Number(reviewId));

      // Revert on failure
      if (!result.success) {
        setLikedReviews((prev) => {
          const newSet = new Set(prev);
          if (wasLiked) {
            newSet.add(reviewId);
          } else {
            newSet.delete(reviewId);
          }
          return newSet;
        });
        const revertedCount = wasLiked
          ? (likeCounts[reviewId] ?? 0) + 1
          : (likeCounts[reviewId] ?? 0) - 1;
        setLikeCounts((prev) => ({
          ...prev,
          [reviewId]: revertedCount,
        }));
        // Notify parent of revert
        onLikeUpdate?.(reviewId, revertedCount, wasLiked);
      } else if (result.likesCount !== undefined) {
        // Sync with server count
        const serverCount = result.likesCount;
        setLikeCounts((prev) => ({
          ...prev,
          [reviewId]: serverCount,
        }));
        // Notify parent of server-synced count
        onLikeUpdate?.(reviewId, serverCount, newIsLiked);
      }
    },
    [likedReviews, likeCounts, onLikeUpdate],
  );

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

  const imageWithReview = useMemo(() => {
    return reviews.flatMap((review) =>
      (review.images ?? []).map((image) => ({
        image,
        review,
      })),
    );
  }, [reviews]);

  const allImages = useMemo(() => {
    return imageWithReview.map((item) => item.image);
  }, [imageWithReview]);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

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

          {/* Customer Photos */}
          {allImages.length > 0 && (
            <div className="border-border border-b px-4 py-4">
              <h3 className="mb-3 text-sm font-medium">
                Customer Photos ({allImages.length})
              </h3>
              <div className="scrollbar-hide flex gap-2 overflow-x-auto">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleImageClick(image)}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg"
                  >
                    <OptimizedImage
                      src={image}
                      alt={`Customer photo ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

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
                <SelectItem value="top">Top Reviews</SelectItem>
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
                likes={likeCounts[review.id] ?? 0}
                isLiked={likedReviews.has(review.id)}
                isOwnReview={
                  currentUserId != null && review.authorId === currentUserId
                }
                images={review.images}
                onLike={() => handleLike(review.id)}
                onImageClick={handleImageClick}
              />
            ))}
          </div>
        </div>

        {/* Fullscreen Image Viewer with Carousel */}
        <Dialog
          open={selectedImageIndex !== null}
          onOpenChange={(open) => !open && handleCloseViewer()}
        >
          <DialogContent className="max-h-[90vh] w-full max-w-lg overflow-hidden p-0">
            <DialogTitle className="sr-only">Review Image Viewer</DialogTitle>
            <div className="max-h-[calc(90vh-2rem)] overflow-y-auto p-4">
              <Carousel
                className="w-full"
                opts={{ startIndex: selectedImageIndex ?? 0 }}
                setApi={setCarouselApi}
              >
                <CarouselContent>
                  {imageWithReview.map((item, index) => (
                    <CarouselItem key={index}>
                      <div className="space-y-4">
                        {/* Reviewer info */}
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                            <OptimizedImage
                              src={item.review.avatar}
                              alt={item.review.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-foreground text-sm font-medium">
                              {item.review.author}
                            </p>
                            <Rating
                              rating={item.review.rating}
                              showCount={false}
                              size="sm"
                            />
                          </div>
                        </div>

                        {/* Image with aspect ratio */}
                        <div className="bg-muted relative aspect-square max-h-[50vh] w-full overflow-hidden rounded-lg">
                          <OptimizedImage
                            src={item.image}
                            alt={`Review image by ${item.review.author}`}
                            fill
                            className="object-contain"
                          />
                        </div>

                        {/* Review content */}
                        <p className="text-muted-foreground line-clamp-3 text-sm">
                          {item.review.content}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {imageWithReview.length > 1 && (
                  <>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </>
                )}
              </Carousel>

              {/* Counter */}
              {imageWithReview.length > 1 && (
                <div className="text-muted-foreground mt-4 text-center text-sm">
                  {currentSlide + 1} / {imageWithReview.length}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </SheetContent>
    </Sheet>
  );
}
