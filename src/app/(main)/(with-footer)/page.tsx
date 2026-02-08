import { HERO_VIDEOS } from "@/consts/client";
import { CustomizeSection } from "@/features/home";
import { MobileHeaderContainer } from "@/features/layout";
import { RecommendedProductsContainer } from "@/features/recommended-products";
import type { Metadata } from "next";
import Link from "next/link";

import {
  BehindScenesSection,
  CollectionsSectionContainer,
  ExploreSectionContainer,
  HeroSection,
  TestimonialsSectionContainer,
  WorkshopsSectionContainer,
} from "@/components/sections";

import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Poetry & Pottery | Handcrafted Ceramics from Sangli",
  description:
    "Handcrafted pottery with a touch of poetry from Sangli, Maharashtra. Functional, decorative, and custom ceramics - each piece tells a story of patience, passion, and the beauty of letting go.",
  keywords: [
    "handcrafted ceramics",
    "pottery studio sangli",
    "artisan pottery india",
    "custom ceramic gifts",
    "pottery workshops",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Poetry & Pottery | Handcrafted Ceramics from Sangli",
    description:
      "Handcrafted pottery with a touch of poetry from Sangli, Maharashtra. Each piece tells a story of patience, passion, and the beauty of letting go.",
    type: "website",
    url: absoluteUrl("/"),
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
    title: "Poetry & Pottery | Handcrafted Ceramics from Sangli",
    description:
      "Handcrafted pottery with a touch of poetry from Sangli, Maharashtra. Shop our collection today.",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
    ],
  },
};

export default function Home() {
  return (
    <>
      <MobileHeaderContainer />

      <main className="min-h-screen pt-14 lg:pt-20">
        {/* Hero Section */}
        <HeroSection
          video={HERO_VIDEOS.hero}
          imageAlt="Handcrafted pottery in our Sangli studio"
          badge="HANDCRAFTED IN SANGLI"
          title="Where earth meets artistry"
          subtitle="Each piece tells a story of patience, fire, and the quiet beauty of handmade things."
        >
          <div className="flex gap-2.5 pt-2 pb-6 md:gap-3 md:pt-0 md:pb-0">
            <Link
              className="bg-primary inline-flex h-9 items-center rounded-lg px-5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.03] md:h-11 md:rounded-[10px] md:px-7 md:text-[15px] lg:h-12"
              href="/products"
            >
              Shop
            </Link>
            <Link
              className="inline-flex h-9 items-center rounded-lg border-[1.5px] border-white/40 px-5 text-[13px] font-medium text-white transition-all hover:border-white hover:bg-white/10 md:h-11 md:rounded-[10px] md:px-7 md:text-[15px] lg:h-12"
              href="/about"
            >
              Our Story
            </Link>
          </div>
        </HeroSection>

        {/* Explore Categories */}
        <ExploreSectionContainer />

        {/* Collections Carousel */}
        <section className="bg-white">
          <CollectionsSectionContainer
            title="Shop by Collection"
            subtitle="Explore our curated seasonal collections"
            className="container mx-auto px-4 py-8 lg:px-8 lg:py-12"
            viewAllHref="/products"
          />
        </section>

        {/* Featured Products */}
        <section>
          <RecommendedProductsContainer
            title="Featured Pieces"
            subtitle="Handpicked pieces for your home."
            className="container mx-auto px-4 py-8 lg:px-8 lg:py-12"
            viewAllHref="/products"
          />
        </section>

        {/* Customize Your Pottery */}
        <CustomizeSection />

        {/* Behind the Scenes + Workshops — side by side on desktop */}
        <section className="bg-white">
          <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
              <WorkshopsSectionContainer />
              <BehindScenesSection />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSectionContainer />
      </main>
    </>
  );
}
