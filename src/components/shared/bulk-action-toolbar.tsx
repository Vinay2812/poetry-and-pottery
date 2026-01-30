"use client";

import { Trash2Icon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface BulkActionToolbarProps {
  selectedCount: number;
  entityName: string;
  onBulkDelete: () => void;
  onClearSelection: () => void;
  isPending: boolean;
}

export function BulkActionToolbar({
  selectedCount,
  entityName,
  onBulkDelete,
  onClearSelection,
  isPending,
}: BulkActionToolbarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="border-primary/20 bg-primary-light flex items-center justify-between rounded-xl border px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-neutral-700">
          {selectedCount} {entityName} selected
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className="text-neutral-500 hover:text-neutral-700"
          disabled={isPending}
        >
          <XIcon className="mr-1 size-4" />
          Clear
        </Button>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={onBulkDelete}
        disabled={isPending}
      >
        <Trash2Icon className="mr-2 size-4" />
        Delete Selected
      </Button>
    </div>
  );
}
