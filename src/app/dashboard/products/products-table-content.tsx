import {
  getAllCategories,
  getAllCollections,
  getProducts,
} from "@/data/admin/products/gateway/server";
import { ProductsTableContainer } from "@/features/dashboard/products";

export interface DashboardProductsSearchParams {
  search?: string;
  category?: string;
  collection?: string;
  status?: string;
  stock?: string;
  page?: string;
}

interface ProductsTableContentProps {
  search?: string;
  category?: string;
  collection?: string;
  status?: string;
  stock?: string;
  page?: string;
}

export async function ProductsTableContent({
  search,
  category,
  collection,
  status,
  stock,
  page,
}: ProductsTableContentProps) {
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
