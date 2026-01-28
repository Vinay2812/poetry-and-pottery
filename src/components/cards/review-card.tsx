"use client";

import { BadgeCheck, ThumbsUp } from "lucide-react";

import { OptimizedImage, Rating } from "@/components/shared";

import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface ReviewCardProps {
  author: string;
  avatar?: string;
  rating: number;
  content: string;
  date: string;
  likes?: number;
  isLiked?: boolean;
  isOwnReview?: boolean;
  isCompact?: boolean;
  isVerified?: boolean;
  images?: string[];
  onLike?: () => void;
  onImageClick?: (imageUrl: string) => void;
}

export function ReviewCard({
  author,
  rating,
  content,
  date,
  likes,
  isLiked = false,
  isOwnReview = false,
  isCompact = false,
  isVerified = false,
  images,
  onLike,
  onImageClick,
}: ReviewCardProps) {
  const initials = getInitials(author);

  return (
    <div
      className={cn(
        "rounded-2xl bg-neutral-50 p-5",
        isCompact ? "w-[280px] shrink-0" : "w-full",
      )}
    >
      {/* Header: Avatar + Name + Stars + Date */}
      <div className="mb-3 flex items-start gap-3">
        {/* Initials Avatar */}
        <div className="bg-primary-light text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium">
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-display truncate text-sm font-semibold text-neutral-900">
              {author}
            </p>
            <span className="shrink-0 text-xs text-neutral-400">{date}</span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <Rating rating={rating} showCount={false} size="sm" />
            {isVerified && (
              <span className="text-primary flex items-center gap-1 text-[11px] font-medium">
                <BadgeCheck className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Verified</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Review Content */}
      {content && (
        <p
          className={cn(
            "text-sm leading-relaxed text-neutral-600",
            isCompact && "line-clamp-3",
          )}
        >
          {content}
        </p>
      )}

      {/* Review Images */}
      {!isCompact && images && images.length > 0 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onImageClick?.(image)}
              className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg"
            >
              <OptimizedImage
                src={image}
                alt={`Review image ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Helpful Button */}
      {!isOwnReview && (
        <div className="mt-3 flex items-center">
          <button
            type="button"
            onClick={onLike}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-colors",
              isLiked
                ? "bg-primary/10 text-primary"
                : "text-neutral-500 hover:bg-neutral-100",
            )}
          >
            <ThumbsUp
              className={cn("h-3.5 w-3.5", isLiked && "fill-primary")}
            />
            <span>Helpful ({likes ?? 0})</span>
          </button>
        </div>
      )}
    </div>
  );
}
