"use client";

import { R2ImageUploaderContainer } from "@/features/uploads";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { CollectionFormProps } from "../types";
import { generateSlug } from "../types";

interface FormValues {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  startsAt: string;
  endsAt: string;
}

const collectionFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string(),
  imageUrl: z.string(),
  startsAt: z.string(),
  endsAt: z.string(),
});

export function CollectionForm({
  viewModel,
  isEditing,
  isPending,
  onSubmit,
  onCancel,
}: CollectionFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(collectionFormSchema) as never,
    defaultValues: {
      name: viewModel.name,
      slug: viewModel.slug,
      description: viewModel.description,
      imageUrl: viewModel.imageUrl,
      startsAt: viewModel.startsAt,
      endsAt: viewModel.endsAt,
    },
  });

  const name = watch("name");
  const imageUrl = watch("imageUrl");

  // Auto-generate slug from name when creating new collection
  useEffect(() => {
    if (!isEditing && name) {
      setValue("slug", generateSlug(name));
    }
  }, [name, isEditing, setValue]);

  const handleFormSubmit = useCallback(
    (data: FormValues) => {
      onSubmit({
        name: data.name,
        slug: data.slug,
        description: data.description,
        imageUrl: data.imageUrl,
        startsAt: data.startsAt ? new Date(data.startsAt) : null,
        endsAt: data.endsAt ? new Date(data.endsAt) : null,
      });
    },
    [onSubmit],
  );

  // Memoize callback to prevent infinite re-renders in child component
  const handleImageChange = useCallback(
    (urls: string[]) => {
      setValue("imageUrl", urls[0] || "");
    },
    [setValue],
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Basic Information */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Basic Information
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Collection Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="e.g., Spring 2025"
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
              placeholder="e.g., spring-2025"
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
              placeholder="Collection description..."
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* Time Window */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Time Window
        </h2>
        <p className="mb-4 text-sm text-neutral-500">
          Leave both fields empty for a permanent collection. Set dates to make
          the collection visible only during a specific period.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startsAt">Starts At</Label>
            <Input
              id="startsAt"
              type="datetime-local"
              {...register("startsAt")}
            />
            <p className="text-xs text-neutral-500">
              When the collection becomes visible
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endsAt">Ends At</Label>
            <Input id="endsAt" type="datetime-local" {...register("endsAt")} />
            <p className="text-xs text-neutral-500">
              When the collection stops being visible
            </p>
          </div>
        </div>
      </div>

      {/* Collection Image */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Collection Image
        </h2>
        <R2ImageUploaderContainer
          folder="collections"
          multiple={false}
          maxFiles={1}
          value={imageUrl ? [imageUrl] : []}
          onChange={handleImageChange}
        />
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Saving..."
            : isEditing
              ? "Update Collection"
              : "Create Collection"}
        </Button>
      </div>
    </form>
  );
}
