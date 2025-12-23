import { getCategories, getFeaturedProducts } from "@/actions";
import { HERO_IMAGES } from "@/consts/client";
import { MobileHeaderContainer } from "@/features/layout";
import type { Metadata } from "next";

import { ProductCard } from "@/components/cards";
import {
  CTASection,
  CategorySection,
  HeroSection,
} from "@/components/sections";
import { Button } from "@/components/ui/button";

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
      <MobileHeaderContainer />

      <main className="min-h-screen pt-14 lg:pt-20">
        {/* Hero Section */}
        <HeroSection
          image={HERO_IMAGES.springRituals}
          imageAlt="Spring Rituals Collection"
          badge="NEW ARRIVALS"
          title="Spring Rituals"
          subtitle="Hand-thrown porcelain designed to ground your daily moments in nature."
        >
          <Button
            className="h-12 rounded-full px-8 text-base shadow-lg transition-transform hover:scale-105"
            size="lg"
          >
            Explore Collection
          </Button>
        </HeroSection>

        {/* Shop by Category */}
        <CategorySection categories={categories.slice(0, 8)} />

        {/* Curated Favorites */}
        <section className="container mx-auto px-4 py-4 lg:px-8 lg:py-12">
          <div className="mb-4 flex items-end justify-between lg:mb-8">
            <div>
              <h2 className="text-xl font-bold tracking-tight lg:text-3xl">
                Curated Favorites
              </h2>
              <p className="text-muted-foreground mt-2 text-sm lg:text-base">
                Handpicked pieces for your home.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
          className="py-12"
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
          className="pb-20 lg:pb-24"
        />
      </main>
    </>
  );
}
