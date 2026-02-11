"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AlertCircle, Loader2, X } from "lucide-react";
import { useCallback } from "react";

import { OptimizedImage } from "@/components/shared";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type { UploadItemViewModel } from "../types";

interface SortableUploadItemProps {
  item: UploadItemViewModel;
  index: number;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
  onPreview: (index: number) => void;
}

export function SortableUploadItem({
  item,
  index,
  onRemove,
  onRetry,
  onPreview,
}: SortableUploadItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
  };

  const handleClick = useCallback(() => {
    if (!item.isUploading && !item.isError) {
      onPreview(index);
    }
  }, [item.isUploading, item.isError, index, onPreview]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "group relative aspect-square cursor-grab touch-none overflow-hidden rounded-lg bg-neutral-100",
        isDragging && "ring-primary opacity-50 ring-2",
        !item.isUploading && !item.isError && "active:cursor-grabbing",
      )}
    >
      <OptimizedImage
        src={item.previewUrl}
        alt="Upload preview"
        fill
        className={cn(
          "pointer-events-none object-cover transition-opacity",
          item.isUploading && "opacity-50",
        )}
      />

      {/* Click overlay for preview - only on successful uploads */}
      {!item.isUploading && !item.isError && (
        <button
          type="button"
          onClick={handleClick}
          className="absolute inset-0 z-10 cursor-zoom-in"
          aria-label="Preview image"
        />
      )}

      {/* Upload progress overlay */}
      {item.isUploading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30">
          <div className="flex flex-col items-center gap-2">
            <>
              <Loader2 className="size-6 animate-spin text-white" />
              Uploading...
            </>
            <span className="text-xs font-medium text-white">
              {Math.round(item.progress)}%
            </span>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {item.isError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-red-500/20 p-2">
          <AlertCircle className="size-6 text-red-600" />
          <span className="text-center text-xs text-red-700">
            {item.error || "Upload failed"}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRetry(item.id);
            }}
            className="h-6 px-2 text-xs"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Success indicator */}
      {item.isSuccess && (
        <div className="absolute right-1 bottom-1 z-20 rounded-full bg-green-500 p-1">
          <svg
            className="size-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}

      {/* Remove button - always visible on mobile, hover on desktop */}
      {!item.isUploading && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.id);
          }}
          className="absolute top-1 right-1 z-30 rounded-full bg-black/50 p-1 text-white opacity-100 transition-opacity hover:bg-black/70"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
