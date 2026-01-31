"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import type {
  CustomizationOptionFormData,
  CustomizationOptionFormProps,
} from "../types";

export function CustomizationOptionForm({
  viewModel,
  existingCategories,
  existingTypes,
  isEditing,
  onSubmit,
  onCancel,
}: CustomizationOptionFormProps) {
  const [formData, setFormData] = useState<CustomizationOptionFormData>({
    category: viewModel.category,
    type: viewModel.type,
    name: viewModel.name,
    value: viewModel.value,
    priceModifier: viewModel.priceModifier,
    sortOrder: viewModel.sortOrder,
    isActive: viewModel.isActive,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCategories = existingCategories.filter((cat) =>
    cat.toLowerCase().includes(formData.category.toLowerCase()),
  );

  const filteredTypes = existingTypes.filter((t) =>
    t.toLowerCase().includes(formData.type.toLowerCase()),
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
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Category */}
          <div className="relative space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              placeholder="e.g., Mug, Bowl, Vase"
              value={formData.category}
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value });
                setShowCategoryDropdown(true);
              }}
              onFocus={() => setShowCategoryDropdown(true)}
              onBlur={() =>
                setTimeout(() => setShowCategoryDropdown(false), 200)
              }
              required
            />
            {showCategoryDropdown && filteredCategories.length > 0 && (
              <div className="absolute top-full z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
                {filteredCategories.slice(0, 5).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-100"
                    onClick={() => {
                      setFormData({ ...formData, category: cat });
                      setShowCategoryDropdown(false);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Type */}
          <div className="relative space-y-2">
            <Label htmlFor="type">Type *</Label>
            <Input
              id="type"
              placeholder="e.g., SIZE, COLOR, SHAPE"
              value={formData.type}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  type: e.target.value.toUpperCase(),
                });
                setShowTypeDropdown(true);
              }}
              onFocus={() => setShowTypeDropdown(true)}
              onBlur={() => setTimeout(() => setShowTypeDropdown(false), 200)}
              required
            />
            {showTypeDropdown && filteredTypes.length > 0 && (
              <div className="absolute top-full z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
                {filteredTypes.slice(0, 5).map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-100"
                    onClick={() => {
                      setFormData({ ...formData, type: t });
                      setShowTypeDropdown(false);
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
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
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          {/* Value */}
          <div className="space-y-2">
            <Label htmlFor="value">Value *</Label>
            <Input
              id="value"
              placeholder="e.g., large, #3B82F6, heart"
              value={formData.value}
              onChange={(e) =>
                setFormData({ ...formData, value: e.target.value })
              }
              required
            />
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
              value={formData.priceModifier}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priceModifier: parseInt(e.target.value) || 0,
                })
              }
            />
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
              value={formData.sortOrder}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sortOrder: parseInt(e.target.value) || 0,
                })
              }
            />
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
            checked={formData.isActive}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isActive: checked })
            }
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
