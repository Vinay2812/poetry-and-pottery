import { getProducts } from "@/actions";
import type { ProductFilterParams } from "@/types";
import type { Metadata } from "next";
import { Suspense } from "react";

import { MobileHeader } from "@/components/layout";
import { ProductsClient } from "@/components/products";
import { Skeleton } from "@/components/ui/skeleton";

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

function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-6 lg:px-8">
      <div className="flex gap-8">
        {/* Desktop Sidebar Skeleton */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <Skeleton className="mb-6 h-7 w-24" />
          <div className="space-y-4">
            <Skeleton className="h-5 w-32" />
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </aside>

        {/* Product Grid Skeleton */}
        <div className="flex-1">
          <div className="mb-6 hidden items-center justify-between lg:flex">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-48" />
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    materials?: string;
    sort?: string;
    page?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

async function ProductsContent({
  searchParams,
}: {
  searchParams: ProductsPageProps["searchParams"];
}) {
  const params = await searchParams;

  // Build filter params from URL search params
  const filterParams: ProductFilterParams = {
    category: params.category,
    materials: params.materials?.split(","),
    sortBy: (params.sort as ProductFilterParams["sortBy"]) || "featured",
    page: params.page ? parseInt(params.page, 10) : 1,
    limit: 12,
    minPrice: params.minPrice ? parseInt(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? parseInt(params.maxPrice) : undefined,
  };

  // Fetch products from database
  const result = await getProducts(filterParams);

  // Format categories for the filter UI
  const categories = result.categories.map((cat) => ({
    id: cat,
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
  }));

  return (
    <ProductsClient
      products={result.data}
      categories={categories}
      materials={result.materials}
      totalProducts={result.total}
      priceRange={result.priceRange}
      priceHistogram={result.priceHistogram}
    />
  );
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  return (
    <>
      <MobileHeader title="Shop Pottery" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-0">
        <Suspense fallback={<ProductsLoading />}>
          <ProductsContent searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
}
