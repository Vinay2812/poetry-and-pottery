import { getPublicCareContent } from "@/actions/admin";

import { CarePageClient } from "@/components/pages";

export default async function CarePage() {
  const content = await getPublicCareContent();

  return <CarePageClient content={content} />;
}
