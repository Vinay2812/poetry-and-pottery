import { Upload } from "lucide-react";

import { cn } from "@/lib/utils";

interface UploadEmptyStateProps {
  multiple: boolean;
  maxFiles: number;
  disabled: boolean;
  onClick: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export function UploadEmptyState({
  multiple,
  maxFiles,
  disabled,
  onClick,
  onDragOver,
  onDrop,
}: UploadEmptyStateProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      onDragOver={onDragOver}
      onDrop={onDrop}
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
  );
}
