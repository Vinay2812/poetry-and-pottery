"use client";

import { useCallback, useState } from "react";

export function useSelection<T extends string | number>() {
  const [selectedIds, setSelectedIds] = useState<Set<T>>(new Set());

  const toggleSelection = useCallback((id: T) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const selectAll = useCallback((ids: T[]) => {
    setSelectedIds(new Set(ids));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const isSelected = useCallback((id: T) => selectedIds.has(id), [selectedIds]);

  const toggleSelectAll = useCallback(
    (allIds: T[]) => {
      if (selectedIds.size === allIds.length && allIds.length > 0) {
        setSelectedIds(new Set());
      } else {
        setSelectedIds(new Set(allIds));
      }
    },
    [selectedIds.size],
  );

  return {
    selectedIds: Array.from(selectedIds),
    selectedCount: selectedIds.size,
    toggleSelection,
    selectAll,
    clearSelection,
    isSelected,
    toggleSelectAll,
    hasSelection: selectedIds.size > 0,
  };
}
