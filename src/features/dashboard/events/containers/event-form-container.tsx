"use client";

import { createEvent, updateEvent } from "@/actions/admin";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";

import { EventForm } from "../components/event-form";
import type { EventFormContainerProps, EventFormData } from "../types";
import { buildEventFormViewModel } from "../types";

export function EventFormContainer({
  event,
  statusOptions,
  levelOptions,
}: EventFormContainerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const viewModel = useMemo(
    () => buildEventFormViewModel(event, statusOptions, levelOptions),
    [event, statusOptions, levelOptions],
  );

  const isEditing = !!event;

  const handleSubmit = useCallback(
    (data: EventFormData) => {
      startTransition(async () => {
        if (isEditing && event) {
          const result = await updateEvent({
            id: event.id,
            title: data.title,
            slug: data.slug,
            description: data.description,
            starts_at: data.startsAt,
            ends_at: data.endsAt,
            location: data.location,
            full_location: data.fullLocation,
            total_seats: data.totalSeats,
            available_seats: data.availableSeats,
            instructor: data.instructor,
            includes: data.includes,
            price: data.price,
            image: data.image,
            highlights: data.highlights,
            gallery: data.gallery,
            status: data.status,
            level: data.level,
          });

          if (result.success) {
            router.push("/dashboard/events");
            router.refresh();
          } else {
            alert(result.error || "Failed to update event");
          }
        } else {
          const result = await createEvent({
            title: data.title,
            slug: data.slug,
            description: data.description,
            starts_at: data.startsAt,
            ends_at: data.endsAt,
            location: data.location,
            full_location: data.fullLocation,
            total_seats: data.totalSeats,
            available_seats: data.availableSeats,
            instructor: data.instructor,
            includes: data.includes,
            price: data.price,
            image: data.image,
            highlights: data.highlights,
            gallery: data.gallery,
            status: data.status,
            level: data.level,
          });

          if (result.success) {
            router.push("/dashboard/events");
            router.refresh();
          } else {
            alert(result.error || "Failed to create event");
          }
        }
      });
    },
    [isEditing, event, router],
  );

  const handleCancel = useCallback(() => {
    router.push("/dashboard/events");
  }, [router]);

  return (
    <EventForm
      viewModel={viewModel}
      statusOptions={statusOptions}
      levelOptions={levelOptions}
      isSubmitting={isPending}
      isEditing={isEditing}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
