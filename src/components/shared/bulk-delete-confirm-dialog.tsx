"use client";

import { AlertTriangleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BulkDeleteConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  entityName: string;
  onConfirm: () => void;
  isPending: boolean;
}

export function BulkDeleteConfirmDialog({
  isOpen,
  onOpenChange,
  selectedCount,
  entityName,
  onConfirm,
  isPending,
}: BulkDeleteConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangleIcon className="size-6 text-red-600" />
          </div>
          <DialogTitle className="text-center">
            Delete {selectedCount} {entityName}?
          </DialogTitle>
          <DialogDescription className="text-center">
            This action cannot be undone.{" "}
            {entityName === "products"
              ? "Products with orders will be deactivated instead of deleted to preserve order history."
              : "Events with registrations will be cancelled instead of deleted to preserve registration history."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 sm:justify-center">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
