import { absoluteUrl } from "@/lib/seo";
import { buildMetadataFromSeo } from "@/lib/site-content";

export function generateMetadata() {
  const base = buildMetadataFromSeo("faq");
  return {
    ...base,
    alternates: {
      canonical: absoluteUrl("/faq"),
    },
  };
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
