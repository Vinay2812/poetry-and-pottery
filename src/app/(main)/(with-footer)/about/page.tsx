import { getPublicAboutContent, getPublicHeroImages } from "@/actions/admin";

import { AboutPageClient } from "@/components/pages";

export default async function AboutPage() {
  const [content, heroImages] = await Promise.all([
    getPublicAboutContent(),
    getPublicHeroImages(),
  ]);

  return <AboutPageClient content={content} heroImage={heroImages.ourStory} />;
}
