"use client";

import {
  bulkDeleteEvents,
  getEventLevelOptions,
  getEventStatusOptions,
  getEvents,
} from "@/data/admin/events/gateway/server";
import type { AdminBulkDeleteEventsResponse } from "@/data/admin/events/gateway/server";
import { useSelection } from "@/hooks";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
  MapPinIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

import {
  BulkDeleteConfirmDialog,
  BulkDeleteResultsDialog,
  OptimizedImage,
} from "@/components/shared";
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

import { formatDateTime } from "@/lib/date";
import { getEventStatusColor } from "@/lib/status-utils";

import type {
  AdminLevelOption,
  AdminStatusOption,
} from "@/graphql/generated/types";
import { EventLevel, EventStatus } from "@/graphql/generated/types";

import {
  type BulkDeletePaginationViewModel,
  PAGE_SIZE_OPTIONS,
  type PageSizeOption,
  type SelectableEventItem,
} from "../types";

interface BulkDeleteEventsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BulkDeleteEventsDialog({
  isOpen,
  onOpenChange,
}: BulkDeleteEventsDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  // Filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [levelFilter, setLevelFilter] = useState("ALL");
  const [pageSize, setPageSize] = useState<PageSizeOption>(50);
  const [page, setPage] = useState(1);

  // Data state
  const [events, setEvents] = useState<SelectableEventItem[]>([]);
  const [statusOptions, setStatusOptions] = useState<AdminStatusOption[]>([]);
  const [levelOptions, setLevelOptions] = useState<AdminLevelOption[]>([]);
  const [pagination, setPagination] = useState<BulkDeletePaginationViewModel>({
    page: 1,
    totalPages: 1,
    limit: 50,
    total: 0,
    showingFrom: 0,
    showingTo: 0,
  });

  // Selection state
  const {
    selectedIds,
    selectedCount,
    toggleSelection,
    clearSelection,
    toggleSelectAll,
  } = useSelection<string>();

  // Dialog states
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isResultsDialogOpen, setIsResultsDialogOpen] = useState(false);
  const [bulkDeleteResults, setBulkDeleteResults] =
    useState<AdminBulkDeleteEventsResponse | null>(null);

  const allEventIds = useMemo(() => events.map((e) => e.id), [events]);
  const isAllSelected =
    selectedCount === allEventIds.length && selectedCount > 0;

  // Fetch options on mount
  useEffect(() => {
    if (isOpen) {
      Promise.all([getEventStatusOptions(), getEventLevelOptions()]).then(
        ([statuses, levels]) => {
          setStatusOptions(statuses);
          setLevelOptions(levels);
        },
      );
    }
  }, [isOpen]);

  // Fetch events when filters change
  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    getEvents({
      search: search || undefined,
      status:
        statusFilter !== "ALL" ? (statusFilter as EventStatus) : undefined,
      level: levelFilter !== "ALL" ? (levelFilter as EventLevel) : undefined,
      page,
      limit: pageSize,
    })
      .then((data) => {
        setEvents(
          data.events.map((e) => ({
            id: e.id,
            title: e.title,
            imageUrl: e.image || null,
            status: e.status,
            startsAtFormatted: formatDateTime(e.starts_at),
            location: e.location,
          })),
        );
        setPagination({
          page: data.page,
          totalPages: data.totalPages,
          limit: data.limit,
          total: data.total,
          showingFrom: data.total > 0 ? (data.page - 1) * data.limit + 1 : 0,
          showingTo: Math.min(data.page * data.limit, data.total),
        });
      })
      .finally(() => setIsLoading(false));
  }, [isOpen, search, statusFilter, levelFilter, page, pageSize]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setStatusFilter("ALL");
      setLevelFilter("ALL");
      setPageSize(50);
      setPage(1);
      clearSelection();
    }
  }, [isOpen, clearSelection]);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleStatusFilter = useCallback((value: string) => {
    setStatusFilter(value);
    setPage(1);
  }, []);

  const handleLevelFilter = useCallback((value: string) => {
    setLevelFilter(value);
    setPage(1);
  }, []);

  const handlePageSizeChange = useCallback((value: string) => {
    setPageSize(parseInt(value) as PageSizeOption);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleToggleSelectAll = useCallback(() => {
    toggleSelectAll(allEventIds);
  }, [toggleSelectAll, allEventIds]);

  const handleBulkDelete = useCallback(() => {
    setIsConfirmDialogOpen(true);
  }, []);

  const handleConfirmBulkDelete = useCallback(() => {
    setIsConfirmDialogOpen(false);
    startTransition(async () => {
      const result = await bulkDeleteEvents(selectedIds);
      setBulkDeleteResults(result);
      setIsResultsDialogOpen(true);
      clearSelection();
      // Refresh events
      const data = await getEvents({
        search: search || undefined,
        status:
          statusFilter !== "ALL" ? (statusFilter as EventStatus) : undefined,
        level: levelFilter !== "ALL" ? (levelFilter as EventLevel) : undefined,
        page,
        limit: pageSize,
      });
      setEvents(
        data.events.map((e) => ({
          id: e.id,
          title: e.title,
          imageUrl: e.image || null,
          status: e.status,
          startsAtFormatted: formatDateTime(e.starts_at),
          location: e.location,
        })),
      );
      setPagination({
        page: data.page,
        totalPages: data.totalPages,
        limit: data.limit,
        total: data.total,
        showingFrom: data.total > 0 ? (data.page - 1) * data.limit + 1 : 0,
        showingTo: Math.min(data.page * data.limit, data.total),
      });
    });
  }, [
    selectedIds,
    clearSelection,
    search,
    statusFilter,
    levelFilter,
    page,
    pageSize,
  ]);

  const resultsWithNames = useMemo(() => {
    if (!bulkDeleteResults) return null;
    return {
      totalRequested: bulkDeleteResults.totalRequested,
      deletedCount: bulkDeleteResults.deletedCount,
      deactivatedOrCancelledCount: bulkDeleteResults.cancelledCount,
      failedCount: bulkDeleteResults.failedCount,
      items: bulkDeleteResults.results.map((r) => {
        const event = events.find((e) => e.id === r.id);
        return {
          id: r.id,
          name: event?.title ?? `Event #${r.id}`,
          action: r.action,
          error: r.error,
        };
      }),
    };
  }, [bulkDeleteResults, events]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={levelFilter} onValueChange={handleLevelFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Levels</SelectItem>
                  {levelOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={pageSize.toString()}
                onValueChange={handlePageSizeChange}
              >
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
                  checked={isAllSelected}
                  onCheckedChange={handleToggleSelectAll}
                  disabled={events.length === 0 || isLoading}
                />
                <span className="text-sm text-neutral-600">
                  Select all on this page
                </span>
              </div>
              {selectedCount > 0 && (
                <span className="text-sm font-medium text-neutral-700">
                  {selectedCount} selected
                </span>
              )}
            </div>

            {/* Events List */}
            <div className="max-h-[400px] overflow-y-auto rounded-lg border">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2Icon className="size-8 animate-spin text-neutral-400" />
                </div>
              ) : events.length === 0 ? (
                <div className="py-12 text-center text-neutral-500">
                  No events found
                </div>
              ) : (
                <div className="divide-y">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className={`flex items-center gap-4 p-3 transition-colors ${
                        selectedIds.includes(event.id)
                          ? "bg-primary/5"
                          : "hover:bg-neutral-50"
                      }`}
                    >
                      <Checkbox
                        checked={selectedIds.includes(event.id)}
                        onCheckedChange={() => toggleSelection(event.id)}
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
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-500">
                  Showing {pagination.showingFrom} to {pagination.showingTo} of{" "}
                  {pagination.total} events
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1 || isLoading}
                  >
                    <ChevronLeftIcon className="size-4" />
                  </Button>
                  <span className="text-sm text-neutral-600">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= pagination.totalPages || isLoading}
                  >
                    <ChevronRightIcon className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              disabled={selectedCount === 0 || isPending}
            >
              <Trash2Icon className="mr-2 size-4" />
              Delete {selectedCount > 0 ? `(${selectedCount})` : "Selected"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BulkDeleteConfirmDialog
        isOpen={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        selectedCount={selectedCount}
        entityName="events"
        onConfirm={handleConfirmBulkDelete}
        isPending={isPending}
      />

      {resultsWithNames && (
        <BulkDeleteResultsDialog
          isOpen={isResultsDialogOpen}
          onOpenChange={setIsResultsDialogOpen}
          results={resultsWithNames}
          entityName="events"
        />
      )}
    </>
  );
}
