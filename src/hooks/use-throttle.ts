"use client";

import { useCallback, useRef } from "react";

export const DEFAULT_THROTTLE_MS = 500;

/**
 * Throttle hook - executes immediately, blocks subsequent calls for delay period.
 * Use for cart actions where you want immediate response but prevent spam.
 */
export function useThrottle(delay: number = DEFAULT_THROTTLE_MS) {
  const lastActionTimeRef = useRef<Map<string, number>>(new Map());

  const isThrottled = useCallback(
    (key: string): boolean => {
      const now = Date.now();
      const lastTime = lastActionTimeRef.current.get(key) ?? 0;
      return now - lastTime < delay;
    },
    [delay],
  );

  const throttle = useCallback(
    <R>(key: string, callback: () => R): R | undefined => {
      const now = Date.now();
      const lastTime = lastActionTimeRef.current.get(key) ?? 0;
      if (now - lastTime < delay) {
        return undefined;
      }
      lastActionTimeRef.current.set(key, now);
      return callback();
    },
    [delay],
  );

  return { throttle, isThrottled };
}
