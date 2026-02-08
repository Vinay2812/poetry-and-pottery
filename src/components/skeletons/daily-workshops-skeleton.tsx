import { Skeleton } from "@/components/ui/skeleton";

export function DailyWorkshopsBookingSkeleton() {
  return (
    <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
      <div className="container mx-auto px-4 py-6 lg:px-8">
        <Skeleton className="mb-6 h-9 w-64" />
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Skeleton className="h-[350px] w-full rounded-2xl" />
            <Skeleton className="h-[320px] w-full rounded-2xl" />
            <Skeleton className="h-[260px] w-full rounded-2xl" />
          </div>
          <Skeleton className="h-[360px] w-full rounded-2xl" />
        </div>
      </div>
    </main>
  );
}

export function DailyWorkshopRegistrationDetailSkeleton() {
  return (
    <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
      <div className="container mx-auto px-4 py-6 lg:px-8">
        <Skeleton className="mb-4 h-6 w-40" />
        <Skeleton className="mb-6 h-10 w-72" />
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            <Skeleton className="h-[300px] w-full rounded-2xl" />
            <Skeleton className="h-[240px] w-full rounded-2xl" />
          </div>
          <Skeleton className="h-[320px] w-full rounded-2xl" />
        </div>
      </div>
    </main>
  );
}
