"use client";

import { MAX_REVIEW_IMAGES } from "@/consts/uploads";
import { R2ImageUploaderContainer } from "@/features/uploads";
import { Star } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

interface ReviewFormProps {
  title: string;
  hasReviewed?: boolean;
  /** Variant for trigger button styling */
  variant?: "compact" | "full-width";
  onSubmit: (
    rating: number,
    review?: string,
    imageUrls?: string[],
  ) => Promise<{ success: boolean; error?: string }>;
}

export function ReviewForm({
  title,
  hasReviewed = false,
  variant = "full-width",
  onSubmit,
}: ReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [justReviewed, setJustReviewed] = useState(false);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reviewed = hasReviewed || justReviewed;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (rating === 0) return;

      setIsSubmitting(true);
      setError(null);

      const result = await onSubmit(
        rating,
        content.trim() || undefined,
        imageUrls.length > 0 ? imageUrls : undefined,
      );

      if (result.success) {
        setJustReviewed(true);
        setIsOpen(false);
        setRating(5);
        setContent("");
        setImageUrls([]);
      } else {
        setError(result.error || "Failed to submit review");
      }
      setIsSubmitting(false);
    },
    [content, rating, imageUrls, onSubmit],
  );

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    setRating(5);
    setContent("");
    setImageUrls([]);
    setError(null);
  }, []);

  // Show reviewed state
  if (reviewed) {
    if (variant === "full-width") {
      return (
        <div className="text-primary flex items-center gap-2 text-sm font-medium">
          <Star className="fill-primary h-4 w-4" />
          {justReviewed
            ? "Thank you for your review!"
            : "You've reviewed this product"}
        </div>
      );
    }
    return (
      <div className="text-primary mt-2 flex items-center justify-center gap-2 text-sm font-medium">
        <Star className="fill-primary h-4 w-4" />
        {justReviewed ? "Thank you for your review!" : "Reviewed"}
      </div>
    );
  }

  // Show trigger button
  if (!isOpen) {
    if (variant === "full-width") {
      return (
        <Button
          variant="outline"
          size="sm"
          className="mt-1 w-full rounded-full"
          onClick={() => setIsOpen(true)}
        >
          <Star className="mr-2 h-4 w-4" />
          Leave a Review
        </Button>
      );
    }
    return (
      <div className="flex items-center justify-center border-t border-gray-100">
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:bg-primary/10 h-7 px-3 text-xs"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          <Star className="mr-1.5 h-3.5 w-3.5" />
          Leave a Review
        </Button>
      </div>
    );
  }

  // Show form
  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-soft mt-1 rounded-xl border border-gray-100 bg-white p-4"
    >
      <p className="mb-4 text-sm font-semibold text-gray-900">{title}</p>

      {/* Star Rating */}
      <div className="mb-4">
        <p className="text-muted-foreground mb-2 text-xs font-medium">Rating</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-0.5 transition-transform hover:scale-110 focus:outline-none"
            >
              <Star
                className={cn(
                  "h-6 w-6 transition-colors",
                  (hoveredRating || rating) >= star
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Review Text */}
      <div className="mb-4">
        <label
          htmlFor="review-content"
          className="text-muted-foreground mb-2 block text-xs font-medium"
        >
          Your review (optional)
        </label>
        <Textarea
          id="review-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your experience..."
          className="focus:border-primary focus:ring-primary h-24 resize-none rounded-lg border-gray-200 text-sm focus:ring-1"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <p className="text-muted-foreground mb-2 text-xs font-medium">
          Add photos (optional, max {MAX_REVIEW_IMAGES})
        </p>
        <R2ImageUploaderContainer
          folder="reviews"
          multiple
          maxFiles={MAX_REVIEW_IMAGES}
          value={imageUrls}
          onChange={setImageUrls}
          disabled={isSubmitting}
        />
      </div>

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="rounded-full px-4"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={rating === 0 || isSubmitting}
          className="rounded-full px-4"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </form>
  );
}
