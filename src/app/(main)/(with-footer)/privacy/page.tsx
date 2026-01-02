import { getPublicPrivacyContent } from "@/data/admin/content/gateway/server";

import { PrivacyPageClient } from "@/components/pages";

export default async function PrivacyPage() {
  const content = await getPublicPrivacyContent();

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Page content not available</p>
      </div>
    );
  }

  return <PrivacyPageClient content={content} />;
}
