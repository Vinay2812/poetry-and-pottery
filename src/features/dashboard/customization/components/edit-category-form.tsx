"use client";

import { R2ImageUploaderContainer } from "@/features/uploads";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
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
  type EditCategoryFormValues,
  editCategoryFormSchema,
} from "@/lib/validations/customization";

import type { EditCategoryFormProps } from "../types";

export function EditCategoryForm({
  viewModel,
  availableCategories,
  onSubmit,
  onCancel,
}: EditCategoryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditCategoryFormValues>({
    resolver: zodResolver(editCategoryFormSchema) as never,
    defaultValues: {
      category: viewModel.category,
      basePrice: viewModel.basePrice,
      imageUrl: viewModel.imageUrl || undefined,
      isActive: viewModel.isActive,
    },
  });

  const categoryValue = watch("category");
  const imageUrl = watch("imageUrl");
  const isActive = watch("isActive");

  const handleImageChange = useCallback(
    (urls: string[]) => {
      setValue("imageUrl", urls[0] || undefined);
    },
    [setValue],
  );

  const handleFormSubmit = useCallback(
    async (data: EditCategoryFormValues) => {
      await onSubmit(data);
    },
    [onSubmit],
  );

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
          <h1 className="text-2xl font-bold text-neutral-900">Edit Category</h1>
          <p className="text-sm text-neutral-500">
            Update the customization category details
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="max-w-2xl space-y-6"
      >
        {/* Category Name */}
        <div className="space-y-2">
          <Label htmlFor="category">Product Category *</Label>
          <Select
            value={categoryValue}
            onValueChange={(value) => setValue("category", value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {availableCategories.map((cat) => (
                <SelectItem key={cat.name} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Base Price */}
        <div className="space-y-2">
          <Label htmlFor="basePrice">Base Price (INR)</Label>
          <Input
            id="basePrice"
            type="number"
            placeholder="0"
            min={0}
            {...register("basePrice", { valueAsNumber: true })}
          />
          {errors.basePrice && (
            <p className="text-sm text-red-500">{errors.basePrice.message}</p>
          )}
          <p className="text-xs text-neutral-500">
            The starting price for customization in this category
          </p>
        </div>

        {/* Category Image */}
        <div className="space-y-2">
          <Label>Category Image (Optional)</Label>
          <R2ImageUploaderContainer
            folder="customize-categories"
            multiple={false}
            maxFiles={1}
            value={imageUrl ? [imageUrl] : []}
            onChange={handleImageChange}
            disabled={isSubmitting}
          />
        </div>

        {/* Active Status */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="isActive">Active</Label>
            <p className="text-sm text-neutral-500">
              Only active categories are shown to customers
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
            Save Changes
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
