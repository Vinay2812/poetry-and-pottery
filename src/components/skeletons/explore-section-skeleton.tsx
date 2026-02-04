import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";

export function ExploreSectionSkeleton() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
        <div className="mb-5 flex items-center justify-between lg:mb-6">
          <h2 className="font-display text-xl font-bold tracking-tight lg:text-2xl">
            Explore
          </h2>
          <Link
            href="/products"
            className="text-primary hover:text-primary-hover group flex items-center gap-1 text-sm font-medium transition-colors"
          >
            View All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="flex gap-2.5 overflow-hidden lg:gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-10 w-28 shrink-0 rounded-full lg:h-12 lg:w-32"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
