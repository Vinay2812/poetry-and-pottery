import { Skeleton } from "@/components/ui/skeleton";

export function WorkshopsSectionSkeleton() {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between lg:mb-6">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="mb-5 h-4 w-full max-w-md" />

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="space-y-2.5">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[74px] w-full rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-[260px] w-full rounded-2xl" />
      </div>
    </div>
  );
}
