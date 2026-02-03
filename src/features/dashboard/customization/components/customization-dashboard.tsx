"use client";

import {
  ChevronDown,
  MoreHorizontal,
  Pencil,
  Plus,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type {
  CustomizationDashboardProps,
  CustomizationOptionRowViewModel,
  CustomizeCategoryCardViewModel,
} from "../types";
import { AddCategoryModal } from "./add-category-modal";
import { AddOptionModal } from "./add-option-modal";

export function CustomizationDashboard({
  viewModel,
  existingTypes,
  availableCategories,
  isPending,
  addCategoryOpen,
  addOptionForCategory,
  onAddCategoryOpen,
  onAddCategoryClose,
  onAddCategory,
  onAddOptionOpen,
  onAddOptionClose,
  onAddOption,
  onEditCategory,
  onToggleCategoryActive,
  onDeleteCategory,
  onToggleOptionActive,
  onDeleteOption,
  onEditOption,
}: CustomizationDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Customization Options
          </h1>
          <p className="text-sm text-neutral-500">
            Manage product customization categories and options
          </p>
        </div>
        <Button
          onClick={onAddCategoryOpen}
          disabled={availableCategories.length === 0}
          title={
            availableCategories.length === 0
              ? "All product categories already have customization options"
              : undefined
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Category Cards - Full Width Rows */}
      <div className="space-y-4">
        {viewModel.categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            existingTypes={existingTypes}
            isPending={isPending}
            onAddOption={() => onAddOptionOpen(category.id, category.category)}
            onEditCategory={() => onEditCategory(category.id)}
            onToggleActive={() => onToggleCategoryActive(category.id)}
            onDelete={() => onDeleteCategory(category.id)}
            onToggleOptionActive={onToggleOptionActive}
            onDeleteOption={onDeleteOption}
            onEditOption={onEditOption}
          />
        ))}
      </div>

      {/* Empty State */}
      {viewModel.categories.length === 0 && (
        <Card className="py-12 text-center">
          <CardContent>
            <p className="text-neutral-500">
              No customization categories yet. Click &quot;Add Category&quot; to
              create one.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <AddCategoryModal
        isOpen={addCategoryOpen}
        availableCategories={availableCategories}
        onClose={onAddCategoryClose}
        onSubmit={onAddCategory}
      />

      {addOptionForCategory && (
        <AddOptionModal
          categoryId={addOptionForCategory.id}
          categoryName={addOptionForCategory.name}
          existingTypes={existingTypes}
          isOpen={true}
          onClose={onAddOptionClose}
          onSubmit={(data) => onAddOption(addOptionForCategory.id, data)}
        />
      )}
    </div>
  );
}

// Category Card Component
interface CategoryCardProps {
  category: CustomizeCategoryCardViewModel;
  existingTypes: string[];
  isPending: boolean;
  onAddOption: () => void;
  onEditCategory: () => void;
  onToggleActive: () => void;
  onDelete: () => void;
  onToggleOptionActive: (optionId: number) => void;
  onDeleteOption: (optionId: number) => void;
  onEditOption: (optionId: number) => void;
}

function CategoryCard({
  category,
  isPending,
  onAddOption,
  onEditCategory,
  onToggleActive,
  onDelete,
  onToggleOptionActive,
  onDeleteOption,
  onEditOption,
}: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className={isPending ? "opacity-50" : ""}>
      <CardHeader className="pb-3">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Category Image */}
            {category.imageUrl ? (
              <Image
                src={category.imageUrl}
                alt={category.category}
                width={48}
                height={48}
                className="rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100">
                <span className="text-lg font-semibold text-neutral-400">
                  {category.category[0]?.toUpperCase()}
                </span>
              </div>
            )}

            {/* Category Info */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {category.category}
              </h3>
              <p className="text-sm text-neutral-500">
                Base: {category.basePriceFormatted} &middot;{" "}
                {category.optionsCount} options
              </p>
            </div>

            {/* Status Badge */}
            <Badge variant={category.isActive ? "default" : "secondary"}>
              {category.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onAddOption}>
              <Plus className="mr-1 h-3 w-3" /> Add Option
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEditCategory}>
                  <Pencil className="mr-2 h-4 w-4" /> Edit Category
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onToggleActive}>
                  {category.isActive ? (
                    <>
                      <ToggleLeft className="mr-2 h-4 w-4" /> Deactivate
                    </>
                  ) : (
                    <>
                      <ToggleRight className="mr-2 h-4 w-4" /> Activate
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete Category
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <div className="flex items-center border-t pt-3">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                />
                Options ({category.optionsCount})
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="pt-3">
            {category.optionsByType.length > 0 ? (
              <div className="space-y-4">
                {category.optionsByType.map(({ type, options }) => (
                  <OptionsTypeSection
                    key={type}
                    type={type}
                    options={options}
                    onToggleOptionActive={onToggleOptionActive}
                    onDeleteOption={onDeleteOption}
                    onEditOption={onEditOption}
                  />
                ))}
              </div>
            ) : (
              <p className="py-4 text-center text-sm text-neutral-400">
                No options yet. Click &quot;Add Option&quot; to create one.
              </p>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

// Options grouped by type
interface OptionsTypeSectionProps {
  type: string;
  options: CustomizationOptionRowViewModel[];
  onToggleOptionActive: (optionId: number) => void;
  onDeleteOption: (optionId: number) => void;
  onEditOption: (optionId: number) => void;
}

function OptionsTypeSection({
  type,
  options,
  onToggleOptionActive,
  onDeleteOption,
  onEditOption,
}: OptionsTypeSectionProps) {
  return (
    <div>
      <h4 className="mb-2 text-sm font-medium text-neutral-700">{type}</h4>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[150px]">Value</TableHead>
              <TableHead className="w-[120px] text-right">Price</TableHead>
              <TableHead className="w-[80px] text-center">Order</TableHead>
              <TableHead className="w-[80px] text-center">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {options.map((option) => (
              <TableRow key={option.id}>
                <TableCell className="font-medium">{option.name}</TableCell>
                <TableCell className="text-neutral-500">
                  {option.value}
                </TableCell>
                <TableCell
                  className={`text-right font-mono text-sm ${
                    option.priceModifier > 0
                      ? "text-green-600"
                      : option.priceModifier < 0
                        ? "text-red-600"
                        : "text-neutral-500"
                  }`}
                >
                  {option.priceModifierFormatted}
                </TableCell>
                <TableCell className="text-center text-neutral-500">
                  {option.sortOrder}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={option.isActive ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {option.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditOption(option.id)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onToggleOptionActive(option.id)}
                      >
                        {option.isActive ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDeleteOption(option.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
