"use client";

import {
  createProduct,
  updateProduct,
} from "@/data/admin/products/gateway/server";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";

import { ProductForm } from "../components/product-form";
import type { ProductFormContainerProps, ProductFormData } from "../types";
import { buildProductFormViewModel } from "../types";

export function ProductFormContainer({
  product,
  categories,
}: ProductFormContainerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const viewModel = useMemo(
    () => buildProductFormViewModel(product),
    [product],
  );

  const isEditing = !!product;

  const handleSubmit = useCallback(
    (data: ProductFormData) => {
      startTransition(async () => {
        if (isEditing && product) {
          const result = await updateProduct(product.id, {
            name: data.name,
            slug: data.slug,
            description: data.description || undefined,
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
          });

          if (result.success) {
            router.push("/dashboard/products");
            router.refresh();
          } else {
            alert(result.error || "Failed to update product");
          }
        } else {
          const result = await createProduct({
            name: data.name,
            slug: data.slug,
            description: data.description || undefined,
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
          });

          if (result.success) {
            router.push("/dashboard/products");
            router.refresh();
          } else {
            alert(result.error || "Failed to create product");
          }
        }
      });
    },
    [isEditing, product, router],
  );

  const handleCancel = useCallback(() => {
    router.push("/dashboard/products");
  }, [router]);

  return (
    <ProductForm
      viewModel={viewModel}
      availableCategories={categories}
      isSubmitting={isPending}
      isEditing={isEditing}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
