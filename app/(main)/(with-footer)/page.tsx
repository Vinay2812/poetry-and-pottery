import { ArrowRight, Circle, Coffee, Flower2, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MobileHeader } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { CTASection } from "@/components/sections";
import { Button } from "@/components/ui/button";

import { HERO_IMAGES, PRODUCTS } from "@/lib/constants";

const CATEGORIES = [
  { id: "vases", name: "Vases", icon: Flower2 },
  { id: "plates", name: "Plates", icon: Circle },
  { id: "mugs", name: "Mugs", icon: Coffee },
  { id: "planters", name: "Planters", icon: Leaf },
];

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <>
      <MobileHeader />

      <main className="container mx-auto pt-14 lg:pt-0">
        {/* Hero Section */}
        <section className="px-4 py-4 lg:px-8 lg:py-12">
          <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-[#5C6B4A] md:aspect-21/9">
            <Image
              src={HERO_IMAGES.springRituals}
              alt="Spring Rituals Collection"
              fill
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12">
              <span className="bg-primary text-primary-foreground mb-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-medium">
                NEW ARRIVALS
              </span>
              <h1 className="mb-2 text-4xl font-bold text-white lg:text-6xl">
                Spring
                <br />
                Rituals
              </h1>
              <p className="mb-6 max-w-md text-sm text-white/90 lg:text-base">
                Hand-thrown porcelain designed to ground your daily moments in
                nature.
              </p>
              <Button className="w-fit rounded-full px-6" size="lg">
                Explore Collection
              </Button>
            </div>
          </div>
        </section>

        {/* Shop by Category */}
        <section className="px-4 py-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Shop by Category</h2>
            <Link
              href="/products"
              className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm transition-colors duration-150"
            >
              SEE ALL <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="flex min-w-[72px] flex-col items-center gap-2 focus-visible:outline-none"
                >
                  <div className="bg-subtle-green hover:bg-accent flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-150">
                    <Icon className="text-primary h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium">{category.name}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Curated Favorites */}
        <section className="px-4 py-6 lg:px-8">
          <h2 className="mb-4 text-lg font-semibold">Curated Favorites</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Studio Visit CTA */}
        <CTASection
          title="Visit Our Studio"
          description="Come see where the magic happens. Book a studio tour, join a workshop, or simply stop by for a cup of tea and a chat about clay."
          primaryButtonText="Book a Workshop"
          primaryButtonHref="/events/upcoming"
          secondaryButtonText="Browse Collection"
          secondaryButtonHref="/products"
          variant="solid"
        />

        {/* Our Story CTA */}
        <CTASection
          title="Our Story"
          description="From the earth to your hands, discover the process behind every piece."
          primaryButtonText="READ OUR JOURNEY"
          primaryButtonHref="/about"
          image={HERO_IMAGES.ourStory}
          imageAlt="Our Story"
          variant="image"
        />
      </main>
    </>
  );
}
