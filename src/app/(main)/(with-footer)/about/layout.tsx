import { absoluteUrl } from "@/lib/seo";
import { buildMetadataFromSeo } from "@/lib/site-content";

export function generateMetadata() {
  const base = buildMetadataFromSeo("about");
  return {
    ...base,
    alternates: {
      canonical: absoluteUrl("/about"),
    },
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
