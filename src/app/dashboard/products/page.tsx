import {
  getAllCategories,
  getAllCollections,
  getProducts,
} from "@/data/admin/products/gateway/server";
import { ProductsTableContainer } from "@/features/dashboard/products";
import { Suspense } from "react";

import { ProductsTableSkeleton } from "@/components/skeletons";

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
