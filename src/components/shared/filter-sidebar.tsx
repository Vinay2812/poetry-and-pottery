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

interface CheckboxFilterOption {
  key: string | number;
  label: string;
  isSelected: boolean;
}

interface CheckboxFilterSectionProps {
  value: string;
  title: string;
  options: CheckboxFilterOption[];
  onToggle: (key: string | number) => void;
}

function CheckboxFilterSection({
  value,
  title,
  options,
  onToggle,
}: CheckboxFilterSectionProps) {
  if (options.length === 0) return null;

  return (
    <AccordionItem value={value} className="border-b border-neutral-100">
      <AccordionTrigger className="font-display py-4 text-sm font-semibold hover:no-underline">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-3 pt-1 pb-2">
          {options.map((option) => (
            <label
              key={option.key}
              className="group hover:text-primary flex cursor-pointer items-center gap-3 rounded-lg py-1 transition-colors"
            >
              <Checkbox
                checked={option.isSelected}
                onCheckedChange={() => onToggle(option.key)}
                className="data-[state=checked]:border-primary data-[state=checked]:bg-primary border-neutral-300"
              />
              <span
                className={cn(
                  "text-sm transition-colors",
                  option.isSelected
                    ? "text-foreground font-medium"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              >
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

interface FilterSidebarProps {
  filters: Filters;
  filterMetadata: FilterMetadata;
  filtersClassName?: ClassValue;
  onFilterClear: () => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onCategoryToggle: (category: string) => void;
  onMaterialToggle: (material: string) => void;
  onCollectionToggle: (collectionId: number) => void;
}

export function FilterSidebar({
  filters,
  filterMetadata,
  filtersClassName,
  onFilterClear,
  onPriceRangeChange,
  onCategoryToggle,
  onMaterialToggle,
  onCollectionToggle,
}: FilterSidebarProps) {
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.materials.length > 0 ||
    filters.collection_ids.length > 0;

  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    filters.min_price,
    filters.max_price,
  ]);

  const collectionOptions: CheckboxFilterOption[] = (
    filterMetadata.collections ?? []
  ).map((collection) => ({
    key: collection.id,
    label: collection.name,
    isSelected: filters.collection_ids.includes(collection.id),
  }));

  const categoryOptions: CheckboxFilterOption[] = filterMetadata.categories.map(
    (category) => ({
      key: category,
      label: capitalize(category),
      isSelected: filters.categories.includes(category),
    }),
  );

  const materialOptions: CheckboxFilterOption[] = filterMetadata.materials.map(
    (material) => ({
      key: material,
      label: capitalize(material),
      isSelected: filters.materials.includes(material),
    }),
  );

  return (
    <div className="relative h-full">
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
        defaultValue={["collections", "categories", "materials", "price"]}
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

        <CheckboxFilterSection
          value="collections"
          title="Collections"
          options={collectionOptions}
          onToggle={(key) => onCollectionToggle(key as number)}
        />

        <CheckboxFilterSection
          value="categories"
          title="Categories"
          options={categoryOptions}
          onToggle={(key) => onCategoryToggle(key as string)}
        />

        <CheckboxFilterSection
          value="materials"
          title="Materials"
          options={materialOptions}
          onToggle={(key) => onMaterialToggle(key as string)}
        />
      </Accordion>
    </div>
  );
}
