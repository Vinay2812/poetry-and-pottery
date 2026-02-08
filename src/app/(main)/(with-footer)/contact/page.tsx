"use client";

import { MobileHeaderContainer } from "@/features/layout";

import { absoluteUrl } from "@/lib/seo";

import { ContactFormPanel } from "./contact-form-panel";
import { ContactInfoPanel } from "./contact-info-panel";

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

      <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-5 py-20 pt-20 lg:py-16">
        <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="grid lg:grid-cols-5">
            <ContactInfoPanel />
            <ContactFormPanel />
          </div>
        </div>
      </main>
    </>
  );
}
