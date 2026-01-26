"use client";

import { cn } from "@/lib/utils";

interface NavigationProgressProps {
  isActive: boolean;
}

export function NavigationProgress({ isActive }: NavigationProgressProps) {
  return (
    <div
      aria-hidden={!isActive}
      className={cn(
        "bg-primary/20 pointer-events-none fixed top-0 left-0 z-[9999] h-0.5 w-full overflow-hidden transition-opacity duration-200",
        isActive ? "opacity-100" : "opacity-0",
      )}
    >
      <div
        className={cn(
          "bg-primary h-full w-full transition-opacity duration-200",
          isActive && "animate-pulse",
        )}
      />
    </div>
  );
}
