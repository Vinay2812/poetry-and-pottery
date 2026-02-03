"use client";

import { R2ImageUploaderContainer } from "@/features/uploads";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

import type { AddCategoryModalProps } from "../types";

export function AddCategoryModal({
  isOpen,
  availableCategories,
  onClose,
  onSubmit,
}: AddCategoryModalProps) {
  const [category, setCategory] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = useCallback((urls: string[]) => {
    setImageUrl(urls[0] || undefined);
  }, []);

  const handleSubmit = async () => {
    if (!category) {
      alert("Please select a category");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        category,
        basePrice,
        imageUrl,
      });
      // Reset form on success
      setCategory("");
      setBasePrice(0);
      setImageUrl(undefined);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCategory("");
    setBasePrice(0);
    setImageUrl(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Customization Category</DialogTitle>
          <DialogDescription>
            Select a product category to enable customization options.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Product Category *</Label>
            <Select value={category} onValueChange={setCategory}>
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
            {availableCategories.length === 0 && (
              <p className="text-xs text-amber-600">
                All product categories already have customization options.
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="basePrice">Base Price (INR)</Label>
            <Input
              id="basePrice"
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(parseInt(e.target.value, 10) || 0)}
              placeholder="0"
              min={0}
            />
            <p className="text-xs text-neutral-500">
              The starting price for customization in this category
            </p>
          </div>

          <div className="grid gap-2">
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
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
