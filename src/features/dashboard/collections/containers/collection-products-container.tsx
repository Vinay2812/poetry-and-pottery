"use client";

import {
  assignProductsToCollection,
  removeProductFromCollection,
} from "@/data/admin/collections/gateway/server";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";

import { CollectionProductsSection } from "../components/collection-products-section";
import { ProductSelectorDialog } from "../components/product-selector-dialog";
import type { CollectionProductsContainerProps } from "../types";
import { buildCollectionProductViewModel } from "../types";

export function CollectionProductsContainer({
  collection,
}: CollectionProductsContainerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const products = useMemo(
    () => collection.products.map(buildCollectionProductViewModel),
    [collection.products],
  );

  const handleRemoveProduct = useCallback(
    (productId: number) => {
      if (!confirm("Remove this product from the collection?")) {
        return;
      }

      startTransition(async () => {
        const result = await removeProductFromCollection(productId);
        if (!result.success) {
          console.error("Failed to remove product:", result.error);
          alert(result.error || "Failed to remove product");
        }
        router.refresh();
      });
    },
    [router],
  );

  const handleManageProducts = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handleAssignProducts = useCallback(
    (productIds: number[]) => {
      startTransition(async () => {
        const result = await assignProductsToCollection({
          collectionId: collection.id,
          productIds,
        });

        if (!result.success) {
          console.error("Failed to assign products:", result.error);
          alert(result.error || "Failed to assign products");
        }

        setIsDialogOpen(false);
        router.refresh();
      });
    },
    [collection.id, router],
  );

  return (
    <>
      <CollectionProductsSection
        products={products}
        isPending={isPending}
        onRemoveProduct={handleRemoveProduct}
        onManageProducts={handleManageProducts}
      />

      <ProductSelectorDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleAssignProducts}
        selectedProductIds={collection.products.map((p) => p.id)}
        isPending={isPending}
      />
    </>
  );
}
