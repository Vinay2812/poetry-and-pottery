"use client";

import { ClassValue } from "clsx";
import { useCallback } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import { PriceRangeSlider } from "./price-range-slider";

interface Category {
  id: string;
  name: string;
}

interface PriceHistogram {
  min: number;
  max: number;
  count: number;
}

interface FilterSidebarProps {
  activeCategory: string;
  selectedMaterials: string[];
  categories: Category[];
  materials: string[];
  onCategoryChange: (category: string) => void;
  onMaterialToggle: (material: string) => void;
  onClear: () => void;
  // Price props
  priceRange?: { min: number; max: number };
  selectedPriceRange?: [number, number];
  onPriceChange?: (range: [number, number]) => void;
  onPriceChangeCommit?: (range: [number, number]) => void;
  priceHistogram?: PriceHistogram[];
  className?: ClassValue;
  filtersClassName?: ClassValue;
}

export function FilterSidebar({
  activeCategory,
  selectedMaterials,
  categories,
  materials,
  onCategoryChange,
  onMaterialToggle,
  onClear,
  priceRange,
  selectedPriceRange,
  onPriceChange,
  onPriceChangeCommit,
  priceHistogram,
  className,
  filtersClassName,
}: FilterSidebarProps) {
  const handleCategoryChange = useCallback(
    (categoryId: string) => {
      onCategoryChange(categoryId);
    },
    [onCategoryChange],
  );

  const handleMaterialToggle = useCallback(
    (material: string) => {
      onMaterialToggle(material);
    },
    [onMaterialToggle],
  );

  const hasActiveFilters =
    activeCategory !== "all" || selectedMaterials.length > 0;

  return (
    <div className="relative">
      <div
        className={cn(
          "flex h-12 items-center justify-between px-4 py-2",
          filtersClassName,
        )}
      >
        <div className="text-lg font-semibold">Filters</div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary-hover h-8 px-2 text-xs"
            onClick={onClear}
          >
            Reset
          </Button>
        )}
      </div>

      <Separator />

      <Accordion
        type="multiple"
        defaultValue={["categories", "materials", "price"]}
        className={cn("w-full", className)}
      >
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-6 pb-2">
              <PriceRangeSlider
                min={priceRange?.min ?? 0}
                max={priceRange?.max ?? 1000}
                step={1}
                value={
                  selectedPriceRange ?? [
                    priceRange?.min ?? 0,
                    priceRange?.max ?? 1000,
                  ]
                }
                onValueChange={(val) => onPriceChange?.(val)}
                onValueCommit={(val) => onPriceChangeCommit?.(val)}
                histogram={priceHistogram}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="categories" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {[{ id: "all", name: "All Products" }, ...categories].map(
                (category) => (
                  <label
                    key={category.id}
                    className="group hover:text-primary flex cursor-pointer items-center gap-3 rounded-lg py-1 transition-colors"
                  >
                    <Checkbox
                      checked={activeCategory === category.id}
                      onCheckedChange={() => handleCategoryChange(category.id)}
                      className="data-[state=checked]:border-primary data-[state=checked]:bg-primary border-neutral-300"
                    />
                    <span
                      className={cn(
                        "text-sm transition-colors",
                        activeCategory === category.id
                          ? "text-foreground font-medium"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      {category.name}
                    </span>
                  </label>
                ),
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="materials" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            Materials
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {materials.map((material) => (
                <label
                  key={material}
                  className="group hover:text-primary flex cursor-pointer items-center gap-3 rounded-lg py-1 transition-colors"
                >
                  <Checkbox
                    checked={selectedMaterials.includes(material)}
                    onCheckedChange={() => handleMaterialToggle(material)}
                    className="data-[state=checked]:border-primary data-[state=checked]:bg-primary border-neutral-300"
                  />
                  <span
                    className={cn(
                      "text-sm transition-colors",
                      selectedMaterials.includes(material)
                        ? "text-foreground font-medium"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    {material}
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
