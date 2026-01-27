import { DEFAULT_PAGE_SIZE } from "@/consts/performance";
import { getProducts } from "@/data/products/gateway/server";
import {
  ProductOrderBy,
  type ProductsFilterParams,
  getProductsOrderBy,
} from "@/data/products/types";
import { MobileHeaderContainer } from "@/features/layout";
import { ProductListContainer } from "@/features/products";
import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductsSkeleton } from "@/components/skeletons";

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
    categories?: string;
    materials?: string;
    sort?: ProductOrderBy;
    page?: string;
    min_price?: string;
    max_price?: string;
    search?: string;
  }>;
}

async function ProductsContent({
  searchParams,
}: {
  searchParams: ProductsPageProps["searchParams"];
}) {
  const params = await searchParams;

  const filterParams: ProductsFilterParams = {
    categories: params.categories?.split(","),
    materials: params.materials?.split(","),
    order_by: getProductsOrderBy(params.sort),
    page: params.page ? parseInt(params.page, 10) : 1,
    limit: DEFAULT_PAGE_SIZE,
    min_price: params.min_price ? parseInt(params.min_price) : undefined,
    max_price: params.max_price ? parseInt(params.max_price) : undefined,
    search: params.search,
  };

  const result = await getProducts(filterParams);

  return <ProductListContainer productsWithFiltersAndMetadata={result} />;
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
