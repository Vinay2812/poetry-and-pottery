import { getPublicTermsContent } from "@/actions/admin";

import { TermsPageClient } from "@/components/pages";

export default async function TermsPage() {
  const content = await getPublicTermsContent();

  return <TermsPageClient content={content} />;
}
