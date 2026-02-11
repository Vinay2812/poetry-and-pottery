import { cn } from "@/lib/utils";

import type { SearchTabButtonProps } from "../types";

export function SearchTabButton({
  label,
  count,
  isActive,
  onClick,
}: SearchTabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 py-3 text-sm font-medium transition-colors",
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      <span>{label}</span>
      {count > 0 && (
        <span className="bg-primary flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
      {isActive && (
        <span className="bg-primary absolute bottom-0 left-0 h-0.5 w-full" />
      )}
    </button>
  );
}
