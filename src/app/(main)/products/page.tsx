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
    collection_ids?: string;
    sort?: ProductOrderBy;
    page?: string;
    min_price?: string;
    max_price?: string;
    search?: string;
    archive?: string;
  }>;
}

async function ProductsContent({
  searchParams,
}: {
  searchParams: ProductsPageProps["searchParams"];
}) {
  const params = await searchParams;
  const isArchive = params.archive === "true";

  const filterParams: ProductsFilterParams = {
    categories: params.categories?.split(","),
    materials: params.materials?.split(","),
    collection_ids: params.collection_ids
      ?.split(",")
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(id)),
    order_by: getProductsOrderBy(params.sort),
    page: params.page ? parseInt(params.page, 10) : 1,
    limit: DEFAULT_PAGE_SIZE,
    min_price: params.min_price ? parseInt(params.min_price) : undefined,
    max_price: params.max_price ? parseInt(params.max_price) : undefined,
    search: params.search,
    archive: isArchive,
  };

  // Fetch both active and archived counts in parallel
  const [result, activeResult, archivedResult] = await Promise.all([
    getProducts(filterParams),
    getProducts({ ...filterParams, archive: false, page: 1, limit: 1 }),
    getProducts({ ...filterParams, archive: true, page: 1, limit: 1 }),
  ]);

  return (
    <ProductListContainer
      productsWithFiltersAndMetadata={result}
      activeProductsCount={activeResult.total_products}
      archivedProductsCount={archivedResult.total_products}
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
