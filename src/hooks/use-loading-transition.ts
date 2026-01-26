"use client";

import { useCallback, useState, useTransition } from "react";

type Key = number | string;

interface UseLoadingTransitionResult<T extends Key> {
  isLoading: (key: T) => boolean;
  isAnyLoading: boolean;
  startLoading: (key: T) => void;
  stopLoading: (key: T) => void;
  runWithLoading: <R>(key: T, action: () => Promise<R>) => Promise<R>;
}

export function useLoadingTransition<
  T extends Key,
>(): UseLoadingTransitionResult<T> {
  const [loadingKeys, setLoadingKeys] = useState<Set<T>>(new Set());
  const [, startTransition] = useTransition();

  const startLoading = useCallback(
    (key: T) => {
      startTransition(() => {
        setLoadingKeys((prev) => {
          const next = new Set(prev);
          next.add(key);
          return next;
        });
      });
    },
    [startTransition],
  );

  const stopLoading = useCallback(
    (key: T) => {
      startTransition(() => {
        setLoadingKeys((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      });
    },
    [startTransition],
  );

  const isLoading = useCallback(
    (key: T) => loadingKeys.has(key),
    [loadingKeys],
  );

  const runWithLoading = useCallback(
    async <R>(key: T, action: () => Promise<R>) => {
      startLoading(key);
      try {
        return await action();
      } finally {
        stopLoading(key);
      }
    },
    [startLoading, stopLoading],
  );

  return {
    isLoading,
    isAnyLoading: loadingKeys.size > 0,
    startLoading,
    stopLoading,
    runWithLoading,
  };
}
