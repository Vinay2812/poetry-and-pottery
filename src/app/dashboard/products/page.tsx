import {
  getAllCategories,
  getAllCollections,
  getProducts,
} from "@/data/admin/products/gateway/server";
import { ProductsTableContainer } from "@/features/dashboard/products";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    collection?: string;
    status?: string;
    stock?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">
          Manage your product catalog, inventory, and pricing.
        </p>
      </div>

      <Suspense fallback={<ProductsTableSkeleton />}>
        <ProductsTableContent
          search={params.search}
          category={params.category}
          collection={params.collection}
          status={params.status}
          stock={params.stock}
          page={params.page}
        />
      </Suspense>
    </div>
  );
}

async function ProductsTableContent({
  search,
  category,
  collection,
  status,
  stock,
  page,
}: {
  search?: string;
  category?: string;
  collection?: string;
  status?: string;
  stock?: string;
  page?: string;
}) {
  const [data, categories, collections] = await Promise.all([
    getProducts({
      search,
      category,
      collectionId: collection ? parseInt(collection) : undefined,
      isActive:
        status === "active" ? true : status === "inactive" ? false : undefined,
      lowStock: stock === "low" ? true : undefined,
      outOfStock: stock === "out" ? true : undefined,
      page: page ? parseInt(page) : 1,
      limit: 20,
    }),
    getAllCategories(),
    getAllCollections(),
  ]);

  return (
    <ProductsTableContainer
      data={data}
      categories={categories}
      collections={collections}
    />
  );
}

function ProductsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-36" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <div className="border-b border-neutral-100 bg-neutral-50/50 px-4 py-3">
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Skeleton key={i} className="h-4 w-20" />
            ))}
          </div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-neutral-100 px-4 py-3"
          >
            <Skeleton className="size-12 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
