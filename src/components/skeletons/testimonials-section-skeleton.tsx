import { Skeleton } from "@/components/ui/skeleton";

export function TestimonialsSectionSkeleton() {
  return (
    <section className="container mx-auto px-4 py-8 lg:px-8 lg:py-16">
      <div className="mb-6 flex flex-col lg:mb-8">
        <h2 className="font-display text-xl font-bold tracking-tight lg:text-2xl">
          Loved by Our Community
        </h2>
        <p className="text-muted-foreground mt-3 max-w-md text-sm lg:text-base">
          Join hundreds of happy pottery enthusiasts
        </p>
      </div>

      <div className="flex gap-5 overflow-hidden py-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            className="w-[300px] shrink-0 rounded-2xl p-6"
            style={{ height: "160px" }}
          />
        ))}
      </div>
    </section>
  );
}
