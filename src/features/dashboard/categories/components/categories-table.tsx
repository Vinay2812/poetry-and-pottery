"use client";

import {
  CircleDotIcon,
  CoffeeIcon,
  FlowerIcon,
  GemIcon,
  GiftIcon,
  HeartIcon,
  HomeIcon,
  LeafIcon,
  PackageIcon,
  PaletteIcon,
  PencilIcon,
  PlusIcon,
  SaladIcon,
  ShapesIcon,
  SoupIcon,
  SparklesIcon,
  StarIcon,
  TagIcon,
  Trash2Icon,
  UtensilsIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { CategoriesTableProps, CategoryRowViewModel } from "../types";

// Icon mapping
const iconComponents: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  tag: TagIcon,
  bowl: SoupIcon,
  coffee: CoffeeIcon,
  plate: CircleDotIcon,
  flower: FlowerIcon,
  plant: LeafIcon,
  home: HomeIcon,
  gift: GiftIcon,
  utensils: UtensilsIcon,
  serving: SaladIcon,
  palette: PaletteIcon,
  heart: HeartIcon,
  star: StarIcon,
  sparkles: SparklesIcon,
  gem: GemIcon,
  shapes: ShapesIcon,
};

function CategoryIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const IconComponent = iconComponents[icon] || TagIcon;
  return <IconComponent className={className} />;
}

interface CategoryCardProps {
  category: CategoryRowViewModel;
  iconOptions: { value: string; label: string }[];
  onIconChange: (name: string, icon: string) => void;
  onRename: (oldName: string, newName: string) => void;
  onDelete: (name: string) => void;
  isPending: boolean;
}

function CategoryCard({
  category,
  iconOptions,
  onIconChange,
  onRename,
  onDelete,
  isPending,
}: CategoryCardProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(category.name);

  const handleRename = () => {
    if (newName.trim() && newName !== category.name) {
      onRename(category.name, newName.trim());
    }
    setIsRenaming(false);
  };

  return (
    <div className="hover:shadow-soft overflow-hidden rounded-xl border border-neutral-200 bg-white p-4 transition-shadow">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-xl">
          <CategoryIcon icon={category.icon} className="size-6" />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (
              confirm(
                `Are you sure you want to delete "${category.name}"? This will remove it from all products.`,
              )
            ) {
              onDelete(category.name);
            }
          }}
          disabled={isPending}
          className="size-8 shrink-0 text-red-500 hover:text-red-600"
        >
          <Trash2Icon className="size-4" />
        </Button>
      </div>

      <div className="mb-3">
        {isRenaming ? (
          <div className="flex flex-col gap-2">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="h-9"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRename();
                if (e.key === "Escape") {
                  setNewName(category.name);
                  setIsRenaming(false);
                }
              }}
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleRename}
                disabled={isPending}
                className="flex-1"
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setNewName(category.name);
                  setIsRenaming(false);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-neutral-900">{category.name}</h3>
            <Button
              size="icon"
              variant="ghost"
              className="size-6"
              onClick={() => setIsRenaming(true)}
            >
              <PencilIcon className="size-3 text-neutral-400" />
            </Button>
          </div>
        )}
      </div>

      <div className="mb-4">
        <Label className="mb-1.5 block text-xs text-neutral-500">Icon</Label>
        <Select
          value={category.icon}
          onValueChange={(value) => onIconChange(category.name, value)}
          disabled={isPending}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {iconOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <CategoryIcon icon={option.value} className="size-4" />
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-neutral-50 px-3 py-2">
        <PackageIcon className="size-4 text-neutral-400" />
        <span className="text-sm text-neutral-600">
          {category.productCount} product
          {category.productCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

export function CategoriesTable({
  viewModel,
  iconOptions,
  isPending,
  onIconChange,
  onRename,
  onDelete,
  onAdd,
}: CategoriesTableProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("tag");

  const handleAdd = () => {
    if (newCategoryName.trim()) {
      onAdd(newCategoryName.trim(), newCategoryIcon);
      setNewCategoryName("");
      setNewCategoryIcon("tag");
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">
          {viewModel.total} {viewModel.total === 1 ? "category" : "categories"}
        </p>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 size-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new category for your products.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g., Bowls"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select
                  value={newCategoryIcon}
                  onValueChange={setNewCategoryIcon}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <CategoryIcon
                            icon={option.value}
                            className="size-4"
                          />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAdd} disabled={isPending}>
                Add Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {viewModel.categories.map((category) => (
          <CategoryCard
            key={category.name}
            category={category}
            iconOptions={iconOptions}
            onIconChange={onIconChange}
            onRename={onRename}
            onDelete={onDelete}
            isPending={isPending}
          />
        ))}
      </div>

      {viewModel.categories.length === 0 && (
        <div className="rounded-xl border border-neutral-200 bg-white py-12 text-center text-neutral-500">
          No categories found. Add your first category.
        </div>
      )}
    </div>
  );
}
