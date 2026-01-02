import { getPublicTermsContent } from "@/data/admin/content/gateway/server";

import { TermsPageClient } from "@/components/pages";

export default async function TermsPage() {
  const content = await getPublicTermsContent();

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Page content not available</p>
      </div>
    );
  }

  return <TermsPageClient content={content} />;
}
