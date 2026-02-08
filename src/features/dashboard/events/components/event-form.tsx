"use client";

import { R2ImageUploaderContainer } from "@/features/uploads";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";

import { createDate, formatDateTimeLocal } from "@/lib/date";

import { EventLevel, EventStatus, EventType } from "@/graphql/generated/types";

import type { EventFormProps } from "../types";
import { generateSlug } from "../types";

interface FormValues {
  eventType: string;
  title: string;
  slug: string;
  description: string;
  startsAt: string;
  endsAt: string;
  location: string;
  fullLocation: string;
  totalSeats: number;
  availableSeats: number;
  instructor: string;
  includes: { value: string }[];
  price: number;
  image: string;
  highlights: { value: string }[];
  gallery: string[];
  status: string;
  level: string;
  performers: { value: string }[];
  lineupNotes: string;
}

const eventFormSchema = z.object({
  eventType: z.string(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  startsAt: z.string().min(1, "Start date is required"),
  endsAt: z.string().min(1, "End date is required"),
  location: z.string().min(1, "Location is required"),
  fullLocation: z.string().min(1, "Full location is required"),
  totalSeats: z.number().min(1, "Must have at least 1 seat"),
  availableSeats: z.number().min(0, "Cannot be negative"),
  instructor: z.string().optional(),
  includes: z.array(z.object({ value: z.string() })),
  price: z.number().min(0, "Price must be positive"),
  image: z.string().min(1, "Main image is required"),
  highlights: z.array(z.object({ value: z.string() })),
  gallery: z.array(z.string()),
  status: z.string(),
  level: z.string().optional(),
  performers: z.array(z.object({ value: z.string() })),
  lineupNotes: z.string().optional(),
});

export function EventForm({
  viewModel,
  statusOptions,
  levelOptions,
  isEditing,
  onSubmit,
  onCancel,
}: EventFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(eventFormSchema) as never,
    defaultValues: {
      eventType: viewModel.eventType,
      title: viewModel.title,
      slug: viewModel.slug,
      description: viewModel.description,
      startsAt: formatDateTimeLocal(viewModel.startsAt),
      endsAt: formatDateTimeLocal(viewModel.endsAt),
      location: viewModel.location,
      fullLocation: viewModel.fullLocation,
      totalSeats: viewModel.totalSeats,
      availableSeats: viewModel.availableSeats,
      instructor: viewModel.instructor ?? "",
      includes: viewModel.includes.map((i) => ({ value: i })),
      price: viewModel.price,
      image: viewModel.image,
      highlights: viewModel.highlights.map((h) => ({ value: h })),
      gallery: viewModel.gallery,
      status: viewModel.status,
      level: viewModel.level ?? "",
      performers: viewModel.performers.map((p) => ({ value: p })),
      lineupNotes: viewModel.lineupNotes ?? "",
    },
  });

  const {
    fields: includesFields,
    append: appendInclude,
    remove: removeInclude,
  } = useFieldArray({
    control,
    name: "includes",
  });

  const {
    fields: highlightsFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control,
    name: "highlights",
  });

  const {
    fields: performersFields,
    append: appendPerformer,
    remove: removePerformer,
  } = useFieldArray({
    control,
    name: "performers",
  });

  const title = watch("title");
  const eventType = watch("eventType");
  const isWorkshop = eventType === EventType.PotteryWorkshop;
  const isOpenMic = eventType === EventType.OpenMic;
  const image = watch("image");
  const gallery = watch("gallery");

  // Auto-generate slug from title when creating new event
  useEffect(() => {
    if (!isEditing && title) {
      setValue("slug", generateSlug(title));
    }
  }, [title, isEditing, setValue]);

  const handleFormSubmit = useCallback(
    (data: FormValues) => {
      onSubmit({
        eventType: data.eventType as EventType,
        title: data.title,
        slug: data.slug,
        description: data.description,
        startsAt: createDate(data.startsAt),
        endsAt: createDate(data.endsAt),
        location: data.location,
        fullLocation: data.fullLocation,
        totalSeats: data.totalSeats,
        availableSeats: data.availableSeats,
        instructor: data.instructor || null,
        includes: data.includes.map((i) => i.value).filter(Boolean),
        price: data.price,
        image: data.image,
        highlights: data.highlights.map((h) => h.value).filter(Boolean),
        gallery: data.gallery,
        status: data.status as EventStatus,
        level: data.level ? (data.level as EventLevel) : null,
        performers: data.performers.map((p) => p.value).filter(Boolean),
        lineupNotes: data.lineupNotes || null,
      });
    },
    [onSubmit],
  );

  const handleFormAction = useCallback(async () => {
    await handleSubmit(handleFormSubmit)();
  }, [handleSubmit, handleFormSubmit]);

  return (
    <form action={handleFormAction} className="space-y-8">
      {/* Event Type Selection */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Event Type
        </h2>
        <div className="space-y-2">
          <Label>Select Event Type *</Label>
          <Select
            value={eventType}
            onValueChange={(value) => setValue("eventType", value)}
          >
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={EventType.PotteryWorkshop}>
                Pottery Workshop
              </SelectItem>
              <SelectItem value={EventType.OpenMic}>Open Mic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Basic Information */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Basic Information
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="e.g., Wheel Throwing Workshop"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              {...register("slug")}
              placeholder="e.g., wheel-throwing-workshop"
            />
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug.message}</p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Event description..."
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Instructor - Workshop Only */}
          {isWorkshop && (
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor *</Label>
              <Input
                id="instructor"
                {...register("instructor")}
                placeholder="e.g., Jane Smith"
              />
              {errors.instructor && (
                <p className="text-sm text-red-500">
                  {errors.instructor.message}
                </p>
              )}
            </div>
          )}

          <div className={`grid gap-4 ${isWorkshop ? "grid-cols-2" : ""}`}>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={watch("status")}
                onValueChange={(value) => setValue("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Level - Workshop Only */}
            {isWorkshop && (
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select
                  value={watch("level")}
                  onValueChange={(value) => setValue("level", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {levelOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Performers & Lineup - Open Mic Only */}
      {isOpenMic && (
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900">
              Performers & Lineup
            </h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendPerformer({ value: "" })}
            >
              <PlusIcon className="mr-1 size-4" />
              Add Performer
            </Button>
          </div>
          <div className="space-y-4">
            <div className="space-y-3">
              {performersFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Input
                    {...register(`performers.${index}.value`)}
                    placeholder="e.g., John Doe - Standup Comedy"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removePerformer(index)}
                  >
                    <TrashIcon className="size-4 text-neutral-500" />
                  </Button>
                </div>
              ))}
              {performersFields.length === 0 && (
                <p className="text-sm text-neutral-500">
                  No performers added yet.
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lineupNotes">Lineup Notes</Label>
              <Textarea
                id="lineupNotes"
                {...register("lineupNotes")}
                placeholder="Additional notes about the lineup (optional)"
                rows={2}
              />
            </div>
          </div>
        </div>
      )}

      {/* Schedule & Location */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Schedule & Location
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startsAt">Start Date & Time *</Label>
            <Input
              id="startsAt"
              type="datetime-local"
              {...register("startsAt")}
            />
            {errors.startsAt && (
              <p className="text-sm text-red-500">{errors.startsAt.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="endsAt">End Date & Time *</Label>
            <Input id="endsAt" type="datetime-local" {...register("endsAt")} />
            {errors.endsAt && (
              <p className="text-sm text-red-500">{errors.endsAt.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Short Location *</Label>
            <Input
              id="location"
              {...register("location")}
              placeholder="e.g., Downtown Studio"
            />
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullLocation">Full Address *</Label>
            <Input
              id="fullLocation"
              {...register("fullLocation")}
              placeholder="e.g., 123 Main St, City, State 12345"
            />
            {errors.fullLocation && (
              <p className="text-sm text-red-500">
                {errors.fullLocation.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Pricing & Capacity */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Pricing & Capacity
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="price">Price (INR) *</Label>
            <Input
              id="price"
              type="number"
              {...register("price")}
              placeholder="0"
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalSeats">Total Seats *</Label>
            <Input
              id="totalSeats"
              type="number"
              {...register("totalSeats")}
              placeholder="10"
            />
            {errors.totalSeats && (
              <p className="text-sm text-red-500">
                {errors.totalSeats.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="availableSeats">Available Seats *</Label>
            <Input
              id="availableSeats"
              type="number"
              {...register("availableSeats")}
              placeholder="10"
            />
            {errors.availableSeats && (
              <p className="text-sm text-red-500">
                {errors.availableSeats.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">
            What&apos;s Included
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendInclude({ value: "" })}
          >
            <PlusIcon className="mr-1 size-4" />
            Add Item
          </Button>
        </div>
        <div className="space-y-3">
          {includesFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <Input
                {...register(`includes.${index}.value`)}
                placeholder="e.g., All materials provided"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeInclude(index)}
              >
                <TrashIcon className="size-4 text-neutral-500" />
              </Button>
            </div>
          ))}
          {includesFields.length === 0 && (
            <p className="text-sm text-neutral-500">No items added yet.</p>
          )}
        </div>
      </div>

      {/* Highlights */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Highlights</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendHighlight({ value: "" })}
          >
            <PlusIcon className="mr-1 size-4" />
            Add Highlight
          </Button>
        </div>
        <div className="space-y-3">
          {highlightsFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <Input
                {...register(`highlights.${index}.value`)}
                placeholder="e.g., Hands-on experience"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeHighlight(index)}
              >
                <TrashIcon className="size-4 text-neutral-500" />
              </Button>
            </div>
          ))}
          {highlightsFields.length === 0 && (
            <p className="text-sm text-neutral-500">No highlights added yet.</p>
          )}
        </div>
      </div>

      {/* Main Image */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Main Image *
        </h2>
        <R2ImageUploaderContainer
          folder="events"
          maxFiles={1}
          value={image ? [image] : []}
          onChange={(urls) => setValue("image", urls[0] || "")}
        />
        {errors.image && (
          <p className="mt-2 text-sm text-red-500">{errors.image.message}</p>
        )}
      </div>

      {/* Gallery */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Gallery</h2>
        <R2ImageUploaderContainer
          folder="events"
          multiple
          maxFiles={10}
          value={gallery}
          onChange={(urls) => setValue("gallery", urls)}
        />
      </div>

      {/* Form Actions */}
      <EventFormActions isEditing={isEditing} onCancel={onCancel} />
    </form>
  );
}

interface EventFormActionsProps {
  isEditing: boolean;
  onCancel: () => void;
}

function EventFormActions({ isEditing, onCancel }: EventFormActionsProps) {
  const { pending } = useFormStatus();

  return (
    <div className="flex items-center justify-end gap-3">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : isEditing ? "Update Event" : "Create Event"}
      </Button>
    </div>
  );
}
