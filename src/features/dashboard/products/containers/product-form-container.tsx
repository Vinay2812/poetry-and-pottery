"use client";

import {
  createProduct,
  updateProduct,
} from "@/data/admin/products/gateway/server";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";

import { ProductForm } from "../components/product-form";
import type { ProductFormContainerProps, ProductFormData } from "../types";
import { buildProductFormViewModel } from "../types";

export function ProductFormContainer({
  product,
  categories,
}: ProductFormContainerProps) {
  const router = useRouter();
  const { startNavigation } = useRouteAnimation();

  const viewModel = useMemo(
    () => buildProductFormViewModel(product),
    [product],
  );

  const isEditing = !!product;

  const handleSubmit = useCallback(
    async (data: ProductFormData) => {
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
          startNavigation(() => {
            router.push("/dashboard/products");
            router.refresh();
          });
        } else {
          alert(result.error || "Failed to update product");
        }
        return;
      }

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
        startNavigation(() => {
          router.push("/dashboard/products");
          router.refresh();
        });
      } else {
        alert(result.error || "Failed to create product");
      }
    },
    [isEditing, product, router, startNavigation],
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
      isEditing={isEditing}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
