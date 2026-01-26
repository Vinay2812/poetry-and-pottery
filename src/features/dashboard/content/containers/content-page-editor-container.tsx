"use client";

import { updateContentPage } from "@/data/admin/content/gateway/server";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { useRouteAnimation } from "@/components/providers/route-animation-provider";

import type {
  AboutPageContent,
  CarePageContent,
  FaqPageContent,
  PrivacyPageContent,
  ShippingPageContent,
  TermsPageContent,
} from "@/graphql/generated/types";

import { ContentPageEditor } from "../components/content-page-editor";
import {
  type ContentPageEditorContainerProps,
  buildContentPageEditorViewModel,
} from "../types";

export function ContentPageEditorContainer({
  slug,
  title,
  content,
}: ContentPageEditorContainerProps) {
  const router = useRouter();
  const { startNavigation } = useRouteAnimation();

  const viewModel = useMemo(
    () => buildContentPageEditorViewModel(slug, title, content),
    [slug, title, content],
  );

  const handleSave = useCallback(
    async (
      newContent:
        | AboutPageContent
        | FaqPageContent
        | ShippingPageContent
        | CarePageContent
        | PrivacyPageContent
        | TermsPageContent,
    ) => {
      const result = await updateContentPage(slug, newContent);
      if (result.success) {
        toast.success("Content updated successfully");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update content");
      }
    },
    [slug, router],
  );

  const handleCancel = useCallback(() => {
    startNavigation(() => {
      router.push("/dashboard/content");
    });
  }, [router, startNavigation]);

  return (
    <ContentPageEditor
      viewModel={viewModel}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
