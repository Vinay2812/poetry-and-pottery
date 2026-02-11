"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

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
  type AddOptionFormValues,
  addOptionFormSchema,
} from "@/lib/validations/customization";

import type { AddOptionModalProps } from "../types";

export function AddOptionModal({
  categoryName,
  existingTypes,
  isOpen,
  onClose,
  onSubmit,
}: AddOptionModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddOptionFormValues>({
    resolver: zodResolver(addOptionFormSchema) as never,
    defaultValues: {
      type: "",
      name: "",
      value: "",
      priceModifier: 0,
      sortOrder: 0,
    },
  });

  const [showTypeSuggestions, setShowTypeSuggestions] = useState(false);

  const typeValue = watch("type");

  const filteredTypes = existingTypes.filter((t) =>
    t.toLowerCase().includes(typeValue.toLowerCase()),
  );

  const handleFormSubmit = useCallback(
    async (data: AddOptionFormValues) => {
      await onSubmit({
        type: data.type.trim().toUpperCase(),
        name: data.name.trim(),
        value: data.value.trim(),
        priceModifier: data.priceModifier,
        sortOrder: data.sortOrder,
      });
      reset();
    },
    [onSubmit, reset],
  );

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Option to {categoryName}</DialogTitle>
          <DialogDescription>
            Create a new customization option for this category.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="relative grid gap-2">
              <Label htmlFor="type">Type *</Label>
              <Input
                id="type"
                {...register("type")}
                onChange={(e) => setValue("type", e.target.value)}
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
                        setValue("type", t);
                        setShowTypeSuggestions(false);
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
              <p className="text-xs text-neutral-500">
                Enter existing type or create new
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Display Name *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="e.g., Small, Ocean Blue, Round"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="value">Value *</Label>
              <Input
                id="value"
                {...register("value")}
                placeholder="e.g., S, #4682B4, circle"
              />
              {errors.value && (
                <p className="text-sm text-red-500">{errors.value.message}</p>
              )}
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
                  placeholder="0"
                  {...register("priceModifier", { valueAsNumber: true })}
                />
                {errors.priceModifier && (
                  <p className="text-sm text-red-500">
                    {errors.priceModifier.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  placeholder="0"
                  min={0}
                  {...register("sortOrder", { valueAsNumber: true })}
                />
                {errors.sortOrder && (
                  <p className="text-sm text-red-500">
                    {errors.sortOrder.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Option"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
