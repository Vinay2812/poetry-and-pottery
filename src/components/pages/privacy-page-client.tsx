"use client";

import { MobileHeaderContainer } from "@/features/layout";

import { ListingPageHeader } from "@/components/shared";

import type { PrivacyPageContent } from "@/graphql/generated/types";

interface PrivacyPageClientProps {
  content: PrivacyPageContent;
}

export function PrivacyPageClient({ content }: PrivacyPageClientProps) {
  return (
    <>
      <MobileHeaderContainer title="Privacy Policy" showBack backHref="/" />

      <main className="pt-14 pb-24 lg:pt-20 lg:pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Desktop Page Header */}
          <div className="hidden lg:block">
            <ListingPageHeader
              title="Privacy Policy"
              breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Help", href: "/faq" },
                { label: "Privacy Policy" },
              ]}
            />
          </div>

          {/* Mobile Page Header */}
          <div className="mb-6 pt-4 lg:hidden">
            <h1 className="font-display text-2xl font-bold text-neutral-900">
              Privacy Policy
            </h1>
            <div className="bg-primary mt-3 h-[3px] w-12 rounded-full" />
          </div>

          {/* Content */}
          <div className="mx-auto max-w-3xl">
            {/* Last Updated */}
            <p className="text-muted-foreground mb-8 text-sm">
              Last updated: {content.lastUpdated}
            </p>

            {/* Introduction */}
            <div className="mb-8">
              <p className="text-muted-foreground leading-relaxed">
                {content.introduction}
              </p>
            </div>

            {/* Policy Sections */}
            <div className="space-y-8">
              {content.sections.map((section, index) => (
                <section key={index}>
                  <h2 className="font-display mb-3 text-xl font-semibold text-neutral-900">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </section>
              ))}
            </div>

            {/* Contact Section */}
            <div className="bg-primary-lighter mt-12 rounded-2xl p-6 text-center lg:p-8">
              <h3 className="font-display mb-2 text-lg font-semibold text-neutral-900">
                Questions about our privacy practices?
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Feel free to reach out to us with any concerns.
              </p>
              <a
                href={`mailto:${content.contactEmail}`}
                className="text-primary hover:text-primary-hover text-sm font-medium transition-colors"
              >
                {content.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
