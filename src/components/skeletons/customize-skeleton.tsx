import { Skeleton } from "@/components/ui/skeleton";

export function CustomizeCategorySkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-40 rounded-xl" />
      ))}
    </div>
  );
}

export function CustomizeOptionsSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-5 w-24" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, j) => (
              <Skeleton key={j} className="h-10 w-24 rounded-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CustomizeWizardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-full" />
        ))}
      </div>
      <CustomizeCategorySkeleton />
    </div>
  );
}
