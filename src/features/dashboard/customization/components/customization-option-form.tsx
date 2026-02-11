"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import {
  type CustomizationOptionFormValues,
  customizationOptionFormSchema,
} from "@/lib/validations/customization";

import type { CustomizationOptionFormProps } from "../types";

export function CustomizationOptionForm({
  viewModel,
  existingCategories,
  existingTypes,
  isEditing,
  onSubmit,
  onCancel,
}: CustomizationOptionFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CustomizationOptionFormValues>({
    resolver: zodResolver(customizationOptionFormSchema) as never,
    defaultValues: {
      category: viewModel.category,
      type: viewModel.type,
      name: viewModel.name,
      value: viewModel.value,
      priceModifier: viewModel.priceModifier,
      sortOrder: viewModel.sortOrder,
      isActive: viewModel.isActive,
    },
  });

  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const typeValue = watch("type");
  const categoryValue = watch("category");
  const isActive = watch("isActive");

  const filteredTypes = existingTypes.filter((t) =>
    t.toLowerCase().includes(typeValue.toLowerCase()),
  );

  const handleFormSubmit = async (data: CustomizationOptionFormValues) => {
    await onSubmit(data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/customization">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            {isEditing
              ? "Edit Customization Option"
              : "New Customization Option"}
          </h1>
          <p className="text-sm text-neutral-500">
            {isEditing
              ? "Update the customization option details"
              : "Create a new customization option for products"}
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="max-w-2xl space-y-6"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={categoryValue}
              onValueChange={(value) => setValue("category", value)}
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {existingCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* Type */}
          <div className="relative space-y-2">
            <Label htmlFor="type">Type *</Label>
            <Input
              id="type"
              placeholder="e.g., SIZE, COLOR, SHAPE"
              {...register("type")}
              onChange={(e) => {
                setValue("type", e.target.value.toUpperCase());
                setShowTypeDropdown(true);
              }}
              onFocus={() => setShowTypeDropdown(true)}
              onBlur={() => setTimeout(() => setShowTypeDropdown(false), 200)}
            />
            {showTypeDropdown && filteredTypes.length > 0 && (
              <div className="absolute top-full z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
                {filteredTypes.slice(0, 5).map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-100"
                    onClick={() => {
                      setValue("type", t);
                      setShowTypeDropdown(false);
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Display Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Large, Ocean Blue, Heart Shape"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Value */}
          <div className="space-y-2">
            <Label htmlFor="value">Value *</Label>
            <Input
              id="value"
              placeholder="e.g., large, #3B82F6, heart"
              {...register("value")}
            />
            {errors.value && (
              <p className="text-sm text-red-500">{errors.value.message}</p>
            )}
            <p className="text-xs text-neutral-500">
              Internal value used for processing
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Price Modifier */}
          <div className="space-y-2">
            <Label htmlFor="priceModifier">Price Modifier (INR)</Label>
            <Input
              id="priceModifier"
              type="number"
              placeholder="0"
              {...register("priceModifier", { valueAsNumber: true })}
            />
            {errors.priceModifier && (
              <p className="text-sm text-red-500">
                {errors.priceModifier.message}
              </p>
            )}
            <p className="text-xs text-neutral-500">
              Positive for increase, negative for discount
            </p>
          </div>

          {/* Sort Order */}
          <div className="space-y-2">
            <Label htmlFor="sortOrder">Sort Order</Label>
            <Input
              id="sortOrder"
              type="number"
              placeholder="0"
              {...register("sortOrder", { valueAsNumber: true })}
            />
            {errors.sortOrder && (
              <p className="text-sm text-red-500">{errors.sortOrder.message}</p>
            )}
            <p className="text-xs text-neutral-500">
              Lower numbers appear first
            </p>
          </div>
        </div>

        {/* Active Status */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="isActive">Active</Label>
            <p className="text-sm text-neutral-500">
              Only active options are shown to customers
            </p>
          </div>
          <Switch
            id="isActive"
            checked={isActive}
            onCheckedChange={(checked) => setValue("isActive", checked)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Save Changes" : "Create Option"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
