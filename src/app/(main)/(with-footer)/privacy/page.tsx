import { getPublicPrivacyContent } from "@/actions/admin";

import { PrivacyPageClient } from "@/components/pages";

export default async function PrivacyPage() {
  const content = await getPublicPrivacyContent();

  return <PrivacyPageClient content={content} />;
}
