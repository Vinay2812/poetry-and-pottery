import { DEFAULT_PAGE_SIZE } from "@/consts/performance";
import { Loader2 } from "lucide-react";
import { type RefCallback } from "react";

interface InfiniteScrollTriggerProps {
  triggerRef: RefCallback<Element>;
  isFetching: boolean;
  hasNextPage: boolean;
  itemCount: number;
  totalCount: number;
}

export function InfiniteScrollTrigger({
  triggerRef,
  isFetching,
  hasNextPage,
  itemCount,
  totalCount,
}: InfiniteScrollTriggerProps) {
  return (
    <div ref={triggerRef} className="mt-8 mb-4 flex justify-center">
      {isFetching && (
        <div className="text-muted-foreground flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm">Loading more products...</span>
        </div>
      )}
      {!hasNextPage && itemCount >= DEFAULT_PAGE_SIZE && (
        <p className="text-muted-foreground text-sm">
          You&apos;ve seen all {totalCount} products
        </p>
      )}
    </div>
  );
}
