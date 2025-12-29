import { MobileHeaderContainer } from "@/features/layout";
import { ProductListContainer } from "@/features/products";
import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductsSkeleton } from "@/components/skeletons";
import { getProducts } from "@/data/products/gateway/server";
import type { ProductsFilterParams } from "@/data/products/types";

export const metadata: Metadata = {
  title: "Shop Handcrafted Pottery | Poetry & Pottery",
  description:
    "Discover our collection of handcrafted ceramic pieces. From vases to mugs, each piece is uniquely crafted by artisan potters.",
  openGraph: {
    title: "Shop Handcrafted Pottery | Poetry & Pottery",
    description:
      "Discover our collection of handcrafted ceramic pieces. From vases to mugs, each piece is uniquely crafted by artisan potters.",
    type: "website",
    url: "/products",
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
  },
};

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    materials?: string;
    sort?: string;
    page?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
  }>;
}

function mapSortToOrderBy(
  sort?: string
): ProductsFilterParams["order_by"] | undefined {
  switch (sort) {
    case "price-low":
      return "price_low_to_high";
    case "price-high":
      return "price_high_to_low";
    case "newest":
      return "new";
    default:
      return "featured";
  }
}

async function ProductsContent({
  searchParams,
}: {
  searchParams: ProductsPageProps["searchParams"];
}) {
  const params = await searchParams;

  const filterParams: ProductsFilterParams = {
    categories: params.category ? [params.category] : undefined,
    materials: params.materials?.split(","),
    order_by: mapSortToOrderBy(params.sort),
    page: params.page ? parseInt(params.page, 10) : 1,
    limit: 12,
    min_price: params.minPrice ? parseInt(params.minPrice) : undefined,
    max_price: params.maxPrice ? parseInt(params.maxPrice) : undefined,
    search: params.search,
  };

  const result = await getProducts(filterParams);

  const categories = result.meta.categories.map((cat) => ({
    id: cat,
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
  }));

  const minPrice = result.meta.price_range.min;
  const maxPrice = result.meta.price_range.max;
  const priceRange =
    minPrice != null && maxPrice != null
      ? { min: minPrice, max: maxPrice }
      : undefined;

  return (
    <ProductListContainer
      products={result.products}
      categories={categories}
      materials={result.meta.materials}
      totalProducts={result.total_products}
      priceRange={priceRange}
      priceHistogram={result.meta.price_histogram}
    />
  );
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
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