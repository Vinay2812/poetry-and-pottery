import { X } from "lucide-react";

import { FilterSidebar } from "@/components/shared";
import { Button } from "@/components/ui/button";

import type { Filters } from "../hooks/use-products-filter-v2";
import type { UseProductsV2Props } from "./product-list";

interface MobileFilterOverlayProps {
  filters: Filters;
  filterMetadata: UseProductsV2Props["filterMetadata"];
  totalProducts: number;
  onFilterClose: () => void;
  onFilterClear: () => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onCategoryToggle: (category: string) => void;
  onMaterialToggle: (material: string) => void;
  onCollectionToggle: (collectionId: number) => void;
}

export function MobileFilterOverlay({
  filters,
  filterMetadata,
  totalProducts,
  onFilterClose,
  onFilterClear,
  onPriceRangeChange,
  onCategoryToggle,
  onMaterialToggle,
  onCollectionToggle,
}: MobileFilterOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden dark:bg-neutral-950">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 dark:border-neutral-800">
        <h2 className="font-display text-lg font-bold">Filters</h2>
        <button
          onClick={onFilterClose}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200 dark:bg-neutral-800"
        >
          <X className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <FilterSidebar
          filters={filters}
          filterMetadata={filterMetadata}
          onFilterClear={onFilterClear}
          onPriceRangeChange={onPriceRangeChange}
          onCategoryToggle={onCategoryToggle}
          onMaterialToggle={onMaterialToggle}
          onCollectionToggle={onCollectionToggle}
        />
      </div>

      {/* Footer */}
      <div className="flex gap-3 border-t border-neutral-100 px-5 py-4 dark:border-neutral-800">
        <Button
          variant="secondary"
          className="flex-1 rounded-xl"
          onClick={onFilterClear}
        >
          Reset
        </Button>
        <Button
          className="shadow-primary/20 flex-2 rounded-xl shadow-lg"
          onClick={onFilterClose}
        >
          Show {totalProducts} Products
        </Button>
      </div>
    </div>
  );
}
