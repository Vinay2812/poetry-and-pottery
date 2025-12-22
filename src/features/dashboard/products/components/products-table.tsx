"use client";

import {
  AlertTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
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

interface ProductRowProps {
  product: ProductRowViewModel;
  onToggleActive: (productId: number) => void;
  onDelete: (productId: number) => void;
  isPending: boolean;
}

function ProductRow({
  product,
  onToggleActive,
  onDelete,
  isPending,
}: ProductRowProps) {
  return (
    <tr className="transition-colors hover:bg-neutral-50/50">
      <td className="px-4 py-3">
        <Link
          href={`/dashboard/products/${product.id}`}
          className="flex items-center gap-3"
        >
          {product.imageUrl ? (
            <div className="relative size-12 overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex size-12 items-center justify-center rounded-lg bg-neutral-100 text-neutral-400">
              <span className="text-xs">No img</span>
            </div>
          )}
          <div className="min-w-0">
            <p className="hover:text-primary truncate font-medium text-neutral-900">
              {product.name}
            </p>
            <p className="truncate text-sm text-neutral-500">
              {product.material}
            </p>
          </div>
        </Link>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div
            className="size-4 rounded-full border border-neutral-200"
            style={{ backgroundColor: product.colorCode }}
          />
          <span className="text-sm text-neutral-600">{product.colorName}</span>
        </div>
      </td>
      <td className="hidden px-4 py-3 md:table-cell">
        <div className="flex flex-wrap gap-1">
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
      </td>
      <td className="px-4 py-3 text-right">
        <span className="font-medium text-neutral-900">
          {product.priceFormatted}
        </span>
      </td>
      <td className="hidden px-4 py-3 md:table-cell">
        <div className="flex items-center gap-2">
          <span
            className={`${product.isLowStock ? "font-medium text-amber-600" : "text-neutral-600"}`}
          >
            {product.availableQuantity}
          </span>
          {product.isLowStock && (
            <AlertTriangleIcon className="size-4 text-amber-500" />
          )}
        </div>
      </td>
      <td className="hidden px-4 py-3 lg:table-cell">
        <span className="text-sm text-neutral-600">{product.reviewsCount}</span>
      </td>
      <td className="px-4 py-3">
        <Badge
          variant={product.isActive ? "default" : "secondary"}
          className={product.isActive ? "" : "bg-neutral-100 text-neutral-500"}
        >
          {product.isActive ? "Active" : "Inactive"}
        </Badge>
      </td>
      <td className="px-4 py-3 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isPending}>
            <Button variant="ghost" size="icon" className="size-8">
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
      </td>
    </tr>
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
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Search products..."
              value={viewModel.searchValue}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select
            value={viewModel.categoryFilter}
            onValueChange={onCategoryFilter}
          >
            <SelectTrigger className="w-[160px]">
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

          <Select value={viewModel.activeFilter} onValueChange={onActiveFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Link href="/dashboard/products/new">
          <Button>
            <PlusIcon className="mr-2 size-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                  Color
                </th>
                <th className="hidden px-4 py-3 text-left text-sm font-semibold text-neutral-600 md:table-cell">
                  Categories
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-neutral-600">
                  Price
                </th>
                <th className="hidden px-4 py-3 text-left text-sm font-semibold text-neutral-600 md:table-cell">
                  Stock
                </th>
                <th className="hidden px-4 py-3 text-left text-sm font-semibold text-neutral-600 lg:table-cell">
                  Reviews
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-neutral-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {viewModel.products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onToggleActive={onToggleActive}
                  onDelete={onDelete}
                  isPending={isPending}
                />
              ))}
              {viewModel.products.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="py-12 text-center text-neutral-500"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
              disabled={viewModel.pagination.page <= 1}
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
                viewModel.pagination.page >= viewModel.pagination.totalPages
              }
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
