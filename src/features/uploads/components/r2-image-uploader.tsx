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
} from "@dnd-kit/sortable";
import { Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { ImageCarousel, OptimizedImage } from "@/components/shared";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

import type { R2ImageUploaderProps } from "../types";
import { SortableUploadItem } from "./sortable-upload-item";
import { UploadEmptyState } from "./upload-empty-state";
import { UploadStatusBar } from "./upload-status-bar";

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
        <UploadEmptyState
          multiple={multiple}
          maxFiles={maxFiles}
          disabled={disabled}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      )}

      {/* Status info */}
      {viewModel.items.length > 0 && (
        <UploadStatusBar
          items={viewModel.items}
          uploadedCount={viewModel.uploadedCount}
          totalCount={viewModel.totalCount}
          hasErrors={viewModel.hasErrors}
          isAnyUploading={viewModel.isAnyUploading}
          onRemove={onRemove}
        />
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
