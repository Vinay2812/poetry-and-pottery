import { absoluteUrl } from "@/lib/seo";
import { buildMetadataFromSeo } from "@/lib/site-content";

export async function generateMetadata() {
  const base = await buildMetadataFromSeo("faq");
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
