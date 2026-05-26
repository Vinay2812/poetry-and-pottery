import { SITE_FAQ_CONTENT } from "@/consts/site-content";

import { FAQPageClient } from "@/components/pages";

import type { FaqPageContent } from "@/graphql/generated/types";

export function FAQContent() {
  const content = SITE_FAQ_CONTENT as FaqPageContent;
  const faqItems = content.categories.flatMap((category) => category.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <FAQPageClient content={content} />
    </>
  );
}
