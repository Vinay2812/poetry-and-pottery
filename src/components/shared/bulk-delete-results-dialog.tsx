"use client";

import { CheckCircle2Icon, MinusCircleIcon, XCircleIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BulkDeleteResult {
  id: string | number;
  name: string;
  action: string;
  error: string | null;
}

interface BulkDeleteResultsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  results: {
    totalRequested: number;
    deletedCount: number;
    deactivatedOrCancelledCount: number;
    failedCount: number;
    items: BulkDeleteResult[];
  };
  entityName: string;
}

export function BulkDeleteResultsDialog({
  isOpen,
  onOpenChange,
  results,
  entityName,
}: BulkDeleteResultsDialogProps) {
  const secondaryLabel =
    entityName === "products" ? "Deactivated" : "Cancelled";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Bulk Delete Results</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-lg bg-green-50 p-3">
              <div className="flex items-center justify-center gap-1">
                <CheckCircle2Icon className="size-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">
                  {results.deletedCount}
                </span>
              </div>
              <div className="text-xs text-green-700">Deleted</div>
            </div>
            <div className="rounded-lg bg-amber-50 p-3">
              <div className="flex items-center justify-center gap-1">
                <MinusCircleIcon className="size-5 text-amber-600" />
                <span className="text-2xl font-bold text-amber-600">
                  {results.deactivatedOrCancelledCount}
                </span>
              </div>
              <div className="text-xs text-amber-700">{secondaryLabel}</div>
            </div>
            <div className="rounded-lg bg-red-50 p-3">
              <div className="flex items-center justify-center gap-1">
                <XCircleIcon className="size-5 text-red-600" />
                <span className="text-2xl font-bold text-red-600">
                  {results.failedCount}
                </span>
              </div>
              <div className="text-xs text-red-700">Failed</div>
            </div>
          </div>

          {results.items.length > 0 && (
            <div className="max-h-60 overflow-y-auto rounded-lg border">
              {results.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b p-3 last:border-b-0"
                >
                  <span className="max-w-[200px] truncate font-medium">
                    {item.name}
                  </span>
                  <Badge
                    variant={
                      item.action === "deleted"
                        ? "default"
                        : item.action === "failed"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {item.action}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
