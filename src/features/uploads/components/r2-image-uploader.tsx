"use client";

import { AlertCircle, Loader2, Trash2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef } from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type { R2ImageUploaderProps, UploadItemViewModel } from "../types";

interface UploadItemProps {
  item: UploadItemViewModel;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
}

function UploadItem({ item, onRemove, onRetry }: UploadItemProps) {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
      <Image
        src={item.previewUrl}
        alt="Upload preview"
        fill
        className={cn(
          "object-cover transition-opacity",
          item.isUploading && "opacity-50",
        )}
      />

      {/* Upload progress overlay */}
      {item.isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="size-6 animate-spin text-white" />
            <span className="text-xs font-medium text-white">
              {Math.round(item.progress)}%
            </span>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {item.isError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-red-500/20 p-2">
          <AlertCircle className="size-6 text-red-600" />
          <span className="text-center text-xs text-red-700">
            {item.error || "Upload failed"}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onRetry(item.id)}
            className="h-6 px-2 text-xs"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Success indicator */}
      {item.isSuccess && (
        <div className="absolute right-1 bottom-1 rounded-full bg-green-500 p-1">
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

      {/* Remove button */}
      {!item.isUploading && (
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="absolute top-1 right-1 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
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
}: R2ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
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

      {/* Upload grid */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {/* Existing uploads */}
        {viewModel.items.map((item) => (
          <UploadItem
            key={item.id}
            item={item}
            onRemove={onRemove}
            onRetry={onRetry}
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
    </div>
  );
}
