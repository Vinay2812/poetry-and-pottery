"use client";

import {
  AlertTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
  MoreHorizontalIcon,
  PackageIcon,
  PlusIcon,
  SearchIcon,
  StarIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { ProductRowViewModel, ProductsTableProps } from "../types";

interface ProductCardProps {
  product: ProductRowViewModel;
  onToggleActive: (productId: number) => void;
  onDelete: (productId: number) => void;
  isPending: boolean;
}

function ProductCard({
  product,
  onToggleActive,
  onDelete,
  isPending,
}: ProductCardProps) {
  return (
    <div className="hover:shadow-soft overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow">
      <Link href={`/dashboard/products/${product.id}`} className="block">
        {product.imageUrl ? (
          <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex aspect-square w-full items-center justify-center bg-neutral-100 text-neutral-400">
            <PackageIcon className="size-12" />
          </div>
        )}
      </Link>

      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-2">
          <Link href={`/dashboard/products/${product.id}`} className="min-w-0">
            <h3 className="hover:text-primary truncate font-semibold text-neutral-900">
              {product.name}
            </h3>
            <p className="truncate text-sm text-neutral-500">
              {product.material}
            </p>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={isPending}>
              <Button variant="ghost" size="icon" className="size-8 shrink-0">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/products/${product.id}`}>
                  <EditIcon className="mr-2 size-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleActive(product.id)}>
                {product.isActive ? "Deactivate" : "Activate"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(product.id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2Icon className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <div
            className="size-4 shrink-0 rounded-full border border-neutral-200"
            style={{ backgroundColor: product.colorCode }}
          />
          <span className="truncate text-sm text-neutral-600">
            {product.colorName}
          </span>
          <Badge
            variant={product.isActive ? "default" : "secondary"}
            className={`ml-auto shrink-0 ${product.isActive ? "" : "bg-neutral-100 text-neutral-500"}`}
          >
            {product.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        {product.categories.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {product.categories.slice(0, 2).map((cat) => (
              <Badge key={cat} variant="outline" className="text-xs">
                {cat}
              </Badge>
            ))}
            {product.categories.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{product.categories.length - 2}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-neutral-600">
          <div className="flex items-center gap-1">
            <PackageIcon className="size-4 text-neutral-400" />
            <span
              className={
                product.isLowStock ? "font-medium text-amber-600" : undefined
              }
            >
              {product.availableQuantity}
            </span>
            {product.isLowStock && (
              <AlertTriangleIcon className="size-3 text-amber-500" />
            )}
          </div>
          {product.reviewsCount > 0 && (
            <div className="flex items-center gap-1">
              <StarIcon className="size-4 text-neutral-400" />
              <span>{product.reviewsCount}</span>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
          <span className="text-sm text-neutral-500">Price</span>
          <span className="font-semibold text-neutral-900">
            {product.priceFormatted}
          </span>
        </div>
      </div>
    </div>
  );
}

function Pagination({
  pagination,
  onPageChange,
  itemName = "items",
}: {
  pagination: ProductsTableProps["viewModel"]["pagination"];
  onPageChange: (page: number) => void;
  itemName?: string;
}) {
  if (pagination.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-neutral-500">
        Showing {pagination.showingFrom} to {pagination.showingTo} of{" "}
        {pagination.total} {itemName}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={pagination.page <= 1}
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
        <span className="text-sm text-neutral-600">
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={pagination.page >= pagination.totalPages}
        >
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export function ProductsTable({
  viewModel,
  categories,
  isPending,
  onSearch,
  onCategoryFilter,
  onActiveFilter,
  onPageChange,
  onToggleActive,
  onDelete,
}: ProductsTableProps) {
  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-64">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Search products..."
              value={viewModel.searchValue}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-2">
            <Select
              value={viewModel.categoryFilter}
              onValueChange={onCategoryFilter}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
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
          </div>
        </div>

        <Link href="/dashboard/products/new">
          <Button>
            <PlusIcon className="mr-2 size-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Top Pagination */}
      <Pagination
        pagination={viewModel.pagination}
        onPageChange={onPageChange}
        itemName="products"
      />

      {/* Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {viewModel.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onToggleActive={onToggleActive}
            onDelete={onDelete}
            isPending={isPending}
          />
        ))}
      </div>

      {viewModel.products.length === 0 && (
        <div className="rounded-xl border border-neutral-200 bg-white py-12 text-center text-neutral-500">
          No products found
        </div>
      )}

      {/* Bottom Pagination */}
      <Pagination
        pagination={viewModel.pagination}
        onPageChange={onPageChange}
        itemName="products"
      />
    </div>
  );
}
