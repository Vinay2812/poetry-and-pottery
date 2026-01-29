"use client";

import { CheckIcon, PackageIcon, SearchIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { OptimizedImage } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useAdminProductsQuery } from "@/graphql/generated/graphql";

import { formatPrice } from "../types";

interface ProductSelectorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (productIds: number[]) => void;
  selectedProductIds: number[];
  isPending: boolean;
}

export function ProductSelectorDialog({
  isOpen,
  onClose,
  onConfirm,
  selectedProductIds,
  isPending,
}: ProductSelectorDialogProps) {
  const [search, setSearch] = useState("");
  const [localSelectedIds, setLocalSelectedIds] =
    useState<number[]>(selectedProductIds);

  const { data, loading } = useAdminProductsQuery({
    variables: {
      filter: {
        search: search || undefined,
        page: 1,
        limit: 50,
      },
    },
    skip: !isOpen,
  });

  const products = data?.adminProducts.products ?? [];

  const handleToggleProduct = useCallback((productId: number) => {
    setLocalSelectedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm(localSelectedIds);
  }, [localSelectedIds, onConfirm]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[80vh] max-w-3xl overflow-hidden">
        <DialogHeader>
          <DialogTitle>Manage Collection Products</DialogTitle>
          <DialogDescription>
            Select products to include in this collection. Changes will replace
            all currently assigned products.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="text-sm text-neutral-500">
            {localSelectedIds.length} product
            {localSelectedIds.length !== 1 ? "s" : ""} selected
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="py-8 text-center text-neutral-500">
                Loading products...
              </div>
            ) : products.length === 0 ? (
              <div className="py-8 text-center text-neutral-500">
                No products found
              </div>
            ) : (
              <div className="grid gap-2">
                {products.map((product) => {
                  const isSelected = localSelectedIds.includes(product.id);
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => handleToggleProduct(product.id)}
                      className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                      }`}
                    >
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                        {product.image_urls[0] ? (
                          <OptimizedImage
                            src={product.image_urls[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center text-neutral-400">
                            <PackageIcon className="size-6" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-neutral-900">
                          {product.name}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {formatPrice(product.price)} -{" "}
                          {product.is_active ? "Active" : "Inactive"}
                        </p>
                      </div>

                      <div
                        className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${
                          isSelected
                            ? "border-primary bg-primary text-white"
                            : "border-neutral-300"
                        }`}
                      >
                        {isSelected && <CheckIcon className="size-4" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
