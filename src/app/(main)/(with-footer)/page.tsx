import { getCategories, getFeaturedProducts } from "@/actions";
import type { Metadata } from "next";
import Image from "next/image";

import { ProductCard } from "@/components/cards";
import { MobileHeader } from "@/components/layout";
import { CTASection, CategorySection } from "@/components/sections";
import { Button } from "@/components/ui/button";

import { HERO_IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Poetry & Pottery | Handcrafted Ceramics",
  description:
    "Discover beautifully handcrafted pottery and ceramics. From vases to mugs, each piece is uniquely crafted by artisan potters. Shop our collection today.",
  openGraph: {
    title: "Poetry & Pottery | Handcrafted Ceramics",
    description:
      "Discover beautifully handcrafted pottery and ceramics. From vases to mugs, each piece is uniquely crafted by artisan potters.",
    type: "website",
    url: "/",
    images: [
      {
        url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Poetry & Pottery Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poetry & Pottery | Handcrafted Ceramics",
    description:
      "Discover beautifully handcrafted pottery and ceramics. Shop our collection today.",
  },
};

export default async function Home() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(4),
    getCategories(),
  ]);

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
        <CategorySection categories={categories.slice(0, 8)} />

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
