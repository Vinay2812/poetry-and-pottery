import { getPublicCareContent } from "@/data/admin/content/gateway/server";

import { CarePageClient } from "@/components/pages";

export default async function CarePage() {
  const content = await getPublicCareContent();

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Page content not available</p>
      </div>
    );
  }

  return <CarePageClient content={content} />;
}
