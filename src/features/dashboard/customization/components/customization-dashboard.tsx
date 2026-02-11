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

// Category Card Header: icon/image, name, stats, and status badge.
interface CategoryCardHeaderProps {
  category: string;
  imageUrl: string | null;
  basePriceFormatted: string;
  optionsCount: number;
  isActive: boolean;
}

function CategoryCardHeader({
  category,
  imageUrl,
  basePriceFormatted,
  optionsCount,
  isActive,
}: CategoryCardHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={category}
          width={48}
          height={48}
          className="rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100">
          <span className="text-lg font-semibold text-neutral-400">
            {category[0]?.toUpperCase()}
          </span>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-neutral-900">{category}</h3>
        <p className="text-sm text-neutral-500">
          Base: {basePriceFormatted} &middot; {optionsCount} options
        </p>
      </div>

      <Badge variant={isActive ? "default" : "secondary"}>
        {isActive ? "Active" : "Inactive"}
      </Badge>
    </div>
  );
}

// Category Card Actions: add option button and dropdown with edit/toggle/delete.
interface CategoryCardActionsProps {
  isActive: boolean;
  onAddOption: () => void;
  onEditCategory: () => void;
  onToggleActive: () => void;
  onDelete: () => void;
}

function CategoryCardActions({
  isActive,
  onAddOption,
  onEditCategory,
  onToggleActive,
  onDelete,
}: CategoryCardActionsProps) {
  return (
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
            {isActive ? (
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
  );
}

// Single option row within the options table.
interface OptionRowProps {
  id: number;
  name: string;
  value: string;
  priceModifier: number;
  priceModifierFormatted: string;
  sortOrder: number;
  isActive: boolean;
  onToggleActive: (optionId: number) => void;
  onDelete: (optionId: number) => void;
  onEdit: (optionId: number) => void;
}

function OptionRow({
  id,
  name,
  value,
  priceModifier,
  priceModifierFormatted,
  sortOrder,
  isActive,
  onToggleActive,
  onDelete,
  onEdit,
}: OptionRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell className="text-neutral-500">{value}</TableCell>
      <TableCell
        className={`text-right font-mono text-sm ${
          priceModifier > 0
            ? "text-green-600"
            : priceModifier < 0
              ? "text-red-600"
              : "text-neutral-500"
        }`}
      >
        {priceModifierFormatted}
      </TableCell>
      <TableCell className="text-center text-neutral-500">
        {sortOrder}
      </TableCell>
      <TableCell className="text-center">
        <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
          {isActive ? "Active" : "Inactive"}
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
            <DropdownMenuItem onClick={() => onEdit(id)}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleActive(id)}>
              {isActive ? "Deactivate" : "Activate"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(id)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
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
        <div className="flex items-center justify-between">
          <CategoryCardHeader
            category={category.category}
            imageUrl={category.imageUrl}
            basePriceFormatted={category.basePriceFormatted}
            optionsCount={category.optionsCount}
            isActive={category.isActive}
          />

          <CategoryCardActions
            isActive={category.isActive}
            onAddOption={onAddOption}
            onEditCategory={onEditCategory}
            onToggleActive={onToggleActive}
            onDelete={onDelete}
          />
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
              <OptionRow
                key={option.id}
                id={option.id}
                name={option.name}
                value={option.value}
                priceModifier={option.priceModifier}
                priceModifierFormatted={option.priceModifierFormatted}
                sortOrder={option.sortOrder}
                isActive={option.isActive}
                onToggleActive={onToggleOptionActive}
                onDelete={onDeleteOption}
                onEdit={onEditOption}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
