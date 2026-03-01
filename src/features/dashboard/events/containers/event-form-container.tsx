"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";

import {
  useAdminCreateEventMutation,
  useAdminUpdateEventMutation,
} from "@/graphql/generated/graphql";

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
  const [createEventMutation] = useAdminCreateEventMutation();
  const [updateEventMutation] = useAdminUpdateEventMutation();

  const viewModel = useMemo(
    () => buildEventFormViewModel(event, statusOptions, levelOptions),
    [event, statusOptions, levelOptions],
  );

  const isEditing = !!event;

  const handleSubmit = useCallback(
    async (data: EventFormData) => {
      try {
        if (isEditing && event) {
          const { data: updateData } = await updateEventMutation({
            variables: {
              id: event.id,
              input: {
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
              },
            },
          });
          const result = updateData?.adminUpdateEvent;

          if (result?.success) {
            startNavigation(() => {
              router.push("/dashboard/events");
              router.refresh();
            });
          } else {
            alert(result?.error || "Failed to update event");
          }
          return;
        }

        const { data: createData } = await createEventMutation({
          variables: {
            input: {
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
            },
          },
        });
        const result = createData?.adminCreateEvent;

        if (result?.success) {
          startNavigation(() => {
            router.push("/dashboard/events");
            router.refresh();
          });
        } else {
          alert(result?.error || "Failed to create event");
        }
      } catch (error) {
        alert(error instanceof Error ? error.message : "Failed to save event");
      }
    },
    [
      createEventMutation,
      event,
      isEditing,
      router,
      startNavigation,
      updateEventMutation,
    ],
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
