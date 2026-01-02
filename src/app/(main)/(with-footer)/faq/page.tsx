import { getPublicFAQContent } from "@/data/admin/content/gateway/server";

import { FAQPageClient } from "@/components/pages";

export default async function FAQPage() {
  const content = await getPublicFAQContent();

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Page content not available</p>
      </div>
    );
  }

  return <FAQPageClient content={content} />;
}
