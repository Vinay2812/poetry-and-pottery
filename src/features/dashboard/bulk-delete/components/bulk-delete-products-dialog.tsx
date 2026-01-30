"use client";

import {
  bulkDeleteProducts,
  getAllCategories,
  getAllCollections,
  getProducts,
} from "@/data/admin/products/gateway/server";
import type { AdminBulkDeleteProductsResponse } from "@/data/admin/products/gateway/server";
import { useSelection } from "@/hooks";
import {
  AlertTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
  PackageIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

import {
  BulkDeleteConfirmDialog,
  BulkDeleteResultsDialog,
  OptimizedImage,
} from "@/components/shared";
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

import type { AdminProductCollection } from "@/graphql/generated/types";

import {
  type BulkDeletePaginationViewModel,
  PAGE_SIZE_OPTIONS,
  type PageSizeOption,
  type SelectableProductItem,
  formatPrice,
} from "../types";

interface BulkDeleteProductsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BulkDeleteProductsDialog({
  isOpen,
  onOpenChange,
}: BulkDeleteProductsDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  // Filter state
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [collectionFilter, setCollectionFilter] = useState("ALL");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [pageSize, setPageSize] = useState<PageSizeOption>(50);
  const [page, setPage] = useState(1);

  // Data state
  const [products, setProducts] = useState<SelectableProductItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [collections, setCollections] = useState<AdminProductCollection[]>([]);
  const [pagination, setPagination] = useState<BulkDeletePaginationViewModel>({
    page: 1,
    totalPages: 1,
    limit: 50,
    total: 0,
    showingFrom: 0,
    showingTo: 0,
  });

  // Selection state
  const {
    selectedIds,
    selectedCount,
    toggleSelection,
    clearSelection,
    toggleSelectAll,
  } = useSelection<number>();

  // Dialog states
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isResultsDialogOpen, setIsResultsDialogOpen] = useState(false);
  const [bulkDeleteResults, setBulkDeleteResults] =
    useState<AdminBulkDeleteProductsResponse | null>(null);

  const allProductIds = useMemo(() => products.map((p) => p.id), [products]);
  const isAllSelected =
    selectedCount === allProductIds.length && selectedCount > 0;

  // Fetch categories and collections on mount
  useEffect(() => {
    if (isOpen) {
      Promise.all([getAllCategories(), getAllCollections()]).then(
        ([cats, cols]) => {
          setCategories(cats);
          setCollections(cols);
        },
      );
    }
  }, [isOpen]);

  // Fetch products when filters change
  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    getProducts({
      search: search || undefined,
      category: categoryFilter !== "ALL" ? categoryFilter : undefined,
      collectionId:
        collectionFilter !== "ALL" ? parseInt(collectionFilter) : undefined,
      isActive:
        activeFilter === "active"
          ? true
          : activeFilter === "inactive"
            ? false
            : undefined,
      page,
      limit: pageSize,
    })
      .then((data) => {
        setProducts(
          data.products.map((p) => ({
            id: p.id,
            name: p.name,
            imageUrl: p.image_urls[0] || null,
            isActive: p.is_active,
            availableQuantity: p.available_quantity,
            priceFormatted: formatPrice(p.price),
          })),
        );
        setPagination({
          page: data.page,
          totalPages: data.totalPages,
          limit: data.limit,
          total: data.total,
          showingFrom: data.total > 0 ? (data.page - 1) * data.limit + 1 : 0,
          showingTo: Math.min(data.page * data.limit, data.total),
        });
      })
      .finally(() => setIsLoading(false));
  }, [
    isOpen,
    search,
    categoryFilter,
    collectionFilter,
    activeFilter,
    page,
    pageSize,
  ]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setCategoryFilter("ALL");
      setCollectionFilter("ALL");
      setActiveFilter("ALL");
      setPageSize(50);
      setPage(1);
      clearSelection();
    }
  }, [isOpen, clearSelection]);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleCategoryFilter = useCallback((value: string) => {
    setCategoryFilter(value);
    setPage(1);
  }, []);

  const handleCollectionFilter = useCallback((value: string) => {
    setCollectionFilter(value);
    setPage(1);
  }, []);

  const handleActiveFilter = useCallback((value: string) => {
    setActiveFilter(value);
    setPage(1);
  }, []);

  const handlePageSizeChange = useCallback((value: string) => {
    setPageSize(parseInt(value) as PageSizeOption);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleToggleSelectAll = useCallback(() => {
    toggleSelectAll(allProductIds);
  }, [toggleSelectAll, allProductIds]);

  const handleBulkDelete = useCallback(() => {
    setIsConfirmDialogOpen(true);
  }, []);

  const handleConfirmBulkDelete = useCallback(() => {
    setIsConfirmDialogOpen(false);
    startTransition(async () => {
      const result = await bulkDeleteProducts(selectedIds);
      setBulkDeleteResults(result);
      setIsResultsDialogOpen(true);
      clearSelection();
      // Refresh products
      const data = await getProducts({
        search: search || undefined,
        category: categoryFilter !== "ALL" ? categoryFilter : undefined,
        collectionId:
          collectionFilter !== "ALL" ? parseInt(collectionFilter) : undefined,
        isActive:
          activeFilter === "active"
            ? true
            : activeFilter === "inactive"
              ? false
              : undefined,
        page,
        limit: pageSize,
      });
      setProducts(
        data.products.map((p) => ({
          id: p.id,
          name: p.name,
          imageUrl: p.image_urls[0] || null,
          isActive: p.is_active,
          availableQuantity: p.available_quantity,
          priceFormatted: formatPrice(p.price),
        })),
      );
      setPagination({
        page: data.page,
        totalPages: data.totalPages,
        limit: data.limit,
        total: data.total,
        showingFrom: data.total > 0 ? (data.page - 1) * data.limit + 1 : 0,
        showingTo: Math.min(data.page * data.limit, data.total),
      });
    });
  }, [
    selectedIds,
    clearSelection,
    search,
    categoryFilter,
    collectionFilter,
    activeFilter,
    page,
    pageSize,
  ]);

  const resultsWithNames = useMemo(() => {
    if (!bulkDeleteResults) return null;
    return {
      totalRequested: bulkDeleteResults.totalRequested,
      deletedCount: bulkDeleteResults.deletedCount,
      deactivatedOrCancelledCount: bulkDeleteResults.deactivatedCount,
      failedCount: bulkDeleteResults.failedCount,
      items: bulkDeleteResults.results.map((r) => {
        const product = products.find((p) => p.id === r.id);
        return {
          id: r.id,
          name: product?.name ?? `Product #${r.id}`,
          action: r.action,
          error: r.error,
        };
      }),
    };
  }, [bulkDeleteResults, products]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select
                value={categoryFilter}
                onValueChange={handleCategoryFilter}
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
                value={collectionFilter}
                onValueChange={handleCollectionFilter}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Collection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Collections</SelectItem>
                  {collections.map((col) => (
                    <SelectItem key={col.id} value={col.id.toString()}>
                      {col.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={activeFilter} onValueChange={handleActiveFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={pageSize.toString()}
                onValueChange={handlePageSizeChange}
              >
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
                  checked={isAllSelected}
                  onCheckedChange={handleToggleSelectAll}
                  disabled={products.length === 0 || isLoading}
                />
                <span className="text-sm text-neutral-600">
                  Select all on this page
                </span>
              </div>
              {selectedCount > 0 && (
                <span className="text-sm font-medium text-neutral-700">
                  {selectedCount} selected
                </span>
              )}
            </div>

            {/* Products List */}
            <div className="max-h-[400px] overflow-y-auto rounded-lg border">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2Icon className="size-8 animate-spin text-neutral-400" />
                </div>
              ) : products.length === 0 ? (
                <div className="py-12 text-center text-neutral-500">
                  No products found
                </div>
              ) : (
                <div className="divide-y">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className={`flex items-center gap-4 p-3 transition-colors ${
                        selectedIds.includes(product.id)
                          ? "bg-primary/5"
                          : "hover:bg-neutral-50"
                      }`}
                    >
                      <Checkbox
                        checked={selectedIds.includes(product.id)}
                        onCheckedChange={() => toggleSelection(product.id)}
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
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-500">
                  Showing {pagination.showingFrom} to {pagination.showingTo} of{" "}
                  {pagination.total} products
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1 || isLoading}
                  >
                    <ChevronLeftIcon className="size-4" />
                  </Button>
                  <span className="text-sm text-neutral-600">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= pagination.totalPages || isLoading}
                  >
                    <ChevronRightIcon className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              disabled={selectedCount === 0 || isPending}
            >
              <Trash2Icon className="mr-2 size-4" />
              Delete {selectedCount > 0 ? `(${selectedCount})` : "Selected"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BulkDeleteConfirmDialog
        isOpen={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        selectedCount={selectedCount}
        entityName="products"
        onConfirm={handleConfirmBulkDelete}
        isPending={isPending}
      />

      {resultsWithNames && (
        <BulkDeleteResultsDialog
          isOpen={isResultsDialogOpen}
          onOpenChange={setIsResultsDialogOpen}
          results={resultsWithNames}
          entityName="products"
        />
      )}
    </>
  );
}
