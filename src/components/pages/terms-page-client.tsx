"use client";

import { MobileHeaderContainer } from "@/features/layout";
import { Calendar, FileText, Mail } from "lucide-react";

import type { TermsPageContent } from "@/graphql/generated/types";

interface TermsPageClientProps {
  content: TermsPageContent;
}

export function TermsPageClient({ content }: TermsPageClientProps) {
  return (
    <>
      <MobileHeaderContainer title="Terms of Service" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-0">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-6 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
              <FileText className="text-primary h-8 w-8" />
            </div>
            <h1 className="font-display mb-4 text-4xl font-bold lg:text-6xl">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Please read these terms carefully before using our website or
              making a purchase.
            </p>
            <div className="text-muted-foreground mt-6 flex items-center justify-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {content.lastUpdated}</span>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="bg-subtle-green py-8 lg:py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <p className="text-muted-foreground text-lg leading-relaxed">
                {content.introduction}
              </p>
            </div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl space-y-12">
              {content.sections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    {index + 1}. {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-subtle-green py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-2xl font-bold">
                Questions About Our Terms?
              </h2>
              <p className="text-muted-foreground mb-6">
                If you have any questions about these Terms of Service, please
                contact us.
              </p>
              <a
                href={`mailto:${content.contactEmail}`}
                className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
                {content.contactEmail}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
