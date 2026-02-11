import Link from "next/link";

export function AboutCtaSection() {
  return (
    <section className="bg-background py-12 text-white lg:py-20">
      <div className="container mx-auto px-4 text-center lg:px-8">
        <h2 className="font-display mb-4 text-2xl font-bold text-neutral-900 lg:text-3xl">
          Visit Our Studio
        </h2>
        <p className="text-muted-foreground mx-auto mb-6 max-w-lg">
          Come see where the magic happens. Book a studio tour, join a workshop,
          or simply stop by for a cup of tea and a chat about clay.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/events/upcoming"
            className="bg-primary text-primary-foreground hover:bg-primary-hover w-full rounded-lg px-6 py-3 font-medium transition-colors sm:w-auto"
          >
            Book a Workshop
          </Link>
          <Link
            href="/products"
            className="border-primary text-primary hover:bg-primary/10 w-full rounded-lg border px-6 py-3 font-medium transition-colors sm:w-auto"
          >
            Browse Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
