"use client";

import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
  MapPinIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";

import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getEventStatusColor } from "@/lib/status-utils";

import { type BulkDeleteEventsDialogProps, PAGE_SIZE_OPTIONS } from "../types";

export function BulkDeleteEventsDialog({
  isOpen,
  viewModel,
  onSearch,
  onStatusFilter,
  onLevelFilter,
  onPageSizeChange,
  onPageChange,
  onToggleSelection,
  onToggleSelectAll,
  onBulkDelete,
  onClose,
}: BulkDeleteEventsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-hidden">
        <DialogHeader>
          <DialogTitle>Bulk Delete Events</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px] flex-1">
              <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="Search events..."
                value={viewModel.search}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select
              value={viewModel.statusFilter}
              onValueChange={onStatusFilter}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                {viewModel.statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={viewModel.levelFilter} onValueChange={onLevelFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Levels</SelectItem>
                {viewModel.levelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={viewModel.pageSize} onValueChange={onPageSizeChange}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Per page" />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Select All Row */}
          <div className="flex items-center justify-between rounded-lg bg-neutral-50 px-4 py-2">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={viewModel.isAllSelected}
                onCheckedChange={onToggleSelectAll}
                disabled={viewModel.events.length === 0 || viewModel.isLoading}
              />
              <span className="text-sm text-neutral-600">
                Select all on this page
              </span>
            </div>
            {viewModel.selectedCount > 0 && (
              <span className="text-sm font-medium text-neutral-700">
                {viewModel.selectedCount} selected
              </span>
            )}
          </div>

          {/* Events List */}
          <div className="max-h-[400px] overflow-y-auto rounded-lg border">
            {viewModel.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2Icon className="size-8 animate-spin text-neutral-400" />
              </div>
            ) : viewModel.events.length === 0 ? (
              <div className="py-12 text-center text-neutral-500">
                No events found
              </div>
            ) : (
              <div className="divide-y">
                {viewModel.events.map((event) => (
                  <div
                    key={event.id}
                    className={`flex items-center gap-4 p-3 transition-colors ${
                      viewModel.selectedIds.includes(event.id)
                        ? "bg-primary/5"
                        : "hover:bg-neutral-50"
                    }`}
                  >
                    <Checkbox
                      checked={viewModel.selectedIds.includes(event.id)}
                      onCheckedChange={() => onToggleSelection(event.id)}
                    />
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      {event.imageUrl ? (
                        <OptimizedImage
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center">
                          <CalendarIcon className="size-6 text-neutral-400" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium text-neutral-900">
                          {event.title}
                        </span>
                        <Badge
                          className={`shrink-0 border ${getEventStatusColor(event.status)}`}
                        >
                          {event.status.toLowerCase().replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-neutral-500">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="size-3" />
                          {event.startsAtFormatted}
                        </span>
                        <span className="flex items-center gap-1 truncate">
                          <MapPinIcon className="size-3 shrink-0" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {viewModel.pagination.totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-500">
                Showing {viewModel.pagination.showingFrom} to{" "}
                {viewModel.pagination.showingTo} of {viewModel.pagination.total}{" "}
                events
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(viewModel.pagination.page - 1)}
                  disabled={
                    viewModel.pagination.page <= 1 || viewModel.isLoading
                  }
                >
                  <ChevronLeftIcon className="size-4" />
                </Button>
                <span className="text-sm text-neutral-600">
                  Page {viewModel.pagination.page} of{" "}
                  {viewModel.pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(viewModel.pagination.page + 1)}
                  disabled={
                    viewModel.pagination.page >=
                      viewModel.pagination.totalPages || viewModel.isLoading
                  }
                >
                  <ChevronRightIcon className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onBulkDelete}
            disabled={viewModel.selectedCount === 0 || viewModel.isPending}
          >
            <Trash2Icon className="mr-2 size-4" />
            Delete{" "}
            {viewModel.selectedCount > 0
              ? `(${viewModel.selectedCount})`
              : "Selected"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
