import { cn } from "@/lib/utils";

interface ProductArchiveTabsProps {
  isArchiveView: boolean;
  activeProductsCount: number;
  archivedProductsCount: number;
  onArchiveToggle: (archive: boolean) => void;
}

export function ProductArchiveTabs({
  isArchiveView,
  activeProductsCount,
  archivedProductsCount,
  onArchiveToggle,
}: ProductArchiveTabsProps) {
  return (
    <div className="mb-4 lg:mb-6">
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => onArchiveToggle(false)}
          className={cn(
            "relative flex shrink-0 items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors sm:px-4 sm:py-3",
            !isArchiveView
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <span className="hidden sm:inline">Active Products</span>
          <span className="sm:hidden">Active</span>
          <span
            className={cn(
              "ml-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
              !isArchiveView
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            {activeProductsCount}
          </span>
          {!isArchiveView && (
            <span className="bg-primary absolute right-3 bottom-0 left-3 h-0.5 rounded-full sm:right-4 sm:left-4" />
          )}
        </button>
        <button
          onClick={() => onArchiveToggle(true)}
          className={cn(
            "relative flex shrink-0 items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors sm:px-4 sm:py-3",
            isArchiveView
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <span className="hidden sm:inline">Archive</span>
          <span className="sm:hidden">Archive</span>
          <span
            className={cn(
              "ml-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
              isArchiveView
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            {archivedProductsCount}
          </span>
          {isArchiveView && (
            <span className="bg-primary absolute right-3 bottom-0 left-3 h-0.5 rounded-full sm:right-4 sm:left-4" />
          )}
        </button>
      </div>
      <div className="border-border border-b" />
    </div>
  );
}
