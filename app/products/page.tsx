"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useCallback, useState } from "react";

import { CategoryPill } from "@/components/category-pill";
import { FilterSidebar } from "@/components/filter-sidebar";
import { MobileHeader, MobileNav, Navbar } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { EmptyState } from "@/components/sections";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { CATEGORIES, PRODUCTS } from "@/lib/constants";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const handleMaterialToggle = useCallback((material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material],
    );
  }, []);

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeCategory !== "all" && product.category !== activeCategory) {
      return false;
    }
    if (
      selectedMaterials.length > 0 &&
      product.material &&
      !selectedMaterials.includes(product.material)
    ) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <MobileHeader title="Shop Pottery" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-0 lg:pb-0">
        {/* Mobile Category Pills */}
        <div className="scrollbar-hide border-border/50 flex gap-2 overflow-x-auto border-b px-4 py-3 lg:hidden">
          <CategoryPill
            label="All"
            isActive={activeCategory === "all"}
            onClick={() => handleCategoryChange("all")}
          />
          {CATEGORIES.map((category) => (
            <CategoryPill
              key={category.id}
              label={category.name}
              isActive={activeCategory === category.id}
              onClick={() => handleCategoryChange(category.id)}
            />
          ))}
        </div>

        {/* Mobile Filter Bar */}
        <div className="bg-background sticky top-14 z-40 flex items-center gap-2 px-4 py-3 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 rounded-full">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader className="px-6 pt-6">
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-2 px-6 pb-6">
                <FilterSidebar
                  activeCategory={activeCategory}
                  selectedMaterials={selectedMaterials}
                  onCategoryChange={handleCategoryChange}
                  onMaterialToggle={handleMaterialToggle}
                />
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-9 w-36 rounded-full text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="container mx-auto px-4 py-2 lg:px-8 lg:py-6">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-20">
                <h2 className="mb-6 text-xl font-semibold">Filters</h2>
                <FilterSidebar
                  activeCategory={activeCategory}
                  selectedMaterials={selectedMaterials}
                  onCategoryChange={handleCategoryChange}
                  onMaterialToggle={handleMaterialToggle}
                />
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {/* Desktop Sort */}
              <div className="mb-6 hidden items-center justify-between lg:flex">
                <p className="text-muted-foreground text-sm">
                  {sortedProducts.length} products
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {sortedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
                    {sortedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Load More */}
                  <div className="mt-8 mb-4 flex justify-center">
                    <Button variant="outline" className="rounded-full">
                      Load more products
                    </Button>
                  </div>
                </>
              ) : (
                <EmptyState
                  icon={Search}
                  title="No products found"
                  description="No products found matching your filters."
                  actionText="Clear Filters"
                  onAction={() => {
                    setActiveCategory("all");
                    setSelectedMaterials([]);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
