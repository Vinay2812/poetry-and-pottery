import { getPublicFAQContent } from "@/data/admin/content/gateway/server";

import { FAQPageClient } from "@/components/pages";

export async function FAQContent() {
  const content = await getPublicFAQContent();

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Page content not available</p>
      </div>
    );
  }

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
