import type { SearchResultListProps } from "../types";

export function SearchResultList({
  children,
  isEmpty,
  emptyIcon,
  emptyMessage,
  totalCount,
  visibleCount,
  onViewAll,
  viewAllLabel,
}: SearchResultListProps) {
  if (isEmpty) {
    return (
      <div className="py-8 text-center">
        {emptyIcon}
        <p className="text-muted-foreground text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
      {children}
      {totalCount > visibleCount && onViewAll && (
        <button
          onClick={onViewAll}
          className="text-primary hover:bg-primary/5 w-full py-3 text-center text-sm font-medium transition-colors"
        >
          {viewAllLabel}
        </button>
      )}
    </div>
  );
}
