"use client";

import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
  LayersIcon,
  MoreHorizontalIcon,
  PackageIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";

import { OptimizedImage } from "@/components/shared";
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

import type {
  CollectionRowViewModel,
  CollectionStatus,
  CollectionsTableProps,
  PaginationViewModel,
} from "../types";
import { formatDate } from "../types";

const STATUS_CONFIG: Record<
  CollectionStatus,
  { label: string; className: string }
> = {
  active: { label: "Active", className: "bg-green-100 text-green-700" },
  scheduled: { label: "Scheduled", className: "bg-blue-100 text-blue-700" },
  ended: { label: "Ended", className: "bg-neutral-100 text-neutral-500" },
  always: { label: "Always Active", className: "bg-primary/10 text-primary" },
};

interface CollectionCardProps {
  collection: CollectionRowViewModel;
  onDelete: (collectionId: number) => void;
  isPending: boolean;
}

function CollectionCard({
  collection,
  onDelete,
  isPending,
}: CollectionCardProps) {
  const statusConfig = STATUS_CONFIG[collection.status];

  return (
    <div className="hover:shadow-soft overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow">
      <Link href={`/dashboard/collections/${collection.id}`} className="block">
        {collection.imageUrl ? (
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-neutral-100">
            <OptimizedImage
              src={collection.imageUrl}
              alt={collection.name}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex aspect-[3/2] w-full items-center justify-center bg-neutral-100 text-neutral-400">
            <LayersIcon className="size-12" />
          </div>
        )}
      </Link>

      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-2">
          <Link
            href={`/dashboard/collections/${collection.id}`}
            className="min-w-0"
          >
            <h3 className="hover:text-primary truncate font-semibold text-neutral-900">
              {collection.name}
            </h3>
            <p className="truncate text-sm text-neutral-500">
              {collection.slug}
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
                <Link href={`/dashboard/collections/${collection.id}`}>
                  <EditIcon className="mr-2 size-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(collection.id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2Icon className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {collection.description && (
          <p className="mb-3 line-clamp-2 text-sm text-neutral-600">
            {collection.description}
          </p>
        )}

        <div className="mb-3 flex items-center gap-2">
          <Badge className={statusConfig.className}>{statusConfig.label}</Badge>
        </div>

        <div className="mb-3 flex items-center gap-4 text-sm text-neutral-600">
          <div className="flex items-center gap-1">
            <PackageIcon className="size-4 text-neutral-400" />
            <span>
              {collection.productsCount}{" "}
              {collection.productsCount === 1 ? "product" : "products"}
            </span>
          </div>
        </div>

        {(collection.startsAt || collection.endsAt) && (
          <div className="flex items-center gap-2 border-t border-neutral-100 pt-3 text-sm text-neutral-500">
            <CalendarIcon className="size-4" />
            <span>
              {collection.startsAt && collection.endsAt
                ? `${formatDate(collection.startsAt)} - ${formatDate(collection.endsAt)}`
                : collection.startsAt
                  ? `Starts ${formatDate(collection.startsAt)}`
                  : `Ends ${formatDate(collection.endsAt)}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function Pagination({
  pagination,
  onPageChange,
  itemName = "items",
}: {
  pagination: PaginationViewModel;
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

export function CollectionsTable({
  viewModel,
  isPending,
  onSearch,
  onStatusFilter,
  onPageChange,
  onDelete,
}: CollectionsTableProps) {
  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-64">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Search collections..."
              value={viewModel.searchValue}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={viewModel.statusFilter} onValueChange={onStatusFilter}>
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

        <Link href="/dashboard/collections/new">
          <Button>
            <PlusIcon className="mr-2 size-4" />
            Add Collection
          </Button>
        </Link>
      </div>

      {/* Top Pagination */}
      <Pagination
        pagination={viewModel.pagination}
        onPageChange={onPageChange}
        itemName="collections"
      />

      {/* Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {viewModel.collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            onDelete={onDelete}
            isPending={isPending}
          />
        ))}
      </div>

      {viewModel.collections.length === 0 && (
        <div className="rounded-xl border border-neutral-200 bg-white py-12 text-center text-neutral-500">
          No collections found
        </div>
      )}

      {/* Bottom Pagination */}
      <Pagination
        pagination={viewModel.pagination}
        onPageChange={onPageChange}
        itemName="collections"
      />
    </div>
  );
}
