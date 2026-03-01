import { getAllConfiguredCategories } from "@/data/admin/categories/gateway/server";
import { getAllCollections } from "@/data/admin/products/gateway/server";
import { ProductFormContainer } from "@/features/dashboard/products";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Route: /dashboard/products/new
 * Page does: Admin create page for adding a new catalog product.
 * Key UI operations:
 * - Fill product form (content, pricing, stock, media, category/collection mapping) and publish.
 * - Navigate back to products index after successful creation.
 * UI info needed for operations:
 * - Configured category names and collection options used by product form selectors.
 * - Product creation schema with validation for inventory, pricing, and media inputs.
 */
export default async function NewProductPage() {
  const [configuredCategories, collections] = await Promise.all([
    getAllConfiguredCategories(),
    getAllCollections(),
  ]);
  const categories = configuredCategories.map((c) => c.name);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/products">
          <Button variant="ghost" size="icon">
            <ArrowLeftIcon className="size-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Product</h1>
          <p className="text-muted-foreground">
            Add a new product to your catalog.
          </p>
        </div>
      </div>

      <ProductFormContainer categories={categories} collections={collections} />
    </div>
  );
}
