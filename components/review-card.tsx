"use client";

import Image from "next/image";

import { Rating } from "@/components/rating";

interface ReviewCardProps {
  author: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  isCompact?: boolean;
}

export function ReviewCard({
  author,
  avatar,
  rating,
  content,
  date,
  isCompact = false,
}: ReviewCardProps) {
  return (
    <div
      className={`border-border rounded-xl border bg-white ${isCompact ? "w-64 shrink-0 p-4" : "p-4"}`}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image src={avatar} alt={author} fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-medium">{author}</p>
            <Rating rating={rating} showCount={false} size="sm" />
          </div>
        </div>
        <span className="text-muted-foreground shrink-0 text-xs">{date}</span>
      </div>
      <p
        className={`text-muted-foreground text-sm ${isCompact ? "line-clamp-3" : ""}`}
      >
        {content}
      </p>
    </div>
  );
}
