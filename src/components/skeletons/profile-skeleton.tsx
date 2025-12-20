import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <>
      {/* Mobile Header */}
      <header className="border-border sticky top-0 z-50 border-b bg-white lg:hidden">
        <div className="flex h-14 items-center justify-center px-4">
          <Skeleton className="h-5 w-16" />
        </div>
      </header>

      <main className="pt-14 pb-20 lg:pt-20 lg:pb-0">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <div className="flex justify-center">
            {/* Clerk UserProfile skeleton */}
            <div className="w-full max-w-2xl space-y-6 rounded-2xl bg-white p-6 shadow-sm">
              {/* Avatar and name */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>

              {/* Profile sections */}
              <div className="space-y-4">
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
