import { absoluteUrl } from "@/lib/seo";
import { buildMetadataFromSeo } from "@/lib/site-content";

export function generateMetadata() {
  const base = buildMetadataFromSeo("contact");
  return {
    ...base,
    alternates: {
      canonical: absoluteUrl("/contact"),
    },
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
