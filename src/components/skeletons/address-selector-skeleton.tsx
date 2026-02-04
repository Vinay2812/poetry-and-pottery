import { Skeleton } from "@/components/ui/skeleton";

export function AddressSelectorSkeleton() {
  return (
    <div className="w-full min-w-0 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>

      <div className="flex gap-3 overflow-hidden">
        {[1, 2].map((i) => (
          <div key={i} className="shrink-0 basis-[85%] md:basis-[45%]">
            <div className="space-y-3 rounded-xl border-2 border-neutral-200 p-4">
              <Skeleton className="h-4 w-24" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
