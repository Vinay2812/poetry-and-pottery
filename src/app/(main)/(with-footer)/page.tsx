import { HERO_IMAGES } from "@/consts/client";
import { getCategories } from "@/data/products/gateway/server";
import { MobileHeaderContainer } from "@/features/layout";
import { RecommendedProductsContainer } from "@/features/recommended-products";
import type { Metadata } from "next";
import Link from "next/link";

import {
  CTASection,
  CategorySection,
  HeroSection,
} from "@/components/sections";

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
  const categories = await getCategories();

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
          <Link
            className="bg-primary hover:bg-primary-hover h-12 rounded-full px-4 py-3 text-base font-bold text-white shadow-lg transition-transform hover:scale-105"
            // size="lg"
            href="/products"
          >
            Explore Collection
          </Link>
        </HeroSection>

        {/* Shop by Category */}
        <CategorySection categories={categories.slice(0, 8)} />

        {/* Curated Favorites */}
        <RecommendedProductsContainer
          title="Curated Favorites"
          subtitle="Handpicked pieces for your home."
          className="container mx-auto px-4 py-6 lg:px-8 lg:py-16"
        />

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
          className="pb-20 lg:pb-24"
        />
      </main>
    </>
  );
}
