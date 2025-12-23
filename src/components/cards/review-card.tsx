"use client";

import { ThumbsUp } from "lucide-react";

import { OptimizedImage, Rating } from "@/components/shared";

import { cn } from "@/lib/utils";

interface ReviewCardProps {
  author: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  likes?: number;
  isLiked?: boolean;
  isOwnReview?: boolean;
  isCompact?: boolean;
  images?: string[];
  onLike?: () => void;
  onImageClick?: (imageUrl: string) => void;
}

export function ReviewCard({
  author,
  avatar,
  rating,
  content,
  date,
  likes,
  isLiked = false,
  isOwnReview = false,
  isCompact = false,
  images,
  onLike,
  onImageClick,
}: ReviewCardProps) {
  return (
    <div
      className={cn(
        "shadow-soft rounded-[2rem] border border-neutral-100 bg-white p-5 transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900",
        isCompact ? "w-[280px] shrink-0" : "w-full",
      )}
    >
      <div className="mb-3 flex items-start gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <OptimizedImage
            src={avatar}
            alt={author}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate text-sm font-medium">{author}</p>
            <span className="text-muted-foreground shrink-0 text-xs">
              {date}
            </span>
          </div>
          <Rating rating={rating} showCount={false} size="sm" />
        </div>
      </div>
      {content && (
        <p
          className={`text-muted-foreground text-sm ${isCompact ? "line-clamp-3" : ""}`}
        >
          {content}
        </p>
      )}
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
      {!isOwnReview && (
        <div className="mt-3 flex items-center gap-1.5">
          <button
            type="button"
            onClick={onLike}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-colors ${
              isLiked
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <ThumbsUp
              className={`h-3.5 w-3.5 ${isLiked ? "fill-primary" : ""}`}
            />
            <span>{likes ?? 0}</span>
          </button>
        </div>
      )}
    </div>
  );
}
