"use client";

import { createEvent, updateEvent } from "@/data/admin/events/gateway/server";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";

import { EventForm } from "../components/event-form";
import type { EventFormContainerProps, EventFormData } from "../types";
import { buildEventFormViewModel } from "../types";

export function EventFormContainer({
  event,
  statusOptions,
  levelOptions,
}: EventFormContainerProps) {
  const router = useRouter();
  const { startNavigation } = useRouteAnimation();

  const viewModel = useMemo(
    () => buildEventFormViewModel(event, statusOptions, levelOptions),
    [event, statusOptions, levelOptions],
  );

  const isEditing = !!event;

  const handleSubmit = useCallback(
    async (data: EventFormData) => {
      if (isEditing && event) {
        const result = await updateEvent(event.id, {
          title: data.title,
          slug: data.slug,
          description: data.description,
          starts_at: data.startsAt.toISOString(),
          ends_at: data.endsAt.toISOString(),
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
          startNavigation(() => {
            router.push("/dashboard/events");
            router.refresh();
          });
        } else {
          alert(result.error || "Failed to update event");
        }
        return;
      }

      const result = await createEvent({
        title: data.title,
        slug: data.slug,
        description: data.description,
        starts_at: data.startsAt.toISOString(),
        ends_at: data.endsAt.toISOString(),
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
        startNavigation(() => {
          router.push("/dashboard/events");
          router.refresh();
        });
      } else {
        alert(result.error || "Failed to create event");
      }
    },
    [isEditing, event, router, startNavigation],
  );

  const handleCancel = useCallback(() => {
    startNavigation(() => {
      router.push("/dashboard/events");
    });
  }, [router, startNavigation]);

  return (
    <EventForm
      viewModel={viewModel}
      statusOptions={statusOptions}
      levelOptions={levelOptions}
      isEditing={isEditing}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
