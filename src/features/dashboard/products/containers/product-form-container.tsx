"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";

import {
  useAdminCreateProductMutation,
  useAdminUpdateProductMutation,
} from "@/graphql/generated/graphql";

import { ProductForm } from "../components/product-form";
import type { ProductFormContainerProps, ProductFormData } from "../types";
import { buildProductFormViewModel } from "../types";

export function ProductFormContainer({
  product,
  categories,
  collections,
}: ProductFormContainerProps) {
  const router = useRouter();
  const { startNavigation } = useRouteAnimation();
  const [createProductMutation] = useAdminCreateProductMutation();
  const [updateProductMutation] = useAdminUpdateProductMutation();

  const viewModel = useMemo(
    () => buildProductFormViewModel(product),
    [product],
  );

  const isEditing = !!product;

  const handleSubmit = useCallback(
    async (data: ProductFormData) => {
      try {
        if (isEditing && product) {
          const { data: updateData } = await updateProductMutation({
            variables: {
              id: product.id,
              input: {
                name: data.name,
                slug: data.slug,
                description: data.description,
                instructions: data.instructions,
                price: data.price,
                total_quantity: data.totalQuantity,
                available_quantity: data.availableQuantity,
                is_active: data.isActive,
                color_name: data.colorName,
                color_code: data.colorCode,
                material: data.material,
                image_urls: data.imageUrls,
                categories: data.categories,
                collection_id: data.collectionId,
              },
            },
          });
          const result = updateData?.adminUpdateProduct;

          if (result?.success) {
            startNavigation(() => {
              router.push("/dashboard/products");
              router.refresh();
            });
          } else {
            alert(result?.error || "Failed to update product");
          }
          return;
        }

        const { data: createData } = await createProductMutation({
          variables: {
            input: {
              name: data.name,
              slug: data.slug,
              description: data.description,
              instructions: data.instructions,
              price: data.price,
              total_quantity: data.totalQuantity,
              available_quantity: data.availableQuantity,
              is_active: data.isActive,
              color_name: data.colorName,
              color_code: data.colorCode,
              material: data.material,
              image_urls: data.imageUrls,
              categories: data.categories,
              collection_id: data.collectionId,
            },
          },
        });
        const result = createData?.adminCreateProduct;

        if (result?.success) {
          startNavigation(() => {
            router.push("/dashboard/products");
            router.refresh();
          });
        } else {
          alert(result?.error || "Failed to create product");
        }
      } catch (error) {
        alert(
          error instanceof Error ? error.message : "Failed to save product",
        );
      }
    },
    [
      createProductMutation,
      isEditing,
      product,
      router,
      startNavigation,
      updateProductMutation,
    ],
  );

  const handleCancel = useCallback(() => {
    startNavigation(() => {
      router.push("/dashboard/products");
    });
  }, [router, startNavigation]);

  return (
    <ProductForm
      viewModel={viewModel}
      availableCategories={categories}
      availableCollections={collections}
      isEditing={isEditing}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
