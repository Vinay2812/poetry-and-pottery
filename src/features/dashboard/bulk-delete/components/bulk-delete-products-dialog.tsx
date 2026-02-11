"use client";

import {
  AlertTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
  PackageIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";

import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  type BulkDeleteProductsDialogProps,
  PAGE_SIZE_OPTIONS,
} from "../types";

export function BulkDeleteProductsDialog({
  isOpen,
  viewModel,
  onSearch,
  onCategoryFilter,
  onCollectionFilter,
  onActiveFilter,
  onPageSizeChange,
  onPageChange,
  onToggleSelection,
  onToggleSelectAll,
  onBulkDelete,
  onClose,
}: BulkDeleteProductsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-hidden">
        <DialogHeader>
          <DialogTitle>Bulk Delete Products</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px] flex-1">
              <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="Search products..."
                value={viewModel.search}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select
              value={viewModel.categoryFilter}
              onValueChange={onCategoryFilter}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Categories</SelectItem>
                {viewModel.categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={viewModel.collectionFilter}
              onValueChange={onCollectionFilter}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Collections</SelectItem>
                {viewModel.collections.map((col) => (
                  <SelectItem key={col.id} value={col.id.toString()}>
                    {col.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={viewModel.activeFilter}
              onValueChange={onActiveFilter}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={viewModel.pageSize} onValueChange={onPageSizeChange}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Per page" />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Select All Row */}
          <div className="flex items-center justify-between rounded-lg bg-neutral-50 px-4 py-2">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={viewModel.isAllSelected}
                onCheckedChange={onToggleSelectAll}
                disabled={
                  viewModel.products.length === 0 || viewModel.isLoading
                }
              />
              <span className="text-sm text-neutral-600">
                Select all on this page
              </span>
            </div>
            {viewModel.selectedCount > 0 && (
              <span className="text-sm font-medium text-neutral-700">
                {viewModel.selectedCount} selected
              </span>
            )}
          </div>

          {/* Products List */}
          <div className="max-h-[400px] overflow-y-auto rounded-lg border">
            {viewModel.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2Icon className="size-8 animate-spin text-neutral-400" />
              </div>
            ) : viewModel.products.length === 0 ? (
              <div className="py-12 text-center text-neutral-500">
                No products found
              </div>
            ) : (
              <div className="divide-y">
                {viewModel.products.map((product) => (
                  <div
                    key={product.id}
                    className={`flex items-center gap-4 p-3 transition-colors ${
                      viewModel.selectedIds.includes(product.id)
                        ? "bg-primary/5"
                        : "hover:bg-neutral-50"
                    }`}
                  >
                    <Checkbox
                      checked={viewModel.selectedIds.includes(product.id)}
                      onCheckedChange={() => onToggleSelection(product.id)}
                    />
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      {product.imageUrl ? (
                        <OptimizedImage
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center">
                          <PackageIcon className="size-6 text-neutral-400" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium text-neutral-900">
                          {product.name}
                        </span>
                        <Badge
                          variant={product.isActive ? "default" : "secondary"}
                          className="shrink-0"
                        >
                          {product.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-neutral-500">
                        <span>{product.priceFormatted}</span>
                        <span className="flex items-center gap-1">
                          <PackageIcon className="size-3" />
                          {product.availableQuantity}
                          {product.availableQuantity <= 5 && (
                            <AlertTriangleIcon className="size-3 text-amber-500" />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {viewModel.pagination.totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-500">
                Showing {viewModel.pagination.showingFrom} to{" "}
                {viewModel.pagination.showingTo} of {viewModel.pagination.total}{" "}
                products
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(viewModel.pagination.page - 1)}
                  disabled={
                    viewModel.pagination.page <= 1 || viewModel.isLoading
                  }
                >
                  <ChevronLeftIcon className="size-4" />
                </Button>
                <span className="text-sm text-neutral-600">
                  Page {viewModel.pagination.page} of{" "}
                  {viewModel.pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(viewModel.pagination.page + 1)}
                  disabled={
                    viewModel.pagination.page >=
                      viewModel.pagination.totalPages || viewModel.isLoading
                  }
                >
                  <ChevronRightIcon className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onBulkDelete}
            disabled={viewModel.selectedCount === 0 || viewModel.isPending}
          >
            <Trash2Icon className="mr-2 size-4" />
            Delete{" "}
            {viewModel.selectedCount > 0
              ? `(${viewModel.selectedCount})`
              : "Selected"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
