"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";

import {
  useAdminCreateCollectionMutation,
  useAdminUpdateCollectionMutation,
} from "@/graphql/generated/graphql";

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
  const [createCollectionMutation, { loading: createLoading }] =
    useAdminCreateCollectionMutation();
  const [updateCollectionMutation, { loading: updateLoading }] =
    useAdminUpdateCollectionMutation();

  const viewModel = useMemo(
    () => buildCollectionFormViewModel(collection),
    [collection],
  );

  const isEditing = !!collection;

  const handleSubmit = useCallback(
    async (data: CollectionFormData) => {
      try {
        if (isEditing && collection) {
          const { data: updateData } = await updateCollectionMutation({
            variables: {
              id: collection.id,
              input: {
                name: data.name,
                slug: data.slug,
                description: data.description,
                image_url: data.imageUrl,
                starts_at: data.startsAt?.toISOString() ?? null,
                ends_at: data.endsAt?.toISOString() ?? null,
              },
            },
          });
          const result = updateData?.adminUpdateCollection;

          if (result?.success) {
            startNavigation(() => {
              router.push("/dashboard/collections");
              router.refresh();
            });
          } else {
            alert(result?.error || "Failed to update collection");
          }
          return;
        }

        const { data: createData } = await createCollectionMutation({
          variables: {
            input: {
              name: data.name,
              slug: data.slug,
              description: data.description,
              image_url: data.imageUrl,
              starts_at: data.startsAt?.toISOString(),
              ends_at: data.endsAt?.toISOString(),
            },
          },
        });
        const result = createData?.adminCreateCollection;

        if (result?.success) {
          startNavigation(() => {
            router.push("/dashboard/collections");
            router.refresh();
          });
        } else {
          alert(result?.error || "Failed to create collection");
        }
      } catch (error) {
        alert(
          error instanceof Error ? error.message : "Failed to save collection",
        );
      }
    },
    [
      collection,
      createCollectionMutation,
      isEditing,
      router,
      startNavigation,
      updateCollectionMutation,
    ],
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
      isPending={createLoading || updateLoading}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
