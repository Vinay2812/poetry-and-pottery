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
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

import {
  BulkDeleteConfirmDialog,
  BulkDeleteResultsDialog,
} from "@/components/shared";

import { formatDateTime } from "@/lib/date";

import type {
  AdminLevelOption,
  AdminStatusOption,
} from "@/graphql/generated/types";
import { EventLevel, EventStatus } from "@/graphql/generated/types";

import { BulkDeleteEventsDialog } from "../components/bulk-delete-events-dialog";
import {
  type BulkDeleteEventsDialogViewModel,
  type BulkDeletePaginationViewModel,
  type PageSizeOption,
  type SelectableEventItem,
} from "../types";

interface BulkDeleteEventsDialogContainerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BulkDeleteEventsDialogContainer({
  isOpen,
  onOpenChange,
}: BulkDeleteEventsDialogContainerProps) {
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

    function startLoading() {
      setIsLoading(true);
    }

    startLoading();
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
    function resetState() {
      setSearch("");
      setStatusFilter("ALL");
      setLevelFilter("ALL");
      setPageSize(50);
      setPage(1);
      clearSelection();
    }
    if (!isOpen) {
      resetState();
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

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

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

  const viewModel: BulkDeleteEventsDialogViewModel = useMemo(
    () => ({
      events,
      selectedIds,
      selectedCount,
      isAllSelected,
      isLoading,
      isPending,
      pagination,
      search,
      statusFilter,
      levelFilter,
      pageSize: pageSize.toString(),
      statusOptions: statusOptions.map((o) => ({
        value: o.value,
        label: o.label,
      })),
      levelOptions: levelOptions.map((o) => ({
        value: o.value,
        label: o.label,
      })),
    }),
    [
      events,
      selectedIds,
      selectedCount,
      isAllSelected,
      isLoading,
      isPending,
      pagination,
      search,
      statusFilter,
      levelFilter,
      pageSize,
      statusOptions,
      levelOptions,
    ],
  );

  return (
    <>
      <BulkDeleteEventsDialog
        isOpen={isOpen}
        viewModel={viewModel}
        onSearch={handleSearch}
        onStatusFilter={handleStatusFilter}
        onLevelFilter={handleLevelFilter}
        onPageSizeChange={handlePageSizeChange}
        onPageChange={handlePageChange}
        onToggleSelection={toggleSelection}
        onToggleSelectAll={handleToggleSelectAll}
        onBulkDelete={handleBulkDelete}
        onClose={handleClose}
      />

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
