"use client";

import { cn } from "@/lib/utils";

interface CategoryPillProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function CategoryPill({ label, isActive, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "focus-visible:ring-primary/30 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-150 focus-visible:ring-2 focus-visible:outline-none",
        isActive
          ? "bg-primary text-primary-foreground"
          : "border-border text-foreground hover:bg-muted border bg-white",
      )}
    >
      {label}
    </button>
  );
}
