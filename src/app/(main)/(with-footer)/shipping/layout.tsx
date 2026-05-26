import { absoluteUrl } from "@/lib/seo";
import { buildMetadataFromSeo } from "@/lib/site-content";

export async function generateMetadata() {
  const base = await buildMetadataFromSeo("shipping");
  return {
    ...base,
    alternates: {
      canonical: absoluteUrl("/shipping"),
    },
  };
}

export default function ShippingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
