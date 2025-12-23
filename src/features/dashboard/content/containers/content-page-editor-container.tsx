"use client";

import {
  type AboutPageContent,
  type CarePageContent,
  type FAQPageContent,
  type PrivacyPageContent,
  type ShippingPageContent,
  type TermsPageContent,
  updateContentPage,
} from "@/actions/admin";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";
import { toast } from "sonner";

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
  const [isPending, startTransition] = useTransition();

  const viewModel = useMemo(
    () => buildContentPageEditorViewModel(slug, title, content),
    [slug, title, content],
  );

  const handleSave = useCallback(
    (
      newContent:
        | AboutPageContent
        | FAQPageContent
        | ShippingPageContent
        | CarePageContent
        | PrivacyPageContent
        | TermsPageContent,
    ) => {
      startTransition(async () => {
        const result = await updateContentPage(slug, newContent);
        if (result.success) {
          toast.success("Content updated successfully");
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update content");
        }
      });
    },
    [slug, router],
  );

  const handleCancel = useCallback(() => {
    router.push("/dashboard/content");
  }, [router]);

  return (
    <ContentPageEditor
      viewModel={viewModel}
      isPending={isPending}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
