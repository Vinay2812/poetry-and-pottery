"use client";

import { UseProductsV2Props } from "@/features/products/components/product-list";
import { Filters } from "@/features/products/hooks/use-products-filter-v2";
import { ClassValue } from "clsx";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { capitalize, cn } from "@/lib/utils";

import { PriceRangeSlider } from "./price-range-slider";

type FilterMetadata = UseProductsV2Props["filterMetadata"];

interface FilterSidebarProps {
  filters: Filters;
  filterMetadata: FilterMetadata;
  filtersClassName?: ClassValue;
  onFilterClear: () => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onCategoryToggle: (category: string) => void;
  onMaterialToggle: (material: string) => void;
}

export function FilterSidebar({
  filters,
  filterMetadata,
  filtersClassName,
  onFilterClear,
  onPriceRangeChange,
  onCategoryToggle,
  onMaterialToggle,
}: FilterSidebarProps) {
  const hasActiveFilters =
    filters.categories.length > 0 || filters.materials.length > 0;

  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    filters.min_price,
    filters.max_price,
  ]);

  return (
    <div className="relative">
      <div
        className={cn(
          "flex h-12 items-center justify-between py-2",
          filtersClassName,
        )}
      >
        <div className="font-display text-lg font-semibold">Filters</div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary-hover h-8 px-2 text-xs"
            onClick={onFilterClear}
          >
            Clear All
          </Button>
        )}
      </div>

      <Accordion
        type="multiple"
        defaultValue={["categories", "materials", "price"]}
        className={cn("w-full", filtersClassName)}
      >
        <AccordionItem value="price" className="border-b border-neutral-100">
          <AccordionTrigger className="font-display py-4 text-sm font-semibold hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-3">
              <PriceRangeSlider
                min={filterMetadata.price_range.min}
                max={filterMetadata.price_range.max}
                step={1}
                value={localPriceRange}
                onValueChange={setLocalPriceRange}
                onValueCommit={onPriceRangeChange}
                histogram={filterMetadata.price_histogram}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="categories"
          className="border-b border-neutral-100"
        >
          <AccordionTrigger className="font-display py-4 text-sm font-semibold hover:no-underline">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1 pb-2">
              {filterMetadata.categories.map((category) => (
                <label
                  key={category}
                  className="group hover:text-primary flex cursor-pointer items-center gap-3 rounded-lg py-1 transition-colors"
                >
                  <Checkbox
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => onCategoryToggle(category)}
                    className="data-[state=checked]:border-primary data-[state=checked]:bg-primary border-neutral-300"
                  />
                  <span
                    className={cn(
                      "text-sm transition-colors",
                      filters.categories.includes(category)
                        ? "text-foreground font-medium"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    {capitalize(category)}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="materials"
          className="border-b border-neutral-100"
        >
          <AccordionTrigger className="font-display py-4 text-sm font-semibold hover:no-underline">
            Materials
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1 pb-2">
              {filterMetadata.materials.map((material) => (
                <label
                  key={material}
                  className="group hover:text-primary flex cursor-pointer items-center gap-3 rounded-lg py-1 transition-colors"
                >
                  <Checkbox
                    checked={filters.materials.includes(material)}
                    onCheckedChange={() => onMaterialToggle(material)}
                    className="data-[state=checked]:border-primary data-[state=checked]:bg-primary border-neutral-300"
                  />
                  <span
                    className={cn(
                      "text-sm transition-colors",
                      filters.materials.includes(material)
                        ? "text-foreground font-medium"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    {capitalize(material)}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
