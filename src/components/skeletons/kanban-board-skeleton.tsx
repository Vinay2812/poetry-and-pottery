import { Skeleton } from "@/components/ui/skeleton";

export function KanbanBoardSkeleton() {
  return (
    <div className="grid auto-cols-fr grid-flow-col gap-4 overflow-x-auto pb-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="min-w-[280px]">
          <Skeleton className="mb-3 h-8 w-24 rounded-lg" />
          <div className="space-y-3">
            {[1, 2].map((j) => (
              <Skeleton key={j} className="h-24 rounded-xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
