import { SITE_MEDIA } from "@/consts/site-content";
import { CustomizeSection } from "@/features/home";
import { MobileHeaderContainer } from "@/features/layout";
import { RecommendedProductsContainer } from "@/features/recommended-products";
import Link from "next/link";

import {
  CollectionsSectionContainer,
  ExploreSectionContainer,
  HeroSection,
  TestimonialsSectionContainer,
  WorkshopsSectionContainer,
} from "@/components/sections";
import { ImagePreloader } from "@/components/shared";

import { absoluteUrl } from "@/lib/seo";
import { buildMetadataFromSeo } from "@/lib/site-content";

export function generateMetadata() {
  const base = buildMetadataFromSeo("home");
  return {
    ...base,
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
  };
}

/**
 * Route: /
 * Page does: Landing page for brand storytelling, featured shopping sections, and top-level navigation.
 * Key UI operations:
 * - Navigate to Shop, About, category collections, and workshop booking entry points.
 * - Browse featured products and trigger quick purchase actions directly from homepage cards.
 * UI info needed for operations:
 * - Homepage content blocks (hero media, categories, collections, featured products, workshop promos, testimonials).
 * - Linked product/event identifiers and CTA targets used by cards and section buttons.
 */
export default function Home() {
  return (
    <>
      <MobileHeaderContainer />

      <main className="min-h-screen pt-14 lg:pt-20">
        {/* Hero Section */}
        <HeroSection
          images={SITE_MEDIA.homeHeroImages}
          imageAlt="Handcrafted pottery in our Sangli studio"
          badge="HANDCRAFTED IN SANGLI"
          title="Where earth meets artistry"
          subtitle="Each piece tells a story of patience, fire, and the quiet beauty of handmade things."
          mediaOverlay={
            <Link
              href="/about"
              className="absolute bottom-4 left-4 z-30 inline-flex h-9 items-center rounded-full bg-white/95 px-4 text-[13px] font-semibold text-neutral-900 shadow-lg backdrop-blur-sm transition-all hover:scale-[1.03] hover:bg-white lg:bottom-5 lg:left-5 lg:h-10 lg:px-5 lg:text-sm"
            >
              Our Story →
            </Link>
          }
        >
          <div className="flex flex-col gap-7">
            {/* Studio story + primary CTA, grouped together */}
            <div className="space-y-5">
              <p className="text-muted-foreground max-w-md text-sm leading-relaxed md:text-[15px]">
                What began as a quiet weekend escape in Sangli grew into a love
                for shaping clay by hand — each piece thrown, glazed, and
                finished in our small studio.{" "}
              </p>
            </div>

            {/* Categories fill the hero's right column */}
            <ExploreSectionContainer embedded />

            <Link
              className="bg-primary shadow-primary/20 inline-flex h-11 w-fit items-center rounded-full px-6 text-[14px] font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] md:h-12 md:px-8 md:text-[15px]"
              href="/products"
            >
              Explore Collection →
            </Link>
          </div>
        </HeroSection>

        {/* Warm the remaining hero carousel slides during idle time */}
        <ImagePreloader images={SITE_MEDIA.homeHeroImages} skip={1} />

        <hr className="border-border mx-auto w-[92%]" />

        {/* Collections Carousel */}
        <section>
          <CollectionsSectionContainer
            title="Shop by Collection"
            subtitle="Explore our curated seasonal collections"
            className="container mx-auto px-4 py-8 lg:px-8 lg:py-12"
            viewAllHref="/products"
          />
        </section>

        <hr className="border-border mx-auto w-[92%]" />

        {/* Featured Products */}
        <section>
          <RecommendedProductsContainer
            title="Featured Pieces"
            subtitle="Handpicked pieces for your home."
            className="container mx-auto px-4 py-8 lg:px-8 lg:py-12"
            viewAllHref="/products"
          />
        </section>

        <hr className="border-border mx-auto w-[92%]" />

        {/* Daily Workshops + Customize — side by side on desktop */}
        <section>
          <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <CustomizeSection />
              <WorkshopsSectionContainer />
            </div>
          </div>
        </section>

        <hr className="border-border mx-auto w-[92%]" />

        {/* Testimonials */}
        <TestimonialsSectionContainer />
      </main>
    </>
  );
}
