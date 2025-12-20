import { Skeleton } from "@/components/ui/skeleton";

interface PageSkeletonProps {
  title?: string;
}

export function PageSkeleton({ title }: PageSkeletonProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-4">
        <Skeleton className="mx-auto h-12 w-12 rounded-full" />
        <Skeleton className="mx-auto h-4 w-48" />
        <Skeleton className="mx-auto h-4 w-32" />
      </div>
    </div>
  );
}
