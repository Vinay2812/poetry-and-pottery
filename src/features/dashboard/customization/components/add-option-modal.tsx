"use client";

import { useState } from "react";

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

import type { AddOptionModalProps } from "../types";

export function AddOptionModal({
  categoryName,
  existingTypes,
  isOpen,
  onClose,
  onSubmit,
}: AddOptionModalProps) {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [priceModifier, setPriceModifier] = useState(0);
  const [sortOrder, setSortOrder] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTypeSuggestions, setShowTypeSuggestions] = useState(false);

  const filteredTypes = existingTypes.filter((t) =>
    t.toLowerCase().includes(type.toLowerCase()),
  );

  const handleSubmit = async () => {
    if (!type.trim()) {
      alert("Type is required");
      return;
    }
    if (!name.trim()) {
      alert("Name is required");
      return;
    }
    if (!value.trim()) {
      alert("Value is required");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        type: type.trim().toUpperCase(),
        name: name.trim(),
        value: value.trim(),
        priceModifier,
        sortOrder,
      });
      // Reset form on success
      setType("");
      setName("");
      setValue("");
      setPriceModifier(0);
      setSortOrder(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setType("");
    setName("");
    setValue("");
    setPriceModifier(0);
    setSortOrder(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Option to {categoryName}</DialogTitle>
          <DialogDescription>
            Create a new customization option for this category.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="relative grid gap-2">
            <Label htmlFor="type">Type *</Label>
            <Input
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              onFocus={() => setShowTypeSuggestions(true)}
              onBlur={() =>
                setTimeout(() => setShowTypeSuggestions(false), 200)
              }
              placeholder="e.g., SIZE, COLOR, SHAPE"
            />
            {showTypeSuggestions && filteredTypes.length > 0 && (
              <div className="absolute top-full z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
                {filteredTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-100"
                    onClick={() => {
                      setType(t);
                      setShowTypeSuggestions(false);
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
            <p className="text-xs text-neutral-500">
              Enter existing type or create new
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Display Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Small, Ocean Blue, Round"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="value">Value *</Label>
            <Input
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g., S, #4682B4, circle"
            />
            <p className="text-xs text-neutral-500">
              Internal value used for processing
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="priceModifier">Price Modifier (INR)</Label>
              <Input
                id="priceModifier"
                type="number"
                value={priceModifier}
                onChange={(e) =>
                  setPriceModifier(parseInt(e.target.value, 10) || 0)
                }
                placeholder="0"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input
                id="sortOrder"
                type="number"
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(parseInt(e.target.value, 10) || 0)
                }
                placeholder="0"
                min={0}
              />
            </div>
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
            {isSubmitting ? "Creating..." : "Create Option"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
