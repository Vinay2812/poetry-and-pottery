import { absoluteUrl } from "@/lib/seo";
import { buildMetadataFromSeo } from "@/lib/site-content";

export async function generateMetadata() {
  const base = await buildMetadataFromSeo("care");
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
