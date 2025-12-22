import { getPublicShippingContent } from "@/actions/admin";

import { ShippingPageClient } from "@/components/pages";

export default async function ShippingPage() {
  const content = await getPublicShippingContent();

  return <ShippingPageClient content={content} />;
}
