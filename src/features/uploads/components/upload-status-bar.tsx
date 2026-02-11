import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { UploadItemViewModel } from "../types";

interface UploadStatusBarProps {
  items: UploadItemViewModel[];
  uploadedCount: number;
  totalCount: number;
  hasErrors: boolean;
  isAnyUploading: boolean;
  onRemove: (id: string) => void;
}

export function UploadStatusBar({
  items,
  uploadedCount,
  totalCount,
  hasErrors,
  isAnyUploading,
  onRemove,
}: UploadStatusBarProps) {
  return (
    <div className="flex items-center justify-between text-xs text-neutral-500">
      <span>
        {uploadedCount} of {totalCount} uploaded
        {hasErrors && (
          <span className="ml-2 text-red-600">· Some uploads failed</span>
        )}
      </span>
      {items.length > 0 && !isAnyUploading && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => items.forEach((item) => onRemove(item.id))}
          className="h-6 px-2 text-xs text-neutral-500 hover:text-red-600"
        >
          <Trash2 className="mr-1 size-3" />
          Clear all
        </Button>
      )}
    </div>
  );
}
