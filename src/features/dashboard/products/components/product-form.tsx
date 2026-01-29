"use client";

import { R2ImageUploaderContainer } from "@/features/uploads";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripVertical, PlusIcon, TrashIcon } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import type { ProductFormProps } from "../types";
import { generateSlug } from "../types";

interface FormValues {
  name: string;
  slug: string;
  description: string;
  instructions: { value: string }[];
  price: number;
  totalQuantity: number;
  isActive: boolean;
  colorName: string;
  colorCode: string;
  material: string;
  imageUrls: string[];
  categories: string[];
  collectionId: number | null;
}

const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string(),
  instructions: z.array(z.object({ value: z.string() })),
  price: z.number().min(0, "Price must be positive"),
  totalQuantity: z.number().min(0, "Total quantity must be positive"),
  isActive: z.boolean(),
  colorName: z.string().min(1, "Color name is required"),
  colorCode: z.string().min(1, "Color code is required"),
  material: z.string().min(1, "Material is required"),
  imageUrls: z.array(z.string()).min(1, "At least one image is required"),
  categories: z.array(z.string()),
  collectionId: z.number().nullable(),
});

interface SortableInstructionProps {
  id: string;
  index: number;
  register: ReturnType<typeof useForm<FormValues>>["register"];
  onRemove: () => void;
}

function SortableInstruction({
  id,
  index,
  register,
  onRemove,
}: SortableInstructionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 ${isDragging ? "opacity-50" : ""}`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 active:cursor-grabbing"
      >
        <GripVertical className="size-4" />
      </button>
      <Input
        {...register(`instructions.${index}.value`)}
        placeholder="e.g., Hand wash only"
        className="flex-1"
      />
      <Button type="button" variant="ghost" size="icon" onClick={onRemove}>
        <TrashIcon className="size-4 text-neutral-500" />
      </Button>
    </div>
  );
}

export function ProductForm({
  viewModel,
  availableCategories,
  availableCollections,
  isEditing,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(productFormSchema) as never,
    defaultValues: {
      name: viewModel.name,
      slug: viewModel.slug,
      description: viewModel.description,
      instructions: viewModel.instructions.map((i) => ({ value: i })),
      price: viewModel.price,
      totalQuantity: viewModel.totalQuantity,
      isActive: viewModel.isActive,
      colorName: viewModel.colorName,
      colorCode: viewModel.colorCode,
      material: viewModel.material,
      imageUrls: viewModel.imageUrls,
      categories: viewModel.categories,
      collectionId: viewModel.collectionId,
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "instructions",
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const name = watch("name");
  const imageUrls = watch("imageUrls");
  const categories = watch("categories");
  const totalQuantity = watch("totalQuantity");
  const collectionId = watch("collectionId");

  // Calculate sold and available quantities
  const soldQuantity = viewModel.soldQuantity ?? 0;
  const availableQuantity = Math.max(0, (totalQuantity || 0) - soldQuantity);

  // Auto-generate slug from name when creating new product
  useEffect(() => {
    if (!isEditing && name) {
      setValue("slug", generateSlug(name));
    }
  }, [name, isEditing, setValue]);

  const handleFormSubmit = useCallback(
    (data: FormValues) => {
      onSubmit({
        ...data,
        instructions: data.instructions.map((i) => i.value).filter(Boolean),
        availableQuantity, // Pass the calculated available quantity
        collectionId: data.collectionId,
      });
    },
    [availableQuantity, onSubmit],
  );

  const handleFormAction = useCallback(async () => {
    await handleSubmit(handleFormSubmit)();
  }, [handleSubmit, handleFormSubmit]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  // Memoize callback to prevent infinite re-renders in child component
  const handleImageUrlsChange = useCallback(
    (urls: string[]) => {
      setValue("imageUrls", urls);
    },
    [setValue],
  );

  return (
    <form action={handleFormAction} className="space-y-8">
      {/* Basic Information */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Basic Information
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="e.g., Ceramic Mug"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              {...register("slug")}
              placeholder="e.g., ceramic-mug"
            />
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug.message}</p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Product description..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="material">Material *</Label>
            <Input
              id="material"
              {...register("material")}
              placeholder="e.g., Stoneware"
            />
            {errors.material && (
              <p className="text-sm text-red-500">{errors.material.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="colorName">Color Name *</Label>
              <Input
                id="colorName"
                {...register("colorName")}
                placeholder="e.g., Ocean Blue"
              />
              {errors.colorName && (
                <p className="text-sm text-red-500">
                  {errors.colorName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="colorCode">Color Code *</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  {...register("colorCode")}
                  className="h-10 w-16 cursor-pointer rounded border border-neutral-200"
                />
                <Input {...register("colorCode")} className="flex-1" />
              </div>
              {errors.colorCode && (
                <p className="text-sm text-red-500">
                  {errors.colorCode.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing & Inventory */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Pricing & Inventory
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="price">Price (INR) *</Label>
            <Input
              id="price"
              type="number"
              {...register("price", { valueAsNumber: true })}
              placeholder="0"
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalQuantity">Total Quantity *</Label>
            <Input
              id="totalQuantity"
              type="number"
              {...register("totalQuantity", { valueAsNumber: true })}
              placeholder="0"
            />
            {errors.totalQuantity && (
              <p className="text-sm text-red-500">
                {errors.totalQuantity.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Available Quantity</Label>
            <div className="flex h-10 items-center rounded-md border border-neutral-200 bg-neutral-50 px-3">
              <span className="text-neutral-600">{availableQuantity}</span>
              {isEditing && soldQuantity > 0 && (
                <span className="ml-2 text-xs text-neutral-400">
                  (Sold: {soldQuantity})
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 md:col-span-3">
            <Checkbox
              id="isActive"
              checked={watch("isActive")}
              onCheckedChange={(checked) =>
                setValue("isActive", checked === true)
              }
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Product is active and visible on store
            </Label>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Categories
        </h2>
        <MultiSelect
          options={availableCategories.map((c) => ({ value: c, label: c }))}
          value={categories || []}
          onChange={(newCategories) => setValue("categories", newCategories)}
          placeholder="Select categories..."
          searchPlaceholder="Search categories..."
          emptyMessage="No categories found. Create categories in the Categories section."
        />
      </div>

      {/* Collection */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Collection
        </h2>
        <Select
          value={collectionId?.toString() ?? ""}
          onValueChange={(value) =>
            setValue("collectionId", value ? parseInt(value) : null)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a collection (optional)" />
          </SelectTrigger>
          <SelectContent>
            {availableCollections.map((collection) => (
              <SelectItem key={collection.id} value={collection.id.toString()}>
                {collection.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {collectionId && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-2 text-neutral-500"
            onClick={() => setValue("collectionId", null)}
          >
            Clear collection
          </Button>
        )}
        <p className="mt-2 text-sm text-neutral-500">
          Optionally assign this product to a collection.
        </p>
      </div>

      {/* Care Instructions */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">
            Care Instructions
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ value: "" })}
          >
            <PlusIcon className="mr-1 size-4" />
            Add Instruction
          </Button>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={fields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {fields.map((field, index) => (
                <SortableInstruction
                  key={field.id}
                  id={field.id}
                  index={index}
                  register={register}
                  onRemove={() => remove(index)}
                />
              ))}
              {fields.length === 0 && (
                <p className="text-sm text-neutral-500">
                  No care instructions added yet.
                </p>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Images */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Product Images *
        </h2>
        <R2ImageUploaderContainer
          folder="products"
          multiple
          maxFiles={8}
          value={imageUrls}
          onChange={handleImageUrlsChange}
        />
        {errors.imageUrls && (
          <p className="mt-2 text-sm text-red-500">
            {errors.imageUrls.message}
          </p>
        )}
      </div>

      {/* Form Actions */}
      <ProductFormActions isEditing={isEditing} onCancel={onCancel} />
    </form>
  );
}

interface ProductFormActionsProps {
  isEditing: boolean;
  onCancel: () => void;
}

function ProductFormActions({ isEditing, onCancel }: ProductFormActionsProps) {
  const { pending } = useFormStatus();

  return (
    <div className="flex items-center justify-end gap-3">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={pending}>
        {pending
          ? "Saving..."
          : isEditing
            ? "Update Product"
            : "Create Product"}
      </Button>
    </div>
  );
}
