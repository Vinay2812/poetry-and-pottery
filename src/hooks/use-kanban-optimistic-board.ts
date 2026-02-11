"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";

import type { KanbanColumn } from "@/components/dashboard/kanban-board";

interface ColumnDefinition<TStatus extends string> {
  id: TStatus;
  title: string;
}

interface UseKanbanOptimisticBoardOptions<TItem, TStatus extends string> {
  items: TItem[];
  columns: ColumnDefinition<TStatus>[];
  getItemId: (item: TItem) => string;
  getItemStatus: (item: TItem) => string;
  getStatusColor: (status: TStatus) => string;
  updateStatus: (
    itemId: string,
    status: TStatus,
  ) => Promise<{ success: boolean; error?: string | null }>;
}

export function useKanbanOptimisticBoard<TItem, TStatus extends string>({
  items,
  columns: columnDefs,
  getItemId,
  getItemStatus,
  getStatusColor,
  updateStatus,
}: UseKanbanOptimisticBoardOptions<TItem, TStatus>) {
  const [, startTransition] = useTransition();
  const [itemsState, setItemsState] = useState(items);

  type OptimisticAction = { type: "status"; itemId: string; status: TStatus };

  function applyOptimisticAction(
    state: TItem[],
    action: OptimisticAction,
  ): TItem[] {
    switch (action.type) {
      case "status":
        return state.map((item) =>
          getItemId(item) === action.itemId
            ? ({ ...item, status: action.status } as TItem)
            : item,
        );
      default:
        return state;
    }
  }

  const [optimisticItems, setOptimisticItems] = useOptimistic(
    itemsState,
    (state: TItem[], action: OptimisticAction) =>
      applyOptimisticAction(state, action),
  );

  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setItemsState(items);
  }, [items]);

  const columns = useMemo(
    (): KanbanColumn<TItem>[] =>
      columnDefs.map((col) => ({
        id: col.id,
        title: col.title,
        items: optimisticItems.filter((item) => getItemStatus(item) === col.id),
        colorClass: getStatusColor(col.id),
      })),
    [optimisticItems, columnDefs, getItemStatus, getStatusColor],
  );

  const handleCardClick = useCallback((item: TItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  }, []);

  const handleDialogOpenChange = useCallback((open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedItem(null);
    }
  }, []);

  const handleMove = useCallback(
    async (itemId: string, fromColumn: string, toColumn: string) => {
      const newStatus = toColumn as TStatus;
      const previousStatus = fromColumn as TStatus;
      const optimisticAction: OptimisticAction = {
        type: "status",
        itemId,
        status: newStatus,
      };

      setOptimisticItems(optimisticAction);

      startTransition(async () => {
        try {
          const result = await updateStatus(itemId, newStatus);

          if (!result.success) {
            console.error("Failed to update status:", result.error);
            setOptimisticItems({
              type: "status",
              itemId,
              status: previousStatus,
            });
            setItemsState((prev) =>
              applyOptimisticAction(prev, {
                type: "status",
                itemId,
                status: previousStatus,
              }),
            );
            return;
          }

          setItemsState((prev) =>
            applyOptimisticAction(prev, optimisticAction),
          );
        } catch (error) {
          console.error("Failed to update status:", error);
          setOptimisticItems({
            type: "status",
            itemId,
            status: previousStatus,
          });
          setItemsState((prev) =>
            applyOptimisticAction(prev, {
              type: "status",
              itemId,
              status: previousStatus,
            }),
          );
        }
      });
    },
    [setOptimisticItems, startTransition, updateStatus],
  );

  const updateSelectedItem = useCallback(
    (updatedItem: TItem) => {
      setItemsState((prev) =>
        prev.map((item) =>
          getItemId(item) === getItemId(updatedItem) ? updatedItem : item,
        ),
      );
      setSelectedItem(updatedItem);
    },
    [getItemId],
  );

  return {
    columns,
    selectedItem,
    dialogOpen,
    handleMove,
    handleCardClick,
    handleDialogOpenChange,
    updateSelectedItem,
  };
}
