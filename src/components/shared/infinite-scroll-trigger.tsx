import { Loader2 } from "lucide-react";

interface InfiniteScrollTriggerProps {
  hasMore: boolean;
  isLoading: boolean;
  loadMoreRef: (node?: Element | null) => void;
}

export function InfiniteScrollTrigger({
  hasMore,
  isLoading,
  loadMoreRef,
}: InfiniteScrollTriggerProps) {
  if (!hasMore) {
    return null;
  }

  return (
    <div ref={loadMoreRef} className="flex justify-center py-8">
      {isLoading && (
        <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
      )}
    </div>
  );
}
