"use client";

import { type ContentPageType, toggleContentPageActive } from "@/actions/admin";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";
import { toast } from "sonner";

import { ContentPagesList } from "../components/content-pages-list";
import {
  type ContentPagesListContainerProps,
  buildContentPagesListViewModel,
} from "../types";

export function ContentPagesListContainer({
  data,
}: ContentPagesListContainerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const viewModel = useMemo(() => buildContentPagesListViewModel(data), [data]);

  const handleToggleActive = useCallback(
    (slug: ContentPageType) => {
      startTransition(async () => {
        const result = await toggleContentPageActive(slug);
        if (result.success) {
          toast.success("Page status updated");
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update page status");
        }
      });
    },
    [router],
  );

  return (
    <ContentPagesList
      viewModel={viewModel}
      isPending={isPending}
      onToggleActive={handleToggleActive}
    />
  );
}
