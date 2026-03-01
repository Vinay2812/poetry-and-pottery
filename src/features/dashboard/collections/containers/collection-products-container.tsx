"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import {
  useAdminAssignProductsToCollectionMutation,
  useAdminRemoveProductFromCollectionMutation,
} from "@/graphql/generated/graphql";

import { CollectionProductsSection } from "../components/collection-products-section";
import { ProductSelectorDialog } from "../components/product-selector-dialog";
import type { CollectionProductsContainerProps } from "../types";
import { buildCollectionProductViewModel } from "../types";

export function CollectionProductsContainer({
  collection,
}: CollectionProductsContainerProps) {
  const router = useRouter();
  const [assignProductsToCollectionMutation, { loading: assignLoading }] =
    useAdminAssignProductsToCollectionMutation();
  const [removeProductFromCollectionMutation, { loading: removeLoading }] =
    useAdminRemoveProductFromCollectionMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const products = useMemo(
    () => collection.products.map(buildCollectionProductViewModel),
    [collection.products],
  );

  const handleRemoveProduct = useCallback(
    async (productId: number) => {
      if (!confirm("Remove this product from the collection?")) {
        return;
      }

      try {
        const { data } = await removeProductFromCollectionMutation({
          variables: { productId },
        });
        const result = data?.adminRemoveProductFromCollection;
        if (!result?.success) {
          console.error("Failed to remove product:", result?.error);
          alert(result?.error || "Failed to remove product");
        }
      } catch (error) {
        console.error("Failed to remove product:", error);
      } finally {
        router.refresh();
      }
    },
    [removeProductFromCollectionMutation, router],
  );

  const handleManageProducts = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handleAssignProducts = useCallback(
    async (productIds: number[]) => {
      try {
        const { data } = await assignProductsToCollectionMutation({
          variables: {
            input: {
              collectionId: collection.id,
              productIds,
            },
          },
        });
        const result = data?.adminAssignProductsToCollection;

        if (!result?.success) {
          console.error("Failed to assign products:", result?.error);
          alert(result?.error || "Failed to assign products");
        }
      } catch (error) {
        console.error("Failed to assign products:", error);
      } finally {
        setIsDialogOpen(false);
        router.refresh();
      }
    },
    [assignProductsToCollectionMutation, collection.id, router],
  );

  return (
    <>
      <CollectionProductsSection
        products={products}
        isPending={assignLoading || removeLoading}
        onRemoveProduct={handleRemoveProduct}
        onManageProducts={handleManageProducts}
      />

      <ProductSelectorDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleAssignProducts}
        selectedProductIds={collection.products.map((p) => p.id)}
        isPending={assignLoading || removeLoading}
      />
    </>
  );
}
