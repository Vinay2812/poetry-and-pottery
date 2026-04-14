"use client";

import { MobileHeaderContainer } from "@/features/layout";

import { absoluteUrl } from "@/lib/seo";

import { ContactFormPanel } from "./contact-form-panel";
import { ContactInfoPanel } from "./contact-info-panel";

/**
 * Route: /contact
 * Page does: Contact page with business details and a direct inquiry form.
 * Key UI operations:
 * - Submit a message through Name, Email, Phone (optional), Subject, and Message fields.
 * - Use direct contact channels (phone, email, Instagram, WhatsApp) from the info panel.
 * UI info needed for operations:
 * - Validated form fields and submission handler for contact requests.
 * - Business contact metadata rendered in the info panel and structured data snippet.
 */
export default function ContactPage() {
  return (
    <>
      <MobileHeaderContainer title="Contact" showBack backHref="/" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Poetry & Pottery",
            url: absoluteUrl("/contact"),
            about: {
              "@type": "Organization",
              name: "Poetry & Pottery",
              email: "poetryandpottery.aj@gmail.com",
              telephone: "+91 83290 26762",
            },
          }),
        }}
      />

      <main className="flex min-h-screen items-center justify-center px-5 py-20 pt-20 lg:py-16">
        <div className="bg-card border-border w-full max-w-4xl overflow-hidden rounded-2xl border shadow-lg">
          <div className="grid lg:grid-cols-5">
            <ContactInfoPanel />
            <ContactFormPanel />
          </div>
        </div>
      </main>
    </>
  );
}
