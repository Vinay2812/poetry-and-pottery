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
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

import {
  BulkDeleteConfirmDialog,
  BulkDeleteResultsDialog,
} from "@/components/shared";

import type { AdminProductCollection } from "@/graphql/generated/types";

import { BulkDeleteProductsDialog } from "../components/bulk-delete-products-dialog";
import {
  type BulkDeletePaginationViewModel,
  type BulkDeleteProductsDialogViewModel,
  type PageSizeOption,
  type SelectableProductItem,
  formatPrice,
} from "../types";

interface BulkDeleteProductsDialogContainerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BulkDeleteProductsDialogContainer({
  isOpen,
  onOpenChange,
}: BulkDeleteProductsDialogContainerProps) {
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

    function startLoading() {
      setIsLoading(true);
    }

    startLoading();
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
    function resetState() {
      setSearch("");
      setCategoryFilter("ALL");
      setCollectionFilter("ALL");
      setActiveFilter("ALL");
      setPageSize(50);
      setPage(1);
      clearSelection();
    }
    if (!isOpen) {
      resetState();
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

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

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

  const viewModel: BulkDeleteProductsDialogViewModel = useMemo(
    () => ({
      products,
      selectedIds,
      selectedCount,
      isAllSelected,
      isLoading,
      isPending,
      pagination,
      search,
      categoryFilter,
      collectionFilter,
      activeFilter,
      pageSize: pageSize.toString(),
      categories,
      collections: collections.map((c) => ({ id: c.id, name: c.name })),
    }),
    [
      products,
      selectedIds,
      selectedCount,
      isAllSelected,
      isLoading,
      isPending,
      pagination,
      search,
      categoryFilter,
      collectionFilter,
      activeFilter,
      pageSize,
      categories,
      collections,
    ],
  );

  return (
    <>
      <BulkDeleteProductsDialog
        isOpen={isOpen}
        viewModel={viewModel}
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        onCollectionFilter={handleCollectionFilter}
        onActiveFilter={handleActiveFilter}
        onPageSizeChange={handlePageSizeChange}
        onPageChange={handlePageChange}
        onToggleSelection={toggleSelection}
        onToggleSelectAll={handleToggleSelectAll}
        onBulkDelete={handleBulkDelete}
        onClose={handleClose}
      />

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
