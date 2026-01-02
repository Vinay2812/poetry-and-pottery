import { getPublicAboutContent } from "@/data/admin/content/gateway/server";
import { getPublicHeroImages } from "@/data/admin/settings/gateway/server";

import { AboutPageClient } from "@/components/pages";

export default async function AboutPage() {
  const [content, heroImages] = await Promise.all([
    getPublicAboutContent(),
    getPublicHeroImages(),
  ]);

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Page content not available</p>
      </div>
    );
  }

  return <AboutPageClient content={content} heroImage={heroImages.ourStory} />;
}
