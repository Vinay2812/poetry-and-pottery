"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";
import { toast } from "sonner";

import { useAdminToggleContentPageActiveMutation } from "@/graphql/generated/graphql";

import { ContentPagesList } from "../components/content-pages-list";
import {
  type ContentPageSlug,
  type ContentPagesListContainerProps,
  buildContentPagesListViewModel,
} from "../types";

export function ContentPagesListContainer({
  data,
}: ContentPagesListContainerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [toggleContentPageActiveMutation, { loading: toggleLoading }] =
    useAdminToggleContentPageActiveMutation();

  const viewModel = useMemo(() => buildContentPagesListViewModel(data), [data]);

  const handleToggleActive = useCallback(
    (slug: ContentPageSlug) => {
      startTransition(async () => {
        try {
          const { data } = await toggleContentPageActiveMutation({
            variables: { slug },
          });
          const result = data?.adminToggleContentPageActive;
          if (result?.success) {
            toast.success("Page status updated");
            router.refresh();
          } else {
            toast.error(result?.error || "Failed to update page status");
          }
        } catch (error) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to update page status",
          );
        }
      });
    },
    [router, toggleContentPageActiveMutation],
  );

  return (
    <ContentPagesList
      viewModel={viewModel}
      isPending={isPending || toggleLoading}
      onToggleActive={handleToggleActive}
    />
  );
}
