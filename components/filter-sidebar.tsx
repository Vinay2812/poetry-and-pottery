"use client";

import { useCallback } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { CATEGORIES } from "@/lib/constants";

export const MATERIALS = ["Stoneware", "Terracotta", "Porcelain", "Earthenware"];

interface FilterSidebarProps {
  activeCategory: string;
  selectedMaterials: string[];
  onCategoryChange: (category: string) => void;
  onMaterialToggle: (material: string) => void;
}

export function FilterSidebar({
  activeCategory,
  selectedMaterials,
  onCategoryChange,
  onMaterialToggle,
}: FilterSidebarProps) {
  const handleCategoryChange = useCallback(
    (categoryId: string) => {
      onCategoryChange(categoryId);
    },
    [onCategoryChange]
  );

  const handleMaterialToggle = useCallback(
    (material: string) => {
      onMaterialToggle(material);
    },
    [onMaterialToggle]
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-semibold">Categories</h3>
        <div className="space-y-2">
          {[{ id: "all", name: "All" }, ...CATEGORIES].map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center gap-2"
            >
              <Checkbox
                checked={activeCategory === category.id}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <span className="text-sm">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Material</h3>
        <div className="space-y-2">
          {MATERIALS.map((material) => (
            <label
              key={material}
              className="flex cursor-pointer items-center gap-2"
            >
              <Checkbox
                checked={selectedMaterials.includes(material)}
                onCheckedChange={() => handleMaterialToggle(material)}
              />
              <span className="text-sm">{material}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
