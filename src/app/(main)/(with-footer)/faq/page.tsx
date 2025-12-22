import { getPublicFAQContent } from "@/actions/admin";

import { FAQPageClient } from "@/components/pages";

export default async function FAQPage() {
  const content = await getPublicFAQContent();

  return <FAQPageClient content={content} />;
}
