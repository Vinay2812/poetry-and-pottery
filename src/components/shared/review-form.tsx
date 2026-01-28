"use client";

import { MAX_REVIEW_IMAGES } from "@/consts/uploads";
import { R2ImageUploaderContainer } from "@/features/uploads";
import { Camera, Star } from "lucide-react";
import { useCallback, useState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

const MAX_CHARACTERS = 500;

interface ReviewFormProps {
  title: string;
  hasReviewed?: boolean;
  /** Variant for form styling */
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
  const [error, setError] = useState<string | null>(null);

  const reviewed = hasReviewed || justReviewed;

  const handleSubmitAction = useCallback(async () => {
    if (rating === 0) return;

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
  }, [content, rating, imageUrls, onSubmit]);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    setRating(5);
    setContent("");
    setImageUrls([]);
    setError(null);
  }, []);

  // Show reviewed state
  if (reviewed) {
    return (
      <div className="text-primary flex items-center gap-2 text-sm font-medium">
        <Star className="fill-primary h-4 w-4" />
        {justReviewed
          ? "Thank you for your review!"
          : "You've reviewed this product"}
      </div>
    );
  }

  // Show trigger button (compact variant or when form is closed)
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
      action={handleSubmitAction}
      className="rounded-2xl bg-neutral-50 p-5 md:p-6"
    >
      <ReviewFormFields
        title={title}
        rating={rating}
        hoveredRating={hoveredRating}
        content={content}
        imageUrls={imageUrls}
        error={error}
        onCancel={handleCancel}
        onRatingChange={setRating}
        onRatingHover={setHoveredRating}
        onContentChange={setContent}
        onImagesChange={setImageUrls}
      />
    </form>
  );
}

interface ReviewFormFieldsProps {
  title: string;
  rating: number;
  hoveredRating: number;
  content: string;
  imageUrls: string[];
  error: string | null;
  onCancel: () => void;
  onRatingChange: (value: number) => void;
  onRatingHover: (value: number) => void;
  onContentChange: (value: string) => void;
  onImagesChange: (value: string[]) => void;
}

function ReviewFormFields({
  title,
  rating,
  hoveredRating,
  content,
  imageUrls,
  error,
  onCancel,
  onRatingChange,
  onRatingHover,
  onContentChange,
  onImagesChange,
}: ReviewFormFieldsProps) {
  const { pending } = useFormStatus();
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);

  return (
    <>
      {/* Title + Star Rating - Inline */}
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <h4 className="text-sm font-semibold text-neutral-900">{title}</h4>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onRatingChange(star)}
              onMouseEnter={() => onRatingHover(star)}
              onMouseLeave={() => onRatingHover(0)}
              className="p-0.5 transition-transform hover:scale-110 focus:outline-none"
            >
              <Star
                className={cn(
                  "h-7 w-7 transition-colors md:h-10 md:w-10",
                  (hoveredRating || rating) >= star
                    ? "fill-amber-400 text-amber-400"
                    : "text-neutral-300",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Review Textarea + Character Counter */}
      <div className="mb-4">
        <Textarea
          value={content}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARACTERS) {
              onContentChange(e.target.value);
            }
          }}
          placeholder="Share your thoughts (optional)"
          className="focus:border-primary focus:ring-primary min-h-[80px] resize-none rounded-lg border-neutral-200 text-sm focus:ring-1"
          disabled={pending}
        />
        <p className="mt-1.5 text-right text-xs text-neutral-400">
          {content.length}/{MAX_CHARACTERS} characters
        </p>
      </div>

      {/* Collapsible Photo Upload */}
      {!showPhotoUpload && imageUrls.length === 0 ? (
        <button
          type="button"
          onClick={() => setShowPhotoUpload(true)}
          className="mb-4 flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-700"
        >
          <Camera className="h-4 w-4" />
          <span>Add Photos</span>
        </button>
      ) : (
        <div className="mb-4">
          <p className="mb-2 text-xs font-medium text-neutral-500">
            Add photos (optional, max {MAX_REVIEW_IMAGES})
          </p>
          <R2ImageUploaderContainer
            folder="reviews"
            multiple
            maxFiles={MAX_REVIEW_IMAGES}
            value={imageUrls}
            onChange={onImagesChange}
            disabled={pending}
          />
        </div>
      )}

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 md:flex-row md:justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
          disabled={pending}
          className="order-2 rounded-lg px-4 md:order-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={rating === 0 || pending}
          className="order-1 rounded-lg px-6 md:order-2"
        >
          {pending ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </>
  );
}
