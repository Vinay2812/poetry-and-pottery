"use client";

import { PackageIcon, PlusIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { CollectionProductsSectionProps } from "../types";

export function CollectionProductsSection({
  products,
  isPending,
  onRemoveProduct,
  onManageProducts,
}: CollectionProductsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            Products in Collection
          </h2>
          <p className="text-sm text-neutral-500">
            {products.length} {products.length === 1 ? "product" : "products"}{" "}
            assigned to this collection
          </p>
        </div>
        <Button onClick={onManageProducts} disabled={isPending}>
          <PlusIcon className="mr-2 size-4" />
          Manage Products
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 py-12 text-center">
          <PackageIcon className="mx-auto mb-3 size-12 text-neutral-400" />
          <p className="text-neutral-600">No products in this collection yet</p>
          <p className="mb-4 text-sm text-neutral-500">
            Click &quot;Manage Products&quot; to add products
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="hover:shadow-soft overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow"
            >
              <Link
                href={`/dashboard/products/${product.id}`}
                className="block"
              >
                {product.imageUrl ? (
                  <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
                    <OptimizedImage
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center bg-neutral-100 text-neutral-400">
                    <PackageIcon className="size-12" />
                  </div>
                )}
              </Link>

              <div className="p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <Link
                    href={`/dashboard/products/${product.id}`}
                    className="min-w-0"
                  >
                    <h3 className="hover:text-primary truncate font-medium text-neutral-900">
                      {product.name}
                    </h3>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0 text-neutral-400 hover:text-red-600"
                    onClick={() => onRemoveProduct(product.id)}
                    disabled={isPending}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium text-neutral-900">
                    {product.priceFormatted}
                  </span>
                  <Badge
                    variant={product.isActive ? "default" : "secondary"}
                    className={
                      product.isActive ? "" : "bg-neutral-100 text-neutral-500"
                    }
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
