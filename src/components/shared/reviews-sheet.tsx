"use client";

import { Star } from "lucide-react";

import { ReviewCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
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
export interface Review {
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

interface ReviewsSheetProps {
  reviews: Review[]; // Already sorted
  averageRating: number;
  totalReviews: number;
  currentUserId?: number | null;
  sortBy: string;
  onSortChange: (value: string) => void;
  onLike: (reviewId: string) => void;
  onImageClick: (imageUrl: string) => void;
  onWriteReview?: () => void;
  likedReviews: Set<string>;
  likeCounts: Record<string, number>;
  // Image viewer state
  imageViewerOpen: boolean;
  imageWithReview: { image: string; review: Review }[];
  selectedImageIndex: number | null;
  currentSlide: number;
  carouselStartIndex: number;
  onCarouselApiChange: (api: CarouselApi) => void;
  onCloseViewer: () => void;
  children: React.ReactNode;
}

export function ReviewsSheet({
  reviews,
  averageRating,
  totalReviews,
  currentUserId,
  sortBy,
  onSortChange,
  onLike,
  onImageClick,
  onWriteReview,
  likedReviews,
  likeCounts,
  imageViewerOpen,
  imageWithReview,
  selectedImageIndex,
  currentSlide,
  carouselStartIndex,
  onCarouselApiChange,
  onCloseViewer,
  children,
}: ReviewsSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-[85vh] rounded-t-3xl px-0 md:h-[90vh]"
      >
        <SheetHeader className="border-b border-neutral-100 px-4 pb-4">
          <SheetTitle className="font-display text-lg">
            Customer Reviews
          </SheetTitle>
        </SheetHeader>

        <div className="scrollbar-hide flex-1 overflow-y-auto">
          {/* Rating Summary + Sort */}
          <div className="border-b border-neutral-100 px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-neutral-900">
                  {averageRating.toFixed(1)}
                </span>
                <div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.round(averageRating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-neutral-200 text-neutral-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="mt-0.5 text-xs text-neutral-500">
                    Based on {totalReviews} reviews
                  </span>
                </div>
              </div>

              <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger size="sm" className="w-auto">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="top">Most Helpful</SelectItem>
                  <SelectItem value="highest">Highest Rated</SelectItem>
                  <SelectItem value="lowest">Lowest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-3 px-4 py-4 pb-8">
            {reviews.map((review) => (
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
                onLike={() => onLike(review.id)}
                onImageClick={onImageClick}
              />
            ))}
          </div>
        </div>

        {/* Write a Review CTA */}
        {onWriteReview && (
          <div className="border-t border-neutral-100 px-4 py-3">
            <Button className="w-full rounded-lg" onClick={onWriteReview}>
              <Star className="mr-2 h-4 w-4" />
              Write a Review
            </Button>
          </div>
        )}

        {/* Fullscreen Image Viewer with Carousel */}
        <Dialog
          open={imageViewerOpen}
          onOpenChange={(open) => !open && onCloseViewer()}
        >
          <DialogContent className="max-h-[90vh] w-full max-w-lg overflow-hidden p-0">
            <DialogTitle className="sr-only">Review Image Viewer</DialogTitle>
            <div className="max-h-[calc(90vh-2rem)] overflow-y-auto p-4">
              <Carousel
                className="w-full"
                opts={{ startIndex: carouselStartIndex }}
                setApi={onCarouselApiChange}
              >
                <CarouselContent>
                  {imageWithReview.map((item, index) => (
                    <CarouselItem key={index}>
                      <div className="space-y-4">
                        {/* Reviewer info */}
                        <div className="flex items-center gap-3">
                          <div className="bg-primary-light text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                            {item.review.author
                              .split(" ")
                              .map((w) => w[0])
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-neutral-900">
                              {item.review.author}
                            </p>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3.5 w-3.5 ${
                                    star <= Math.round(item.review.rating)
                                      ? "fill-amber-400 text-amber-400"
                                      : "fill-neutral-200 text-neutral-200"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Image with aspect ratio */}
                        <div className="relative aspect-square max-h-[50vh] w-full overflow-hidden rounded-lg bg-neutral-100">
                          <OptimizedImage
                            src={item.image}
                            alt={`Review image by ${item.review.author}`}
                            fill
                            className="object-contain"
                          />
                        </div>

                        {/* Review content */}
                        <p className="line-clamp-3 text-sm text-neutral-600">
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
                <div className="mt-4 text-center text-sm text-neutral-500">
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
