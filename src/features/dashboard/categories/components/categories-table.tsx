"use client";

import {
  CoffeeIcon,
  FlowerIcon,
  GemIcon,
  GiftIcon,
  HeartIcon,
  HomeIcon,
  PaletteIcon,
  PencilIcon,
  PlusIcon,
  ShapesIcon,
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
  coffee: CoffeeIcon,
  flower: FlowerIcon,
  home: HomeIcon,
  gift: GiftIcon,
  utensils: UtensilsIcon,
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

interface CategoryRowProps {
  category: CategoryRowViewModel;
  iconOptions: { value: string; label: string }[];
  onIconChange: (name: string, icon: string) => void;
  onRename: (oldName: string, newName: string) => void;
  onDelete: (name: string) => void;
  isPending: boolean;
}

function CategoryRow({
  category,
  iconOptions,
  onIconChange,
  onRename,
  onDelete,
  isPending,
}: CategoryRowProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(category.name);

  const handleRename = () => {
    if (newName.trim() && newName !== category.name) {
      onRename(category.name, newName.trim());
    }
    setIsRenaming(false);
  };

  return (
    <tr className="transition-colors hover:bg-neutral-50/50">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
            <CategoryIcon icon={category.icon} className="size-5" />
          </div>
          {isRenaming ? (
            <div className="flex items-center gap-2">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="h-8 w-40"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRename();
                  if (e.key === "Escape") {
                    setNewName(category.name);
                    setIsRenaming(false);
                  }
                }}
                autoFocus
              />
              <Button size="sm" onClick={handleRename} disabled={isPending}>
                Save
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setNewName(category.name);
                  setIsRenaming(false);
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-medium text-neutral-900">
                {category.name}
              </span>
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
      </td>
      <td className="px-4 py-3">
        <Select
          value={category.icon}
          onValueChange={(value) => onIconChange(category.name, value)}
          disabled={isPending}
        >
          <SelectTrigger className="w-40">
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
      </td>
      <td className="px-4 py-3">
        <span className="text-neutral-600">{category.productCount}</span>
      </td>
      <td className="px-4 py-3 text-right">
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
          className="text-red-500 hover:text-red-600"
        >
          <Trash2Icon className="size-4" />
        </Button>
      </td>
    </tr>
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

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                  Icon
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                  Products
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-neutral-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {viewModel.categories.map((category) => (
                <CategoryRow
                  key={category.name}
                  category={category}
                  iconOptions={iconOptions}
                  onIconChange={onIconChange}
                  onRename={onRename}
                  onDelete={onDelete}
                  isPending={isPending}
                />
              ))}
              {viewModel.categories.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-12 text-center text-neutral-500"
                  >
                    No categories found. Add your first category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
