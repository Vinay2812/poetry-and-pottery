import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";

export function CategorySectionSkeleton() {
  return (
    <section>
      <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-16">
        <div className="mb-6 flex items-center justify-between lg:mb-8">
          <h2 className="font-display text-2xl font-bold tracking-tight lg:text-4xl">
            Shop by Category
          </h2>
          <Link
            href="/products"
            className="text-primary hover:text-primary-hover group flex items-center gap-1 text-sm font-medium transition-colors"
          >
            View All{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div
          className="hidden lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-4"
          style={{ height: "500px" }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`rounded-2xl ${i === 0 ? "row-span-2" : ""}`}
            />
          ))}
        </div>

        <div className="flex gap-3 overflow-hidden lg:hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="min-w-[140px] shrink-0 rounded-2xl"
              style={{ aspectRatio: "3/4" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
