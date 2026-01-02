import { getPublicShippingContent } from "@/data/admin/content/gateway/server";

import { ShippingPageClient } from "@/components/pages";

export default async function ShippingPage() {
  const content = await getPublicShippingContent();

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Page content not available</p>
      </div>
    );
  }

  return <ShippingPageClient content={content} />;
}
