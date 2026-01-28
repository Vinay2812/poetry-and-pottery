import { Skeleton } from "@/components/ui/skeleton";

import {
  EventsListLayoutSkeleton,
  RegistrationCardSkeleton,
} from "./events-skeleton";

export function RegistrationsSkeleton() {
  return (
    <EventsListLayoutSkeleton>
      <div className="space-y-8">
        {/* Upcoming Registrations Section */}
        <section>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
            {[1, 2, 3].map((i) => (
              <RegistrationCardSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* Completed Registrations Section */}
        <section>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
            {[1, 2].map((i) => (
              <RegistrationCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </div>
    </EventsListLayoutSkeleton>
  );
}

export function RegistrationDetailSkeleton() {
  return (
    <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
      <div className="container mx-auto px-4 py-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero */}
            <Skeleton className="mb-6 aspect-video w-full rounded-2xl" />

            {/* Title */}
            <div className="mb-6 space-y-3">
              <Skeleton className="h-8 w-3/4" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-4 rounded-2xl border p-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="aspect-3/4 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
