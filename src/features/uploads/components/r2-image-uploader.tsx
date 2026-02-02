"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AlertCircle, Loader2, Trash2, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { ImageCarousel, OptimizedImage } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

import type { R2ImageUploaderProps, UploadItemViewModel } from "../types";

interface SortableUploadItemProps {
  item: UploadItemViewModel;
  index: number;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
  onPreview: (index: number) => void;
}

function SortableUploadItem({
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

export function R2ImageUploader({
  viewModel,
  multiple,
  maxFiles,
  disabled,
  acceptedTypes,
  onFilesSelect,
  onRemove,
  onRetry,
  onReorder,
}: R2ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  // Use PointerSensor with distance constraint for desktop
  // and TouchSensor with delay for mobile (long press to drag)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const activeItem = activeId
    ? viewModel.items.find((item) => item.id === activeId)
    : null;

  const previewImages = viewModel.items
    .filter((item) => item.isSuccess || item.previewUrl)
    .map((item) => item.previewUrl);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handlePreview = useCallback((index: number) => {
    setPreviewIndex(index);
  }, []);

  const handleClosePreview = useCallback(() => {
    setPreviewIndex(null);
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFilesSelect(files);
      }
      // Reset input so the same file can be selected again
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [onFilesSelect],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (disabled || !viewModel.canAddMore) return;

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        onFilesSelect(files);
      }
    },
    [disabled, viewModel.canAddMore, onFilesSelect],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      setActiveId(null);

      if (over && active.id !== over.id && onReorder) {
        const oldIndex = viewModel.items.findIndex(
          (item) => item.id === active.id,
        );
        const newIndex = viewModel.items.findIndex(
          (item) => item.id === over.id,
        );
        onReorder(oldIndex, newIndex);
      }
    },
    [viewModel.items, onReorder],
  );

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept={acceptedTypes}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />

      {/* Upload grid with DnD */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={viewModel.items.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {/* Existing uploads */}
            {viewModel.items.map((item, index) => (
              <SortableUploadItem
                key={item.id}
                item={item}
                index={index}
                onRemove={onRemove}
                onRetry={onRetry}
                onPreview={handlePreview}
              />
            ))}

            {/* Add more button */}
            {viewModel.canAddMore && !disabled && (
              <button
                type="button"
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={cn(
                  "hover:border-primary/50 hover:bg-primary/5 hover:text-primary flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 text-neutral-500 transition-colors",
                  viewModel.isAnyUploading && "pointer-events-none opacity-50",
                )}
              >
                <Upload className="size-6" />
                <span className="text-xs font-medium">Add Image</span>
              </button>
            )}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeItem ? (
            <div className="aspect-square w-24 scale-105 rotate-3 overflow-hidden rounded-lg shadow-xl">
              <OptimizedImage
                src={activeItem.previewUrl}
                alt="Dragging preview"
                fill
                className="object-cover"
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Empty state */}
      {viewModel.items.length === 0 && (
        <button
          type="button"
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          disabled={disabled}
          className={cn(
            "hover:border-primary/50 hover:bg-primary/5 hover:text-primary flex w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 px-6 py-10 text-neutral-500 transition-colors",
            disabled && "pointer-events-none opacity-50",
          )}
        >
          <div className="rounded-full bg-neutral-100 p-3">
            <Upload className="size-8" />
          </div>
          <div className="text-center">
            <p className="font-medium">Click or drag to upload</p>
            <p className="mt-1 text-xs text-neutral-400">
              {multiple ? `Up to ${maxFiles} images` : "Single image"}
              {" · PNG, JPG, WebP up to 10MB"}
            </p>
          </div>
        </button>
      )}

      {/* Status info */}
      {viewModel.items.length > 0 && (
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>
            {viewModel.uploadedCount} of {viewModel.totalCount} uploaded
            {viewModel.hasErrors && (
              <span className="ml-2 text-red-600">· Some uploads failed</span>
            )}
          </span>
          {viewModel.items.length > 0 && !viewModel.isAnyUploading && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() =>
                viewModel.items.forEach((item) => onRemove(item.id))
              }
              className="h-6 px-2 text-xs text-neutral-500 hover:text-red-600"
            >
              <Trash2 className="mr-1 size-3" />
              Clear all
            </Button>
          )}
        </div>
      )}

      {/* Image Preview Dialog */}
      <Dialog
        open={previewIndex !== null}
        onOpenChange={(open) => !open && handleClosePreview()}
      >
        <DialogContent
          className="max-h-[90vh] w-full max-w-lg overflow-hidden p-0"
          showCloseButton={false}
        >
          <div className="flex flex-col p-4">
            <div className="mb-4 flex items-center justify-between">
              <DialogTitle className="text-base font-medium">
                Image Preview
              </DialogTitle>
              <DialogClose className="text-muted-foreground hover:text-foreground rounded-sm transition-colors">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>

            <div className="relative">
              {previewImages.length > 1 ? (
                <ImageCarousel
                  images={previewImages}
                  alt="Image preview"
                  startIndex={previewIndex ?? 0}
                  imageClassName="object-contain"
                  showDots={false}
                  showCounter={true}
                />
              ) : previewImages.length === 1 ? (
                <div className="relative aspect-square w-full">
                  <OptimizedImage
                    src={previewImages[0]}
                    alt="Image preview"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
