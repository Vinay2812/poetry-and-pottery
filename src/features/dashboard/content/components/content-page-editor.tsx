"use client";

import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useCallback, useState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

import type {
  AboutPageContent,
  CarePageContent,
  FaqPageContent,
  PrivacyPageContent,
  ShippingPageContent,
  TermsPageContent,
} from "@/graphql/generated/types";

import { type ContentPageEditorProps } from "../types";
import { AboutEditor } from "./about-editor";
import { CareEditor } from "./care-editor";
import { FAQEditor } from "./faq-editor";
import { SectionEditor } from "./section-editor";
import { ShippingEditor } from "./shipping-editor";

export function ContentPageEditor({
  viewModel,
  onSave,
  onCancel,
}: ContentPageEditorProps) {
  const [content, setContent] = useState(viewModel.content);

  const handleSave = useCallback(async () => {
    await onSave(content);
  }, [content, onSave]);

  return (
    <form action={handleSave} className="space-y-6">
      <div className="flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={onCancel}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Content Pages
        </Button>
        <ContentSaveButton />
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="mb-6 text-xl font-semibold">Edit {viewModel.title}</h2>

        {viewModel.slug === "about" && (
          <AboutEditor
            content={content as AboutPageContent}
            onChange={(c) => setContent(c)}
          />
        )}

        {viewModel.slug === "faq" && (
          <FAQEditor
            content={content as FaqPageContent}
            onChange={(c) => setContent(c)}
          />
        )}

        {viewModel.slug === "shipping" && (
          <ShippingEditor
            content={content as ShippingPageContent}
            onChange={(c) => setContent(c)}
          />
        )}

        {viewModel.slug === "care" && (
          <CareEditor
            content={content as CarePageContent}
            onChange={(c) => setContent(c)}
          />
        )}

        {viewModel.slug === "privacy" && (
          <SectionEditor
            content={content as PrivacyPageContent}
            onChange={(c) => setContent(c)}
            sectionsTitle="Policy Sections"
            emailPlaceholder="privacy@example.com"
            introductionPlaceholder="Introduction paragraph for the privacy policy..."
          />
        )}

        {viewModel.slug === "terms" && (
          <SectionEditor
            content={content as TermsPageContent}
            onChange={(c) => setContent(c)}
            sectionsTitle="Terms Sections"
            emailPlaceholder="legal@example.com"
            introductionPlaceholder="Introduction paragraph for the terms of service..."
          />
        )}
      </div>
    </form>
  );
}

function ContentSaveButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <Save className="mr-2 h-4 w-4" />
      )}
      Save Changes
    </Button>
  );
}
