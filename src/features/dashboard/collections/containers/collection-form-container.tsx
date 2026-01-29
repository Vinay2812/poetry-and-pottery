"use client";

import {
  createCollection,
  updateCollection,
} from "@/data/admin/collections/gateway/server";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";

import { CollectionForm } from "../components/collection-form";
import type {
  CollectionFormContainerProps,
  CollectionFormData,
} from "../types";
import { buildCollectionFormViewModel } from "../types";

export function CollectionFormContainer({
  collection,
}: CollectionFormContainerProps) {
  const router = useRouter();
  const { startNavigation } = useRouteAnimation();
  const [isPending, startTransition] = useTransition();

  const viewModel = useMemo(
    () => buildCollectionFormViewModel(collection),
    [collection],
  );

  const isEditing = !!collection;

  const handleSubmit = useCallback(
    async (data: CollectionFormData) => {
      startTransition(async () => {
        if (isEditing && collection) {
          const result = await updateCollection(collection.id, {
            name: data.name,
            slug: data.slug,
            description: data.description || undefined,
            image_url: data.imageUrl || undefined,
            starts_at: data.startsAt?.toISOString() ?? null,
            ends_at: data.endsAt?.toISOString() ?? null,
          });

          if (result.success) {
            startNavigation(() => {
              router.push("/dashboard/collections");
              router.refresh();
            });
          } else {
            alert(result.error || "Failed to update collection");
          }
          return;
        }

        const result = await createCollection({
          name: data.name,
          slug: data.slug,
          description: data.description || undefined,
          image_url: data.imageUrl || undefined,
          starts_at: data.startsAt?.toISOString(),
          ends_at: data.endsAt?.toISOString(),
        });

        if (result.success) {
          startNavigation(() => {
            router.push("/dashboard/collections");
            router.refresh();
          });
        } else {
          alert(result.error || "Failed to create collection");
        }
      });
    },
    [isEditing, collection, router, startNavigation, startTransition],
  );

  const handleCancel = useCallback(() => {
    startNavigation(() => {
      router.push("/dashboard/collections");
    });
  }, [router, startNavigation]);

  return (
    <CollectionForm
      viewModel={viewModel}
      isEditing={isEditing}
      isPending={isPending}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
