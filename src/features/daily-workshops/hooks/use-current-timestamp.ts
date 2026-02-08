"use client";

import { useEffect, useState } from "react";

export function useCurrentTimestamp(intervalMs = 30000): number {
  const [currentTimestamp, setCurrentTimestamp] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTimestamp(Date.now());
    }, intervalMs);

    return () => {
      window.clearInterval(interval);
    };
  }, [intervalMs]);

  return currentTimestamp;
}
