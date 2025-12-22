"use client";

import { useCallback, useRef } from "react";

const DEFAULT_DEBOUNCE_MS = 1000;

/**
 * Debounce hook - delays API call until user stops triggering for delay period.
 * Use for wishlist/like actions where you want to batch rapid clicks.
 */
export function useDebounce(delay: number = DEFAULT_DEBOUNCE_MS) {
  const timeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const pendingRef = useRef<Map<string, boolean>>(new Map());

  const isPending = useCallback((key: string): boolean => {
    return pendingRef.current.get(key) ?? false;
  }, []);

  const debounce = useCallback(
    <R>(key: string, callback: () => Promise<R>): Promise<R | undefined> => {
      // Clear existing timeout for this key
      const existingTimeout = timeoutRef.current.get(key);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
      }

      // Mark as pending
      pendingRef.current.set(key, true);

      return new Promise((resolve) => {
        const timeout = setTimeout(async () => {
          timeoutRef.current.delete(key);
          pendingRef.current.set(key, false);
          const result = await callback();
          resolve(result);
        }, delay);

        timeoutRef.current.set(key, timeout);
      });
    },
    [delay],
  );

  const cancel = useCallback((key: string) => {
    const existingTimeout = timeoutRef.current.get(key);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      timeoutRef.current.delete(key);
      pendingRef.current.set(key, false);
    }
  }, []);

  return { debounce, isPending, cancel };
}
