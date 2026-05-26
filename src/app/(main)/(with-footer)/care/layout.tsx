import { absoluteUrl } from "@/lib/seo";
import { buildMetadataFromSeo } from "@/lib/site-content";

export function generateMetadata() {
  const base = buildMetadataFromSeo("care");
  return {
    ...base,
    alternates: {
      canonical: absoluteUrl("/care"),
    },
  };
}

export default function CareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
