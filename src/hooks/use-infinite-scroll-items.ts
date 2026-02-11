"use client";

import { DEFAULT_ROOT_MARGIN } from "@/consts/performance";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

interface UseInfiniteScrollItemsOptions<TItem> {
  pages: { data: TItem[] }[] | undefined;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  getItemId: (item: TItem) => string | number;
}

export function useInfiniteScrollItems<TItem>({
  pages,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  getItemId,
}: UseInfiniteScrollItemsOptions<TItem>) {
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: DEFAULT_ROOT_MARGIN,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const items = useMemo(() => {
    const allItems = pages?.flatMap((page) => page.data) ?? [];
    const seen = new Set<string | number>();
    return allItems.filter((item) => {
      const id = getItemId(item);
      if (seen.has(id)) {
        return false;
      }
      seen.add(id);
      return true;
    });
  }, [pages, getItemId]);

  return {
    items,
    loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
  };
}
