import { MobileHeaderContainer } from "@/features/layout";
import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductsSkeleton } from "@/components/skeletons";

import { absoluteUrl } from "@/lib/seo";

import {
  ProductsContent,
  type ProductsPageSearchParams,
} from "./products-content";

export const metadata: Metadata = {
  title: "Shop Handcrafted Pottery | Poetry & Pottery",
  description:
    "Discover our collection of handcrafted ceramic pieces. From vases to mugs, each piece is uniquely crafted by artisan potters.",
  keywords: [
    "shop pottery online",
    "handmade mugs",
    "ceramic vases",
    "artisan tableware",
    "handcrafted home decor",
  ],
  alternates: {
    canonical: absoluteUrl("/products"),
  },
  openGraph: {
    title: "Shop Handcrafted Pottery | Poetry & Pottery",
    description:
      "Discover our collection of handcrafted ceramic pieces. From vases to mugs, each piece is uniquely crafted by artisan potters.",
    type: "website",
    url: absoluteUrl("/products"),
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
    title: "Shop Handcrafted Pottery | Poetry & Pottery",
    description:
      "Discover our collection of handcrafted ceramic pieces. From vases to mugs, each piece is uniquely crafted by artisan potters.",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
    ],
  },
};

interface ProductsPageProps {
  searchParams: Promise<ProductsPageSearchParams>;
}

/**
 * Route: /products
 * Page does: Catalog page with faceted filtering, sorting, and direct purchase shortcuts.
 * Key UI operations:
 * - Filter by archive state, price range, category, material, and search/sort controls.
 * - Paginate results, open product details, and trigger add-to-cart/wishlist from cards.
 * UI info needed for operations:
 * - Query params: `archive`, `categories`, `materials`, `collection_ids`, `sort`, `page`, `min_price`, `max_price`, `search`.
 * - Product list payload plus filter metadata (counts, price bounds, available facets).
 */
export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <>
      <MobileHeaderContainer title="Shop Pottery" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-0">
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsContent searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
}
